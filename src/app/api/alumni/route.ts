import { connectDB } from "@/db/connection";
import Alumni from "@/model/alumniModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req: NextRequest) {
    try {
        const alumniMembers = await Alumni.find({});
        return NextResponse.json({ alumniMembers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}