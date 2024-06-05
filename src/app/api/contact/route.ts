
import { connectDB } from "@/db/connection";
import Help from "@/model/helpModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function POST(req: NextRequest) {
    try {
        console.log("enter request");
        
        const { name, email, message, mobile } = await req.json();
        console.log(name, email, message, mobile);
        const newHelp = await Help.create(name, email, message, mobile);
        console.log(newHelp);
        return NextResponse.json({ message: "Response is stored successfully" }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}