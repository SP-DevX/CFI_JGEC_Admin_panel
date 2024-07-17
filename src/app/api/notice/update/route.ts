import Notice from "@/model/noticeMode";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { _id, link, date, description } = reqBody;
        const isPresent = await Notice.findById({ _id });
        if (!isPresent)
            return NextResponse.json({ message: "notice is not exists" }, { status: 404 });
        await Notice.findByIdAndUpdate(
            isPresent._id,
            { link, date, description },
            { new: true }
        );
        return NextResponse.json({ message: "notice is updated" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "internal error" }, { status: 500 });
    }
}