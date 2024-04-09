
import { connectDB } from "@/db/connection";
import User from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";
import { unescape } from "querystring";

connectDB();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody; 
        const decodeToken = unescape(token) 
        const user = await User.findOne({
            verifyToken: decodeToken,
            // verifyTokenExpiry: { $gt: Date.now() },
        }); 
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 400 });
        }
        user.isVerify = true;
        // user.verifyTokenExpiry = undefined;
        // user.verifyToken = undefined;
        await user.save();
        return NextResponse.json(
            { message: "email verified successful" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
