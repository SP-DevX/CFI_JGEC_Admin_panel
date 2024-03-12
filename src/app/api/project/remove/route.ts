import { connectDB } from "@/db/connection";
import Project from "@/model/ProjectsMode";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { projectId } = await req.json();
        const isExisting = await Project.findOne({ projectId }); 
        await Project.findByIdAndDelete(isExisting._id); 
        return NextResponse.json({ message: "Project is removed" }, { status: 200 });
    } catch (error) {
        NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}