
import { connectDB } from "@/db/connection";
import Help from "@/model/helpModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, message } = reqBody;
        const findRes = await Help.findOne({ $and: [{ email, message }] })
        if (findRes) return NextResponse.json({ message: "Already submit the message" }, { status: 409 })
        await Help.create(reqBody);
        return NextResponse.json({ message: "Response is stored successfully" }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}