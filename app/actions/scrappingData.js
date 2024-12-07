"use server"
import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';


export async function scrapping(params) {
    console.log("Into the server actions ")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const userInputURL = params.url;
    await page.goto(userInputURL, {
        waitUntil: 'domcontentloaded', 
    });

    await page.setViewport({ width: 1920, height: 1080 });
    console.log("Redirected url : ",page.url())
    const html = await page.content();
    // console.log("Here is the page html :",html)
    const $ = cheerio.load(html);
    // console.log("Html by cheerio ",$)

    //price , url of image,brand , title, mrp , discounted price , discount percentage,rating ,description
    //Fetch title 
    console.log("Fetching the values")
    const title = $("span#productTitle.a-size-large.product-title-word-break").text();
    console.log("Title : ", title)
    const rating = $("span.a-size-base.a-color-base").text()
    console.log("Rating : ",rating)
    const symbol = $("span.a-price-symbol")
    // console.log("Symbol : ",symbol)
    const price = $("span.a-size-small.aok-offscreen").text();
    console.log("Price : ", price)
    const discountedPrice = $("span#")
    // console.log("Discounted Price : ", discountedPrice)
    return {message:"Done implemeting task"}
}