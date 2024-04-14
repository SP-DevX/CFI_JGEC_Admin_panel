import { connectDB } from "@/db/connection";
import Project from "@/model/ProjectsMode";
import { NextRequest, NextResponse } from "next/server"

connectDB();
export async function GET(req:NextRequest) {
    try {
        const projects = await Project.find({});
        return NextResponse.json({ projects }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}