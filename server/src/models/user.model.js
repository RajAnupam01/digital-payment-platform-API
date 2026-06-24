import bcrypt from "bcrypt"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index:true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    pin: {
        type: String,
        select: false
    },
    upiId: {
        type: String,
        index:true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isKycCompleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    accountStatus: {
        type: String,
        enum: ["active", "blocked", "suspended"],
        default: "active"
    },
    failedPinAttempts: {
        type: Number,
        default: 0
    },
    pinLockedUntil: {
        type: Date,
        default: null
    }
}, { timestamps: true })

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    if(this.isModified("pin")){
        this.pin = await bcrypt.hash(this.pin,12)
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password,this.password)
}

userSchema.methods.comparePin = function(pin){
    return bcrypt.compare(pin,this.pin)
}

const User = mongoose.model("User", userSchema);
export default User;
