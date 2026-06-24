import {z} from "zod"

export const registerSchema = z.object({
    name:z.string().min(2).max(20),
    phone:z.string().regex(/^[0-9]{10}$/,"Phone must be 10 digits."),
    password:z.string().min(6,"Password must be at least 6 characters").max(20,"Password must not be more than 12 digits"),
})

export const verifyRegisterOtpSchema = z.object({
    phone:z.string().regex(/^[0-9]{10}$/,"Phone must be 10 digits."),
    code: z.string().length(6, "OTP must be 6 digits"),
})

export const loginSchema = z.object({
     phone:z.string().regex(/^[0-9]{10}$/),
    password:z.string().min(6)
})
