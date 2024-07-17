
import { connectDB } from "@/db/connection";
import Event from "@/model/eventsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log(reqBody)
        const { eventId } = reqBody;
        const isExist = await Event.findOne({ eventId });
        if (isExist)
            return NextResponse.json({ message: "Event already exist" }, { status: 409 });
        await Event.create(reqBody);
        return NextResponse.json({ message: "Event is added successfully" }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
} 