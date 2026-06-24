import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js"
import { freezeUserAccount, getUserAccoutDetail, getUserBalance, unfreezeUserAccount } from "../services/bankAccount.service.js"

export const getAccountDetail = AsyncHandler(async(req,res)=>{
   const result = await getUserAccoutDetail(req.user._id)

   return res.status(200).json(
    new ApiResponse(200,result,"Account Details fetched successfully.")
   )
})

export const getBalance = AsyncHandler(async(req,res)=>{
    const result = await getUserBalance(req.user._id)

    return res.status(200).json(
        new ApiResponse(200,result,"Balance fetched successfully.")
    )
})

export const freezeAccount = AsyncHandler(async(req,res)=>{
    const result = await freezeUserAccount(req.user._id)

    return res.status(200).json(
        new ApiResponse(200,result,"Account freezed successfully.")
    )
})

export const unfreezeAccount = AsyncHandler(async(req,res)=>{
    const result = await unfreezeUserAccount(req.user._id)

    return res.status(200).json(
        new ApiResponse(200,result,"Account unfreeze successfully.")
    )
})