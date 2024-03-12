import { connectDB } from "@/db/connection"; 
import Team from "@/model/teamsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req: NextRequest) {
    try {
        const teamMembers = await Team.find({}); 
        return NextResponse.json({ teamMembers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}