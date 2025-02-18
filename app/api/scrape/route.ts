import { NextResponse,NextRequest } from "next/server";
import { scrapeProduct } from "@/actions/productActions";

const SECRET_KEY = process.env.SCRAPE_API_KEY; // Store in .env file

export async function GET(req:NextRequest) {
    try {
        // Get the Authorization header
        const authHeader = req.headers.get("Authorization");

        // Check if it matches the secret key
        if (!authHeader || authHeader !== `Bearer ${SECRET_KEY}`) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Proceed with scraping if authorized
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
