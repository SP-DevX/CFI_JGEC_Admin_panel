import { connectDB } from "@/db/connection";
import Gallery from "@/model/galleryModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req: NextRequest) {
    try {
        const photos = await Gallery.find({});
        return NextResponse.json({ photos }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}