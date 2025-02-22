"use server"
import prisma from "@/lib/prisma"
import { z } from "zod"


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
        // console.error("Error inserting price history:", error);
        return { success: false, message: "Something went wrong"};
    }
}

export async function updatePriceHistoryTable(price: string, id: string) {
    try {
    
        
        const productPriceHistory = await prisma.priceHistory.update({
            where: {
                id
            },
            data: {
                price:price
            }

        })
        if (!productPriceHistory) {
            return { success: false, message: "Something went wrong" };
}
        return { success: true, message: "Done inserting product into price history" };

    } catch (error) {
        // console.error("Error inserting price history:", error);
        return { success: false, message: "Error occured in the update price history table" };
    }
}