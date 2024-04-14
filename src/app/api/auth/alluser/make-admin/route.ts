import { connectDB } from "@/db/connection";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function PATCH(req: NextRequest) {
    try {
        const { email, isAdmin } = await req.json();
        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ message: "User not exist" }, { status: 404 });
        user.isAdmin = isAdmin;
        await user.save();
        return NextResponse.json({ message: "Now user is admin" }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error?.message }, { status: 500 })
    }
}