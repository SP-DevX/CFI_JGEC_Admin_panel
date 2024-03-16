import { connectDB } from "@/db/connection";
import Stock from "@/model/stockModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { name, photo, modelNo, qty } = await req.json(); 
        const isExisting = await Stock.findOne({ name }); 
        if (!isExisting)
            return NextResponse.json({ message: "Component doesn't exists" }, { status: 404 });
        await Stock.findByIdAndUpdate(
            isExisting._id,
            { photo, modelNo, qty },
            { new: true }
        );
        return NextResponse.json({ message: "Component is added" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}