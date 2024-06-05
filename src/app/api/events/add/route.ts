
import { connectDB } from "@/db/connection";
import Event from "@/model/eventsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { shortName, fullName, description, date, type, organizer, photo } = await req.json();
        const isExist = await Event.findOne({ shortName });
        if (isExist)
            return NextResponse.json({ message: "Event already exist" }, { status: 409 });
        await Event.create({ shortName, fullName, description, date, type, organizer, photo });
        return NextResponse.json({ message: "Event is added" }, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
} 