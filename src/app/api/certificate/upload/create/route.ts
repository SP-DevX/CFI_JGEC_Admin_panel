import { connectDB } from "@/db/connection";
import Certificate from "@/model/certificatesModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { category, uploadList } = await req.json();
        const event = await Certificate.findOne({ category });
        if (event) {
            for (let i = 0; i < uploadList.length; i++) {
                event.categoryList.push(uploadList[i]);
            }
            await event.save();
        } 
        const list = await Certificate.findOne({ category });
        return NextResponse.json({ list, message: "Certificates uploaded" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}