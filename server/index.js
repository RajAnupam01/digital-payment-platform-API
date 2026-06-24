import app from "./app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 1111;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
};

startServer();