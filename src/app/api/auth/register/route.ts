import { connectDB } from "@/db/connection";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { mailer } from "@/helper/mailer";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { photo, name, email, password } = reqBody; 
        const userExist = await User.findOne({ email });
        if (userExist)
            return NextResponse.json({ message: "User already exist" }, { status: 409 });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.create({
            photo,
            name,
            email,
            password: passwordHash
        });   
        await mailer({ email, emailType: "VERIFY", userId: user._id });
        return NextResponse.json({ message: "Now Verify your email" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
} 