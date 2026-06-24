import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in .env");
        }

        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

export default connectDB;