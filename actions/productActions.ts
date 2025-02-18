"use server"
import prisma from "@/lib/prisma"
import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';
import { updatePriceHistoryTable } from "./priceHistory";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);
export async function allProducts() {
    try {
        const products = await prisma.priceHistory.findMany(
            {
                include: {
                    product: true
                }
            }
        );
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
    priceHistory?: PriceHistory[];
}

interface PriceHistory {
    id: string;
    price: string;  // Consider using number if stored as Decimal/Float in Prisma
    date: Date;
    productId: string;
    product: Product
}

export async function scrapeProduct() {
    try {
        const result = await allProducts();
        if (!result.success) {
            throw new Error("Something went wrong");
        }

        // Ensure data is an array
        const results: PriceHistory[] = result.data ? result.data : [];



        if (results.length < 1) {
            console.log("No product found ")
            return
        }

        for (const result of results) {
            const url = result.product.url;
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
            //Discounted price
            const discountedPrice = $("span.a-price-whole").first().text().trim();
            // console.log("Discounted Price : ", discountedPrice)
            if (Number(discountedPrice) < Number(result.product.discountedPrice)) {
                const result1 = await updatePriceHistoryTable(discountedPrice, result.id)
                if (result1.success) {

                    const data = await resend.emails.send({
                        from: 'deepanchal2290@gmail.com', // Ensure this is a verified domain/email
                        to: 'deepanchal6677@gmail.com',
                        subject: '🔥 Price Just Dropped – Hurry Up! 🚀',
                        html: `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <h2>Great News! 🎉</h2>
                      <p>The price of <strong>${result.product.title}</strong> just dropped! 💰</p>
                       <p>Old Price: <del>${result.product.price}</del></p>
                     <p><strong>New Price: ${result.product.discountedPrice}</strong></p>
                     <p>Discount: <strong>${result.product.discountPercentage}% OFF</strong></p>
                   <p>📅 Tracked at: ${new Date(result.product.updatedAt).toLocaleString()}</p>
                    <p>Don't miss out! Click below to grab it before it's gone:</p>
                   <a href="${result.product.url}" 
                   style="display:inline-block; background-color:#ff5722; color:white; padding:10px 20px; 
                   text-decoration:none; border-radius:5px; font-weight:bold;">
                  Buy Now 🚀
                   </a>
                   <p>Happy Shopping! 🛍️</p>
                  </div>
  `,
                    });

                    if (data) {
                        console.log("Done sending email")
                    }

                }
            }

        }
        return { success:true , message :"Done scraping every product"}
    } catch (error) {
        console.error("Error in scrapeProduct:", error);
        return {
            success: false, message: "Something went wrong in scrape product function"
        }
    }
}
