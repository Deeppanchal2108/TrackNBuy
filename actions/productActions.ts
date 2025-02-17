"use server"
import prisma from "@/lib/prisma"
import puppeteer from "puppeteer";
import { Cheerio } from "cheerio";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export async function allProducts() {
    try {
        const products = await prisma.product.findMany();
        return { success: true, message: "Successfully fetched products", data: products };
    } catch (error) {
        return { success: false, message: "Error while fetching products" };
    }
}

interface Product {
    id: string;
    title: string;
    url: string;
    redirectedUrl: string;
    symbol?: string | null;  // Fix: Allow null
    price: string;
    discountedPrice?: string | null;  // Fix: Allow null
    discountPercentage?: string | null;  // Fix: Allow null
    imageUrl?: string | null;  // Fix: Allow null
    description: string[];
    currentPrice: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export async function scrapeProduct() {
    try {
        const result = await allProducts();
        if (!result.success) {
            throw new Error("Something went wrong");
        }

        // Ensure data is an array
        const products: Product[] = result.data ? result.data : [];



        if (products.length < 1) {
            console.log("No product found ")
            return
        }

        for (const product of products) {
            const url = product.url;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            const userInputURL = url;
            await page.goto(userInputURL, {
                waitUntil: 'domcontentloaded',
            });

            await page.setViewport({ width: 1920, height: 1080 });
            // console.log("Redirected url : ", page.url());
            const html = await page.content();
            // console.log("Here is the page html :",html)
            const $ = cheerio.load(html);
        }

    } catch (error) {
        console.error("Error in scrapeProduct:", error);
    }
}
