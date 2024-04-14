import { connectDB } from "@/db/connection";
import Certificate from "@/model/certificatesModel"; 
import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function GET(req: NextRequest) {
    try {
        const list = await Certificate.find(); 
        return NextResponse.json({ list, message: "Category found successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}