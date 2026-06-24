import mongoose from "mongoose";

const bankAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    bankName:{
      type:String,
      enum:["sbi","hdfc","icici","axis","yes","pnb"],
      required:true
    },

    accountNumber:{
      type:String,
      required:true,
      unique:true
    },

    balance: {
      type: Number,
      default: 0,
      min: 0
    },

    status: {
      type: String,
      enum: ["active", "frozen"],
      default: "active"
    },

    lastTransactionAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

bankAccountSchema.pre("save", function(){
  if(this.isModified("balance")){
    this.lastTransactionAt = new Date()
  }
})

const BankAccount = mongoose.model("BankAccount",bankAccountSchema );

export default BankAccount



