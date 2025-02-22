import { NextResponse,NextRequest } from "next/server";
import { scrapeProduct } from "@/actions/productActions";

export async function GET(req:NextRequest) {
    try {
        console.log("Scraping started ");
        const result = await scrapeProduct();
        if (result?.success) {
            return NextResponse.json(
                { success: true, message: "Scraping completed" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "Scraping failed" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Scraping failed:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
