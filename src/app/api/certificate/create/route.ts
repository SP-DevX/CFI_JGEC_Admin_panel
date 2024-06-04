import { connectDB } from "@/db/connection";
import Certificate from "@/model/certificatesModel";
import { NextRequest, NextResponse } from "next/server"


connectDB();
export async function POST(req: NextRequest) {
    try {
        const { category } = await req.json();
        console.log(category);
        const folder = await Certificate.findOne({ category });
        console.log(folder);
        if (folder) return NextResponse.json({ message: "Folder already exists" }, { status: 409 });
        await Certificate.create({ category }); 
        return NextResponse.json({ message: "folder created" }, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}