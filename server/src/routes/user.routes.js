import {Router} from "express"
import {getProfile,updateProfile,updatePassword,deleteAccount, forgotPasswordRequest,forgotPasswordVerify,resetPinRequest,resetPinVerify} from "../controllers/user.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
import {resetPinRequestSchema,resetPinVerifySchema,forgotPasswordRequestSchema,forgotPasswordVerifySchema} from "../validations/user.validation.js"
import {validate} from "../middlewares/validate.js"

const router = Router()

router.get("/me" ,authMiddleware,getProfile );
router.put("/:id",authMiddleware,updateProfile);
router.put("/:id/password",authMiddleware,updatePassword);
router.delete("/:id",authMiddleware,deleteAccount);

router.post("/reset-pin/request",authMiddleware,validate(resetPinRequestSchema),resetPinRequest)
router.post("/reset-pin/verify",authMiddleware,validate(resetPinVerifySchema),resetPinVerify);
router.post("/forgot-password/request",authMiddleware,validate(forgotPasswordRequestSchema),forgotPasswordRequest);
router.post("/forgot-password/verify",authMiddleware,validate(forgotPasswordVerifySchema),forgotPasswordVerify)



export default router;