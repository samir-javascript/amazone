import connectDB from "@/database/db"
import User from "@/models/user.model"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    const {email} = await req.json()
    try {
        await connectDB()
    //      const validatedData = UsersSchema.partial().safeParse({ email });

    // if (!validatedData.success)
    //   throw new ValidationError(validatedData.error.flatten().fieldErrors);
        const user = await User.findOne({email})
        if(!user) throw new Error("User not found")
            return NextResponse.json({
                success: true,
                data: user
            }, {status: 200})
    } catch (error) {
        console.log(error)
    }
}