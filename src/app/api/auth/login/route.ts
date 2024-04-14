import { connectDB } from "@/db/connection";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email });
        if (!user)
            return NextResponse.json({ message: "User is not exist" }, { status: 404 });
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        user.isOnline = true;
        await user.save();
        // create token
        if (!user.isVerify) return NextResponse.json({ message: "User is not verified" }, { status: 310 });
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY!, {
            expiresIn: "1d",
        });
        // create response
        const response = NextResponse.json(
            { user, message: "log in successful" },
            { status: 201 }
        );
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
} 