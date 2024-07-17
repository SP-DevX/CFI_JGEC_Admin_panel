import { connectDB } from "@/db/connection";
import Event from "@/model/eventsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try { 
        const event = await Event.findById(params.id);
        if (!event) return NextResponse.json({ message: "event not exists" }, { status: 404})
        return NextResponse.json({ event }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}