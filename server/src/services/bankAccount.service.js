import BankAccount from "../models/bankAccount.model.js"
import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"

export const getUserAccoutDetail = async (userId) => {
    const account = await BankAccount.findOne({ userId });

    if (!account) {
        throw new ApiError(404, "Bank Account not found.");
    }

    const user = await User.findById(userId).select("upiId");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    return {
        ...account.toObject(),
        upiId: user.upiId
    };
};

export const getUserBalance = async(userId)=>{
    const account = await BankAccount.findOne({userId});
    if(!account){
        throw new ApiError(404,"Bank Account not found.")
    }
    return {balance:account.balance}
}

export const freezeUserAccount = async(userId)=>{
    const account = await BankAccount.findOneAndUpdate(
        {userId},
        {status:"frozen"},
        {new:true}
    );
    if(!account){
        throw new ApiError(404,"Bank Account not found.")
    }
    return account
}

export const unfreezeUserAccount = async(userId)=>{
    const account = await BankAccount.findOneAndUpdate(
        {userId},
        {status:"active"},
        {new:true}
    )
    if(!account){
        throw new ApiError(404,"Bank Account not found.")
    }
    return account

}