import { connectDB } from "@/db/connection";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(req: NextRequest) {
    try {
        const allUsers = await User.find();
        return NextResponse.json({allUsers, message: "All users found."},{status: 200});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error?.message }, { status: 500 })
    }
}