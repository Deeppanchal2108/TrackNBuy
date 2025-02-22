"use server";
import prisma from "@/lib/prisma";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { updatePriceHistoryTable } from "./priceHistory";
import nodemailer from "nodemailer";

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "deepanchal2290@gmail.com", // Your email
        pass: "fzcz cfks kxbp qmfo", // App password (not your email password)
    },
});

export async function allProducts() {
    try {
        const products = await prisma.priceHistory.findMany({
            include: {
                product: true,
            },
        });
        return { success: true, message: "Successfully fetched products", data: products };
    } catch (error) {
        return { success: false, message: "Error while fetching products" };
    }
}

export async function scrapeProduct() {
    try {
        const result = await allProducts();
        if (!result.success) {
            throw new Error("Something went wrong");
        }

        const results = result.data ? result.data : [];

        if (results.length < 1) {
            console.log("No product found ");
            return;
        }

        for (const result of results) {
            const url = result.product.url;
            const browser = await puppeteer.launch({
                executablePath: puppeteer.executablePath(),
                headless: true,
            });
            const page = await browser.newPage();

            await page.goto(url, {
                waitUntil: "domcontentloaded",
            });

            await page.setViewport({ width: 1920, height: 1080 });
            const html = await page.content();
            const $ = cheerio.load(html);

            // Extract discounted price
            const discountedPrice = $("span.a-price-whole").first().text().trim();
            const newPrice = Number(discountedPrice.replace(/,/g, ""));
            const currentPrice = Number((result.product.discountedPrice ?? "0").replace(/,/g, ""));

            console.log(`Product: "${result.product.title}"`);
            console.log("New Price:", newPrice);
            console.log("Current Price:", currentPrice);

            if (!isNaN(newPrice) && !isNaN(currentPrice) && 0 < currentPrice) {
                const result1 = await updatePriceHistoryTable(discountedPrice, result.id);
                console.log("Result1 : ", result1);

                if (result1.success) {
                    const mailOptions = {
                        from:"deepanchal2290@gmail.com" ,
                        to: "deepanchal6677@gmail.com",
                        subject: "🔥 Price Just Dropped – Hurry Up! 🚀",
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
                    };

                    await transporter.sendMail(mailOptions);
                    console.log("Email sent successfully");
                }
            }
        }
        return { success: true, message: "Done scraping every product" };
    } catch (error) {
        console.error("Error in scrapeProduct:", error);
        return { success: false, message: "Something went wrong in scrape product function" };
    }
}

export async function getProducts(userId:any) {
    try {
        const products = await prisma.product.findMany({
            where: { userId },
        });
        return { success: true, message: "Successfully fetched products", data: products };
    } catch (error) {
        return { success: false, message: "Something went wrong in getProducts function" };
    }
}
