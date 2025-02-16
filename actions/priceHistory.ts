"use server"
import prisma from "@/lib/prisma"
import { z } from "zod"

const priceHistorySchema = z.object({
    price: z.string(),
    productId: z.string()
});

export async function insertIntoPriceHistory(price: string, productId: string) {
    try {
        console.log("price : ", price)
        console.log("product id :",productId)
        const validatedData = priceHistorySchema.safeParse({ price, productId });
        if (!validatedData.success) {
            return { success: false, message: "Invalid input", errors: validatedData.error};
        }

        const productPriceHistory = await prisma.priceHistory.create({
            data: {
                price: price, 
                productId: productId
            }
        });

        return { success: true, message: "Done inserting product into price history", data: productPriceHistory };

    } catch (error) {
        console.error("Error inserting price history:", error);
        return { success: false, message: "Something went wrong", error: (error as any).message };
    }
}
