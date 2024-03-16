import { connectDB } from "@/db/connection"; 
import Member from "@/model/membersModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req:NextRequest) {
    try { 
        const { name, photo, position, year, dept, email, phone, facebook, instagram, linkedin } = await req.json();
        const isExist = await Member.findOne({ email });
        if (isExist)
            return NextResponse.json({ message: "User already exist" }, { status: 404 });
        await Member.create({ name, photo, position, year, dept, email, phone, socialLinks: { facebook, instagram, linkedin } });
        return NextResponse.json({ message: "Member is added" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}