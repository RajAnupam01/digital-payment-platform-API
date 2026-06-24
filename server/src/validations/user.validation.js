import { z } from "zod";


export const resetPinRequestSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits."),
});


export const resetPinVerifySchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/),
  code: z.string().length(6, "OTP must be 6 digits"),
  newPin: z.string().regex(/^[0-9]{4}$/, "PIN must be 4 digits"),
});


export const forgotPasswordRequestSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits."),
});


export const forgotPasswordVerifySchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/),
  code: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(6, "Password must be at least 6 characters").max(12, "Password must not be more than 12 digits"),
});
