"use server"
import puppeteer from "puppeteer";
import { z } from "zod"
import * as cheerio from 'cheerio';
import { getUserIdfromClerkId } from "./userAction";
const productSchema = z.object({
    userId: z.number(),
    title: z.string(),
    url: z.string(),
    redirectUrl: z.string(),
    symbol: z.string(),
    price: z.string(),
    discountedPrice: z.string(),
    discountPercentage: z.string(),
    imageUrl: z.string(),
    descriptions: z.array(z.string())
})


export async function scrapping(clerkId: string, url: string) {
    console.log("Into the server actions ");
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const userInputURL = url;
        await page.goto(userInputURL, {
            waitUntil: 'domcontentloaded',
        });

        await page.setViewport({ width: 1920, height: 1080 });
        console.log("Redirected url : ", page.url());
        const html = await page.content();
        // console.log("Here is the page html :",html)
        const $ = cheerio.load(html);
        // console.log("Html by cheerio ",$)

        //price , url of image,brand , title, mrp , discounted price , discount percentage,rating ,description
        //Fetch title 
        console.log("Fetching the values");
        const title = $("span#productTitle.a-size-large.product-title-word-break").text().trim();
        // console.log("Title : ", title)

        //Symbol of the currency 
        const symbol = $("span.a-price-symbol").first().text().trim();
        // console.log("Symbol : ",symbol)

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
        // console.log("IMage url : ",imageUrl)

        const descriptions: string[] = [];
        $('ul.a-unordered-list.a-vertical.a-spacing-mini li span.a-list-item').each((i, element) => {
            descriptions.push($(element).text().trim());
        });
        console.log("Description : ", descriptions);

        //fetching userId from the clerkId  
        const resultU = await getUserIdfromClerkId(clerkId);
        if (!resultU.success) {
            throw new Error("User Id not found");
        }

        const userId = resultU.id;

        const productData = {
            userId: userId,
            url: userInputURL,
            redirectUrl: page.url(),
            title: title,
            symbol: symbol,
            price: price,
            discountedPrice: discountedPrice,
            discountPercentage: discountPercentage,
            imageUrl: imageUrl,
            descriptions: descriptions,
        };

        const result = productSchema.safeParse(productData);
        if (result.success) {
            console.log("Result printed successfully");
        } else {
            console.log("Error in the result ", result.error.errors);
        }

        console.log("Product Details : ", productData);

        return { message: "Done implementing task" };
    } catch (error) {
        console.error("Error during scraping:", error);
        return { message: "Scraping failed", error: error };
    }
}
