
import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    phone:{
        type:String,
        required:true,
        trim:true
    },
    otp:{
        type:String,
        required:true,
        select:false
    },
    purpose:{
        type:String,
        enum:[
            "REGISTER",
            "RESET_PIN",
            "FORGOT_PASSWORD"
        ]
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{timestamps:false})

const Otp = mongoose.model("Otp",otpSchema)

export default Otp;

