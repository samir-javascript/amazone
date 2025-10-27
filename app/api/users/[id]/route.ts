import connectDB from "@/database/db";
import handleError from "@/lib/handlers/error";
import { UsersSchema } from "@/lib/zod";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function GET(_:Request, {params}: {params: Promise<{id:string}>}) {
    const {id} = await params;
    if(!id) throw new Error("User not found")
   try {
       await connectDB()
       const user = await User.findById(id)
       if(!user) throw new Error("User not found")
        return NextResponse.json({success: true, data: user}, {status: 200})
   } catch (error) {
       return handleError(error, "api") as APIErrorResponse;
   }
}

export async function DELETE(_:Request, {params}: {params: Promise<{id:string}>}) {
    const {id} = await params;
    if(!id) throw new Error("User not found")
   try {
       await connectDB()
       const user = await User.findByIdAndDelete(id)
       if(!user) throw new Error("User not found")
        return NextResponse.json({success: true, data: user}, {status: 200})
   } catch (error) {
       return handleError(error, "api") as APIErrorResponse;
   }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new Error("User not found")

  try {
    await connectDB()

    const body = await request.json();
    const validatedData = UsersSchema.partial().parse(body);

    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedUser) throw new Error("User not found");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) { 
     return handleError(error, "api") as APIErrorResponse;
  }
}