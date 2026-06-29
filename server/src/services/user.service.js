import User from "../models/user.model.js"
import ApiError from "../utils/ApiError.js"
import Otp from "../models/otp.model.js"
import Notification from "../models/notification.model.js"


export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password -pin")

  if (!user) {
    throw new ApiError(404, "User not found.")
  }

  return user;
}

export const updateUserProfile = async (userId, data) => {
  const { name } = data;
  const user = await User.findByIdAndUpdate(userId, { name }, { new: true }).select("-password -pin")

  if (!user) {
    throw new ApiError(404, "User not found.")
  }
  return user;
}

export const updateUserPassWord = async (userId, data) => {
  const { newPassword } = data;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.password = newPassword;
  await user.save();

  const userObj = user.toObject();
  delete userObj.password;
  return userObj;
};


export const deleteUserAccount = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError("User not found.")
  }
  return true;
}

export const requestResetPin = async (phone) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.findOneAndUpdate({ phone, purpose: "RESET_PIN" }, { otp: code, expiresAt }, { upsert: true, new: true, setDefaultsOnInsert: true })


  return { phone, purpose: "RESET_PIN", code };
};


export const verifyResetPinOtp = async ({ phone, code, newPin }) => {
  const otp = await Otp.findOne({ phone, purpose: "RESET_PIN" }).select("+otp");
  if (!otp || otp.expiresAt < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  const user = await User.findOne({ phone });
  if (!user) throw new ApiError(404, "User not found");

  user.pin = newPin;
  await user.save();

  await Otp.deleteOne({ _id: otp._id });
  await Notification.create({ userId: user._id, type: "PIN_CHANGED" });

  return { message: "PIN updated successfully" };
};


export const requestForgotPassword = async (phone) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.findOneAndUpdate({ phone, purpose: "FORGOT_PASSWORD" }, { otp: code, expiresAt }, { upsert: true, new: true, setDefaultsOnInsert: true })
  return { phone, purpose: "FORGOT_PASSWORD", code };
};


export const verifyForgotPasswordOtp = async ({ phone, code, newPassword }) => {
  const otp = await Otp.findOne({ phone, purpose: "FORGOT_PASSWORD" }).select("+otp");

  if (!otp || otp.expiresAt < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  const user = await User.findOne({ phone }).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  user.password = newPassword;
  await user.save();

  await Otp.deleteOne({ _id: otp._id });
  await Notification.create({ userId: user._id, type: "PASSWORD_RESET" });

  return { message: "Password updated successfully" };
}