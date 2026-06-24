import { z } from "zod"

export const transferSchema = z.object({
    receiverUpiId: z.string().regex(/^[0-9]{10}@(sbi|icici|yes|axis|hdfc|pnb)$/,"Invalid UPI ID format"),
    amount: z.number().positive().min(1).max(100000),
    pin: z.string().regex(/^[0-9]{4}$/)

})