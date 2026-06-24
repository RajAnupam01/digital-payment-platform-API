import User from "../models/user.model.js"
import BankAccount from "../models/bankAccount.model.js"
import Notification from "../models/notification.model.js"
import ApiError from "../utils/ApiError.js"

export const completeUserKyc = async(userId,{bankName,accountNumber,pin,phone})=>{
    const user = await User.findById(userId);
    if(!user){
        await Notification.create({userId, type:"ACCOUNT_VERIFICATION_FAILED"})
        throw new ApiError(404,"User not found")

    }
    if(user.isKycCompleted){
        await Notification.create({userId, type:"ACCOUNT_VERIFICATION_FAILED"})
        throw new ApiError(400,"KYC already completed.")
    }
    user.upiId = `${phone}@${bankName}`
    user.pin = pin
    user.isKycCompleted=true
    await user.save();

    const intialBalance = Math.floor(Math.random() * (100000 - 100 + 1)) + 100;

    const account = await BankAccount.create({
        userId,
        bankName,
        accountNumber,
        balance:intialBalance
    })

    await Notification.create({userId, type:"KYC_VERIFIED"})
   

    return {user,account}
}