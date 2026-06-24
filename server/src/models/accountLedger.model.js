import mongoose from "mongoose"

const accountLedgerSchema = new mongoose.Schema({
   accountId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"BankAccount",
    required:true
   },
   transactionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Transaction",
    required:true
   },
   type:{
    type:String,
    enum:["credit","debit"],
    required:true
   },
   amount:{ 
    type:Number,
    required:true
   },
   balanceBefore:{
    type:Number,
    required:true
   },
   balanceAfter:{
    type:Number,
    required:true
   },

},{timestamps:true})

const AccountLedger = mongoose.model("AccountLedger",accountLedgerSchema)

export default AccountLedger;