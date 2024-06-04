
import { connectDB } from "@/db/connection";
import Help from "@/model/helpModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function POST(req: NextRequest) {
    try {
        const { _id } = await req.json();
        await Help.findByIdAndDelete(_id);
        return NextResponse.json({ message: "query deleted successfully" }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}