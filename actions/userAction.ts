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
        // console.error("Database Error:", error);
        return { success: false, message: "Failed to create user" };
    }
}

type ResultType = {
    success: boolean;
    message: string;
    id?: string;
}

export async function getUserIdfromClerkId(clerkId: string):Promise<ResultType> {
    try {
        const user  = await prisma.user.findUnique({
            where: {
                clerkId:clerkId
            }
        })

        if (!user) {
            throw new Error("User does not exists")
        }
        return {success:true ,message:"Successfully fetched clerk id ", id:user.id}
        
    } catch (error) {
        return {success:false, message :String(error)}
    }
    
}