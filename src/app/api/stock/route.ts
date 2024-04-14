import { connectDB } from "@/db/connection";
import Stock from "@/model/stockModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req: NextRequest) {
    try {
        const components = await Stock.find({}); 
        return NextResponse.json({ components }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}