import Notice from "@/model/noticeMode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { title } = reqBody;
        const isPresent = await Notice.findOne({ title });
        if (isPresent)
            return NextResponse.json({ message: "notice already exists" }, { status: 409 });
        await Notice.create(reqBody);
        return NextResponse.json({ message: "notice is created" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "internal error" }, { status: 500 });
    }
}