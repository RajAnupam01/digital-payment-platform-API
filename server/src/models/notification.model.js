import mongoose from "mongoose"

const notificationSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: [
            "MONEY_SENT",
            "MONEY_RECEIVED",
            "TRANSACTION_FAILED",
            "ACCOUNT_VERIFIED",
            "ACCOUNT_VERIFICATION_FAILED",
            "KYC_VERIFIED",
            "PIN_CHANGED"
        ]
    },
    isRead: {
        type: Boolean,
        default: false
    }

}, {timestamps:true})

const Notification = mongoose.model("Notification", notificationSchema)

export default Notification;