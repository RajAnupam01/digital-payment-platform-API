import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import {completeUserKyc} from "../services/kyc.service.js"

export const completeKyc = AsyncHandler(async(req,res)=>{
    const result = await completeUserKyc(req.user._id,req.body);

    return res.status(200).json(
        new ApiResponse(200,result,"KYC completed successfully.")
        
    )
})