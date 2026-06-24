import asyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import {
    registerUser,
    loginUser,
    logoutUser,
    rotateUserToken,
    verifyRegisterOtp,
} from "../services/auth.service.js";


export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);
  return res.status(201).json(new ApiResponse(201, result, "OTP sent for registration"));
});


export const verifyOtp = asyncHandler(async (req, res) => {
  const result = await verifyRegisterOtp(req.body);
  return res.status(200).json(new ApiResponse(200, result, "User verified and registered successfully"));
});


export const login = asyncHandler( async (req, res) => {
    const result = await loginUser(req.body);

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "User logged in successfully"
            )
        );
    }
);

export const logout = asyncHandler( async (req, res) => { 

        await logoutUser(req.body);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "User logged out successfully"
            )
        );
    }
);

export const rotateToken = asyncHandler(async (req, res) => {
        const result =
            await rotateUserToken(
                req.body
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Token refreshed successfully"
            )
        );
    });