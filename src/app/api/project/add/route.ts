import { connectDB } from "@/db/connection";
import Project from "@/model/ProjectsMode";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function POST(req: NextRequest) {
    try {
        const { projectId, title, overview, name, year, demo, details, code, photo } = await req.json();
        const isExisting = await Project.findOne({ projectId });
        if (isExisting)
            return NextResponse.json({ message: "Project already exists" }, { status: 409 });
        await Project.create({ projectId, title, overview, name, year, demo, details, code, photo });
        return NextResponse.json({ message: "Project is created" }, { status: 201 });
    } catch (error) {
        NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}