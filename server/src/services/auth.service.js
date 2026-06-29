import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import {
    generateAccessToken,
    generateRefreshToken
} from "../utils/token.util.js";
import Otp from "../models/otp.model.js"
import ApiError from "../utils/ApiError.js";
import Notification from "../models/notification.model.js"
import jwt from "jsonwebtoken";



export const registerUser = async ({ name, phone, password }) => {
    const existingUser = await User.findOne({ phone });
    if (existingUser) throw new ApiError(409, "User already exists");

    await User.create({
        name,
        phone,
        password,
        isVerified: false
    });


    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.findOneAndUpdate({ phone, purpose: "REGISTER" }, { otp: code, expiresAt }, { upsert: true, new: true, setDefaultsOnInsert: true })

    return { phone, purpose: "REGISTER", code };
};


export const verifyRegisterOtp = async ({ phone, code }) => {
    const otp = await Otp.findOne({ phone, purpose: "REGISTER" }).select("+otp");

    if (!otp || otp.expiresAt < new Date()) {
        throw new ApiError(400, "Invalid or expired OTP");
    }

    const user = await User.findOneAndUpdate(
        { phone },
        { isVerified: true },
        { new: true }
    );

    await Otp.deleteOne({ _id: otp._id });


    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await Notification.create({ userId: user._id, type: "ACCOUNT_VERIFIED" })

    const safeUser = await User.findById(user._id).select("-password -pin");

    return { user: safeUser, accessToken, refreshToken };
};


export const loginUser = async (data) => {
    const user = await User.findOne({
        phone: data.phone
    }).select("+password");

    if (!user) {
        throw new ApiError(
            401,
            "Invalid phone number or password"
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

    const isPasswordCorrect =
        await user.comparePassword(
            data.password
        );

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Invalid phone number or password"
        );
    }

    const accessToken =
        generateAccessToken(user._id);

    const refreshToken =
        generateRefreshToken(user._id);

    await RefreshToken.create({
        userId: user._id,
        token: refreshToken,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });

    const safeUser = await User.findById(
        user._id
    ).select("-password -pin");

    return {
        user: safeUser,
        accessToken,
        refreshToken
    };
};

export const logoutUser = async ({
    refreshToken
}) => {
    if (!refreshToken) {
        throw new ApiError(
            400,
            "Refresh token is required"
        );
    }

    const tokenDoc =
        await RefreshToken.findOne({
            token: refreshToken
        });

    if (!tokenDoc) {
        throw new ApiError(
            404,
            "Invalid refresh token"
        );
    }

    tokenDoc.isRevoked = true;

    await tokenDoc.save();

    return true;
};

export const rotateUserToken = async ({
    refreshToken
}) => {
    if (!refreshToken) {
        throw new ApiError(
            400,
            "Refresh token is required"
        );
    }

    const storedToken =
        await RefreshToken.findOne({
            token: refreshToken,
            isRevoked: false
        });

    if (!storedToken) {
        throw new ApiError(
            401,
            "Invalid refresh token"
        );
    }

    let decoded;

    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );
    } catch {
        throw new ApiError(
            401,
            "Refresh token expired or invalid"
        );
    }

    storedToken.isRevoked = true;

    await storedToken.save();

    const accessToken =
        generateAccessToken(
            decoded.userId
        );

    const newRefreshToken =
        generateRefreshToken(
            decoded.userId
        );

    await RefreshToken.create({
        userId: decoded.userId,
        token: newRefreshToken,
        expiresAt: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )
    });

    return {
        accessToken,
        refreshToken: newRefreshToken
    };
};