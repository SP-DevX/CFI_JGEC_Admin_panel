import { connectDB } from "@/db/connection";
import Certificate from "@/model/certificatesModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { category } = await req.json();
        // console.error(category);
        const list = await Certificate.findOne({ category });
        if (!list) return NextResponse.json({ message: "Could not find certificate" }, { status: 404 })
        return NextResponse.json({ item: list.categoryList, message: "Certificates found successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}