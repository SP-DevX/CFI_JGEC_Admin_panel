import { connectDB } from "@/db/connection";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { name, email, password } = reqBody;
        const userExist = await User.findOne({ email });
        if (userExist)
            return NextResponse.json({ message: "User already exist" }, { status: 409 });
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: passwordHash
        });
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY!);
        return NextResponse.json({ token, message: "Registration successful" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
} 