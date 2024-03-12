import { connectDB } from "@/db/connection";
import Event from "@/model/eventsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req:NextRequest) {
    try {
        const {_id, shortName, fullName, description, date, type, organizer, photo } = await req.json();
        const isExist = await Event.findOne({ shortName });
        if (!isExist)
            return NextResponse.json({ message: "Event is not exist " }, { status: 404 });
        await Event.findByIdAndUpdate(
            isExist._id,
            { fullName, description, date, type, organizer, photo },
            { new: true }
        )
        return NextResponse.json({ message: "Event is updated" }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}