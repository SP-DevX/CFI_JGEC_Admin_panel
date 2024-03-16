import { connectDB } from "@/db/connection"; 
import Member from "@/model/membersModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { name, photo, position, year, dept, email, phone, facebook, instagram, linkedin } = await req.json();
        const isExist = await Member.findOne({ email });
        if (!isExist)
            return NextResponse.json({ message: "User is not exist in our team" }, { status: 404 });
        await Member.findByIdAndUpdate(isExist._id, { name, photo, position, year, dept, phone, socialLinks: { facebook, instagram, linkedin } }, { new: true })
        return NextResponse.json({ message: "Member details is updated" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}