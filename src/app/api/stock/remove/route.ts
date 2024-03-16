import { connectDB } from "@/db/connection"; 
import Stock from "@/model/stockModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { _id } = await req.json();  
        await Stock.findByIdAndDelete(_id);
        return NextResponse.json({ message: "Component is removed" }, { status: 200 });
    } catch (error) {
        NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}