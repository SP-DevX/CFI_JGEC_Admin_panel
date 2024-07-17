import { connectDB } from "@/db/connection";
import Event from "@/model/eventsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req: NextRequest) {
    try {
        const events = await Event.find({}).select('_id shortName photo reg_date_end');
        return NextResponse.json({ events }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}