import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid";

const transactionSchema = new mongoose.Schema({
    senderAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
        required: true,
        index: true
    },
    receiverAccountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BankAccount",
        default: null
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    type: {
        type: String,
        enum: ["transfer", "withdrawal", "topup", "refund"],
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending"
    },
    failureReason: {
        type: String,
        enum: [
            "INSUFFICIENT_BALANCE",
            "INVALID_PIN",
            "ACCOUNT_FROZEN",
            "RECEIVER_NOT_FOUND",
            "SELF_TRANSFER_NOT_ALLOWED",
            "DAILY_LIMIT_EXCEEDED",
            "SERVER_ERROR"
        ]
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true })

transactionSchema.pre("validate", function () {
    if (!this.transactionId) {
        this.transactionId = uuidv4();
    }
}
)

const Transaction = mongoose.model("Transaction", transactionSchema)

export default Transaction;


