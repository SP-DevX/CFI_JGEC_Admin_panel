
import { connectDB } from "@/db/connection";
import Help from "@/model/helpModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();

export async function POST(req: NextRequest) {
    try {
        const { _id, solution } = await req.json();
        console.log(_id, solution);

        if (solution) {
            const solvedRes = await Help.findByIdAndUpdate(_id, {
                solution,
                status: true,
            }, { new: true });
            console.log(solvedRes);
        }
        return NextResponse.json({ message: "Solution is Saved successfully" }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}