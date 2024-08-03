import mongoose from "mongoose";

export default async function main() {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB environment variable is not defined");
        }
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Successfully connected to database.");
    } catch (error) {
        console.log(error);
    }
}