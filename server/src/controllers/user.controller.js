import AsyncHandler from "../utils/AsyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import {getUserProfile, updateUserProfile,updateUserPassWord,deleteUserAccount,requestResetPin,verifyResetPinOtp,requestForgotPassword,verifyForgotPasswordOtp} from "../services/user.service.js"

export const getProfile = AsyncHandler(async(req,res)=>{
   const result = await getUserProfile(req.user._id);

   return res.status(200).json(
    new ApiResponse(200, result,"User profile fetched successfully.")
   )
})

export const updateProfile = AsyncHandler(async(req,res)=>{
    const result = await updateUserProfile(req.user._id,req.body)

    return res.status(200).json(
        new ApiResponse(200, result,"User profile updated successfully.")
    )
})

export const updatePassword = AsyncHandler(async(req,res)=>{
    const result = await updateUserPassWord(req.user._id, req.body)

    return res.status(200).json(
        new ApiResponse(200, result, "User password updated successfully.")
    )
})

export const deleteAccount = AsyncHandler(async(req,res)=>{
    const result = await deleteUserAccount(req.user._id,)

    return res.status(200).json(
        new ApiResponse(200, result, "User account deleted successfully.")
    )
})

export const resetPinRequest = AsyncHandler(async (req, res) => {
  const result = await requestResetPin(req.body.phone);
  return res.status(200).json(new ApiResponse(200, result, "OTP sent for PIN reset"));
});

export const resetPinVerify = AsyncHandler(async (req, res) => {
  const result = await verifyResetPinOtp(req.body);
  return res.status(200).json(new ApiResponse(200, result, "PIN reset successful"));
});

// Forgot Password
export const forgotPasswordRequest = AsyncHandler(async (req, res) => {
  const result = await requestForgotPassword(req.body.phone);
  return res.status(200).json(new ApiResponse(200, result, "OTP sent for password reset"));
});

export const forgotPasswordVerify = AsyncHandler(async (req, res) => {
  const result = await verifyForgotPasswordOtp(req.body);
  return res.status(200).json(new ApiResponse(200, result, "Password reset successful"));
})

