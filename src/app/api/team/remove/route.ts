import { connectDB } from "@/db/connection"; 
import Team from "@/model/teamsModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { _id } =await  req.json(); 
        await Team.findByIdAndDelete(_id); 
        return NextResponse.json({ message: "Member is removed" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}