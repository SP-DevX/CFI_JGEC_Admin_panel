import mongoose from "mongoose";

export const connectDB = async () => {
    // console.log(process.env.MONGOOSE_URL);
    mongoose
        .connect(process.env.MONGOOSE_URL!)
        .then(() => {
            console.log("connected with mongodb atlas");
        })
        .catch((err) => console.log(err));
}