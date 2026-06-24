import AsyncHandler from "../utils/AsyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import { getLedgerByAccount, getLedgerEntry } from "../services/accountLedger.service.js"

export const fetchAccountLedger = AsyncHandler(async(req,res)=>{
    const {accountId} = req.params;
    const result = await getLedgerByAccount(accountId);

    return res.status(200).json(
        new ApiResponse(200,result,"Ledger entries fetched successfully.")
    )
})

export const fetchLedgerEntry = AsyncHandler(async(req,res)=>{
    const {ledgerId} = req.params;
    const result = await getLedgerEntry(ledgerId);

    return res.status(200).json(
        new ApiResponse(200,result,"Ledger entry fetched successfully.")
    )
})