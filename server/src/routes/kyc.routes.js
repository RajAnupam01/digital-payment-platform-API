import {Router} from "express"
import {validate} from "../middlewares/validate.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import {completeKyc} from "../controllers/kyc.controller.js"
import { kycSchema } from "../validations/kyc.validation.js";

const router = Router()

router.post("/verify",authMiddleware,validate(kycSchema),completeKyc);

export default router;