"use server"
import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';
import { getUserIdfromClerkId } from "./userAction";
import prisma from "@/lib/prisma";
import { insertIntoPriceHistory } from "./priceHistory";

export async function scrapping(clerkId: string, url: string) {

    try {
        const browser = await puppeteer.launch({
            executablePath: puppeteer.executablePath(), // Ensure it uses Puppeteer's Chromium
            headless: true
        });
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
        // console.log("Html by cheerio ",$)

        //price , url of image,brand , title, mrp , discounted price , discount percentage,rating ,description
        //Fetch title 
        // console.log("Fetching the values")
        const title = $("span#productTitle.a-size-large.product-title-word-break").text();
        // console.log("Title : ", title)

        //Symbol of the currency 
        const symbol = $("span.a-price-symbol").first().text().trim();
        // console.log("Symbol : ", symbol)

        //Actual price
        const price = $("span.a-size-small.aok-offscreen").text().replace(/[^\d.,]/g, '').replace(/^\.*/, '').trim();
        // console.log("Price : ", price)

        //Discounted price
        const discountedPrice = $("span.a-price-whole").first().text().trim();
        // console.log("Discounted Price : ", discountedPrice)

        //Discount Percentage 
        const discountPercentage = $('span.savingsPercentage').text().trim().replace(/[^0-9]/g, '');
        // console.log("Discount Percentage : ", discountPercentage)


        //Image Url of the product
        const imageUrl = $('img#landingImage').attr('src');
        // console.log("IMage url : ", imageUrl)
        const descriptions: string[] = [];
        $('ul.a-unordered-list.a-vertical.a-spacing-mini li span.a-list-item').each((i, element) => {
            descriptions.push($(element).text().trim());
        });
        // console.log("Description : ", descriptions);

        //fetching userId from the clerkId  
        const resultU = await getUserIdfromClerkId(clerkId);
        if (!resultU.success) {
            throw new Error("User Id not found");
        }

        const userId: string = resultU.id ?? '';
        // console.log("User id : ", userId)

        const ifExist = await prisma.product.findFirst({
            where: {
                userId: userId,
                title: title
            }
        });
        if (ifExist) {
            return { success: true, message: "product product already exists for the same user" }
        }



        const product = await prisma.product.create({
            data: {
                currentPrice: price,
                userId: userId,
                url: userInputURL,
                redirectedUrl: page.url(),
                title: title,
                symbol: symbol,
                price: price,
                discountedPrice: discountedPrice,
                discountPercentage: discountPercentage,
                imageUrl: imageUrl,
                description: descriptions,
            }

        })
        if (product) {
            const result = await insertIntoPriceHistory(price, product.id)
            if (result.success) {
                return { success: true, message: "Done all the tasks " }
            } else {
                return { success: false, message: "error while inserting in the price history table " }

            }
        }

    } catch (error) {
        console.error("Error during scraping:");
        return { message: "Scraping failed" };
    }
}
