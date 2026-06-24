import {Router} from "express"
import {validate} from "../middlewares/validate.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import {sendMoney} from "../controllers/transaction.controller.js"
import { transferSchema} from "../validations/transaction.validate.js";

const router = Router()

router.post("/transfer",authMiddleware,validate(transferSchema),sendMoney)

export default router;