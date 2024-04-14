import { connectDB } from "@/db/connection";
import Project from "@/model/ProjectsMode";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { projectId, title, overview, name, year, demo, details, code, photo } = await req.json();
        const isExisting = await Project.findOne({ projectId });
        if (!isExisting)
            return NextResponse.json({ message: "Project doesn't exists" }, { status: 404 });
        await Project.findByIdAndUpdate(
            isExisting._id,
            { title, overview, name, year, demo, details, code, photo },
            { new: true }
        ); 
        return NextResponse.json({ message: "Project is updated" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}