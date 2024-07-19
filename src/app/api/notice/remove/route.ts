import { connectDB } from "@/db/connection";
import Notice from "@/model/noticeMode";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { _id } = reqBody;
        await Notice.findByIdAndDelete(_id);
        return NextResponse.json({ message: "notice is deleted" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "internal error" }, { status: 500 });
    }
}