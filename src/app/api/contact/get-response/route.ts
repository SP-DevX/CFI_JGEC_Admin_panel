import { connectDB } from "@/db/connection";
import Help from "@/model/helpModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function GET(req: NextRequest) {
    try {
        const allRes = await Help.find();
        return NextResponse.json({ allRes, message: "Response is get successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}