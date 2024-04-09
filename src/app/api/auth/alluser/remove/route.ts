import { connectDB } from "@/db/connection";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ message: "User not exist" }, { status: 404 })
        await User.findByIdAndDelete(user._id);
        const allUsers = await User.find();
        return NextResponse.json({ allUsers, message: "User is removed." }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error?.message }, { status: 500 })
    }
}