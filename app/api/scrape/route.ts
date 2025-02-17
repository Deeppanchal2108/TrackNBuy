import { NextResponse } from "next/server";
import { scrapeProduct } from "@/actions/productActions";
export async function GET() {
    try {
        const result = await scrapeProduct(); // Your function to scrape product data

        if (result.success) {
            return NextResponse.json({ success: true, message: "Scraping completed", data: result.data });
        } else {
            return NextResponse.json({ success: false, message: "Scraping failed", error: result.error }, { status: 400 });
        }
    } catch (error) {
        console.error("Scraping failed:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
