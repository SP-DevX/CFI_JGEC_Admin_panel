
import { connectDB } from "@/db/connection";
import { mailer } from "@/helper/mailer";
import Help from "@/model/helpModel";
import { NextRequest, NextResponse } from "next/server"

connectDB();


export async function POST(req: NextRequest) {
    try {
        const { _id, email, solution } = await req.json();
        const isSolved = await Help.findOne({ $and: [{ email, solution }] });
        console.log(isSolved)
        if (isSolved) return NextResponse.json({ message: "Query is already resolved" }, { status: 409 });
        const query = await Help.findById({ _id })
        const { name, message } = query;
        if (solution) {
            await Help.findByIdAndUpdate(_id, {
                solution,
                status: true,
            }, { new: true });
            let resMessage = `
                <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
                    <div style="padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
                        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dddddd; border-radius: 5px;">
                            <p style="font-size: 16px; color: #333333;">
                                Dear <span style="font-weight: bold;">${name}</span>,
                            </p>

                            <p style="font-size: 16px; color: #333333;">
                                Thank you for reaching out to us with your query. Below is the response to your question:
                            </p>

                            <div style="border-left: 4px solid #007bff; padding-left: 10px; margin: 20px 0; background-color: #f1f8ff;">
                                <p style="font-size: 16px; color: #333333; margin: 0;">
                                    <strong>Original Query:</strong> <em>${message}</em>
                                </p>
                            </div>

                            <p style="font-size: 16px; color: #333333;">
                                <strong>Response:</strong> ${solution}
                            </p>

                            <p style="font-size: 16px; color: #333333;">
                                If you have any further questions or need additional assistance, please feel free to reply to this email.
                            </p>

                            <div style="font-size: 16px; color: #333333;">
                                Best regards, <br/>
                                Center For Innovation Club <br/>
                                Jalpaiguri Government Engineering College
                            </div> 
                        </div>
                    </div>
                </body>`
            await mailer(email, `Your query is resolved`, resMessage)
        }
        return NextResponse.json({ message: "Solution is Saved successfully" }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}