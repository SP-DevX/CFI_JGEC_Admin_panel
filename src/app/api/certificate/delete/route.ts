import { connectDB } from "@/db/connection";
import Certificate from "@/model/certificatesModel";
import { NextRequest, NextResponse } from "next/server"


connectDB();
export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json(); 
        await Certificate.findByIdAndDelete(id);
        return NextResponse.json({ message: "folder deleted successfully" }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}