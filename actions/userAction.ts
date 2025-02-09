"use server"
import prisma from "@/lib/prisma"
import { z } from "zod"
const userSchema = z.object({
    clerkId: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
})

type User=z.infer<typeof userSchema>
export async function syncUser(params: User) {
    try {
        // Validate input data
        const validatedUser = userSchema.parse(params);
        const userExists = await prisma.user.findUnique({
            where: { clerkId: validatedUser.clerkId },
        });

        if (userExists) {
            return { success: true, message: "User already exists", user: userExists };
        }

        // Create user in database
        const user = await prisma.user.create({
            data: validatedUser,
        });

        return { success: true, message: "Successfully created user", user };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, message: "Failed to create user" };
    }
}
