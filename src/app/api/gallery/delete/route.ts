import { connectDB } from "@/db/connection";
import Gallery from "@/model/galleryModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { _id } = await req.json();
        await Gallery.findByIdAndDelete(_id);
        return NextResponse.json({ message: "Photo is deleted successfully" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}