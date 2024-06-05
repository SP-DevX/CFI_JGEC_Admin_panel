import { connectDB } from "@/db/connection";
import Gallery from "@/model/galleryModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { title, date, photo } = await req.json();
        console.log(title, date, photo);
        const isExist = await Gallery.findOne({ title });
        if (isExist) return NextResponse.json({ message: "Photo already exists" }, { status: 409 })
        await Gallery.create({ title, date, photo });
        return NextResponse.json({ message: "Photo is uploaded successfully" }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}