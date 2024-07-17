import { connectDB } from "@/db/connection";
import Event from "@/model/eventsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { _id } = reqBody;
        const isExist = await Event.findById(_id);
        if (!isExist)
            return NextResponse.json({ message: "Event is not exist " }, { status: 404 });
        await Event.findByIdAndUpdate(
            _id,
            reqBody,
            { new: true }
        )
        return NextResponse.json({ message: "Event is updated" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}