import AccountLedger from "../models/accountLedger.model.js"
import ApiError from "../utils/ApiError.js"

export const getLedgerByAccount = async(accountId)=>{
    const entries = await AccountLedger.find({accountId}).populate("transactionId").sort("-1")

    if(!entries || entries.length === 0){
        throw new ApiError(404,"No ledger entries found for this account.")
    }

    return entries
}

export const getLedgerEntry = async(ledgerId) =>{
    const entry = await AccountLedger.findById(ledgerId).populate("transactionId")

    if(!entry){
        throw new ApiError(404,"Ledger entry not found.")
    }
    return entry
}