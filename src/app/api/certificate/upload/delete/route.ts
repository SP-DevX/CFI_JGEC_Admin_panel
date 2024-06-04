import { connectDB } from "@/db/connection";
import Certificate from "@/model/certificatesModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(req: NextRequest) {
    try {
        const { category, item } = await req.json(); 
        await Certificate.findOneAndUpdate(
            { category },
            { $pull: { categoryList: { refId: item.refId } } }
        ); 
        return NextResponse.json(
            { message: "Certificate is deleted" },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
}
