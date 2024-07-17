
import { connectDB } from "@/db/connection";
import Notice from "@/model/noticeMode";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req: NextRequest) {
    try {
        const allNotices = await Notice.find().sort({ date: -1 })
        return NextResponse.json({ allNotices }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "internal error" }, { status: 500 });
    }
}