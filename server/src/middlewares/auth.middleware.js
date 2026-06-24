import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith("Bearer ")
        ) {
            throw new ApiError(
                401,
                "Access token missing"
            );
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        const user = await User.findById(
            decoded.userId
        );

        if (!user) {
            throw new ApiError(
                401,
                "User not found"
            );
        }

        if (
            ["blocked", "suspended"].includes(
                user.accountStatus
            )
        ) {
            throw new ApiError(
                403,
                `Account is ${user.accountStatus}`
            );
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;