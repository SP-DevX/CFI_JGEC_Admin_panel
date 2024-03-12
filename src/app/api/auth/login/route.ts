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
        const isUserExist = await User.findOne({ email });
        if (!isUserExist)
            return NextResponse.json({ message: "User is not exist" }, { status: 404 });
        const isValidPassword = await bcrypt.compare(password, isUserExist.password);
        if (!isValidPassword)
            return NextResponse.json({ message: "unauthorized user" }, { status: 401 });
        const token = jwt.sign({ id: isUserExist._id }, process.env.JWT_SECRETKEY!);
        return NextResponse.json({ message: "log in successful", token, user: isUserExist }, { status: 201 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
} 