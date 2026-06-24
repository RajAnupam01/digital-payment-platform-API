import {z} from "zod"

export const kycSchema = z.object({
    pin:z.string().regex(/^[0-9]{4}$/,"Pin must be 4 digit"),
    phone:z.string().regex(/^[0-9]{10}$/,"Phone must be 10 digits."),
    accountNumber: z.string().regex(/^[0-9]{12}$/,"Account Number must be 12 digits."),
    bankName:z.enum(["sbi","hdfc","icici","axis","yes","pnb"])
})