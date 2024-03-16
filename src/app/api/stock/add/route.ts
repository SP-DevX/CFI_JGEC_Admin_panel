import { connectDB } from "@/db/connection";
import Stock from "@/model/stockModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { name, photo, modelNo, qty } = await req.json();
        const isExisting = await Stock.findOne({ name });
        if (isExisting)
            return NextResponse.json({ message: "Component already exists" }, { status: 409 });
        await Stock.create({ name, photo, modelNo, qty });
        return NextResponse.json({ message: "Component is added" }, { status: 201 });
    } catch (error) {
        NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}