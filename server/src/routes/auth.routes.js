import {Router} from "express"
import {register,verifyOtp, login, logout, rotateToken} from "../controllers/auth.controller.js"

import {validate} from "../middlewares/validate.js"

import {registerSchema,loginSchema,verifyRegisterOtpSchema } from "../validations/auth.validation.js"

import {refreshTokenSchema} from "../validations/refreshTokenValidation.js"

const router = Router();

router.post("/register",validate(registerSchema),register);

router.post("/register-otp",validate(verifyRegisterOtpSchema),verifyOtp)

router.post("/login",validate(loginSchema),login);

router.post("/logout",validate(refreshTokenSchema),logout);

router.post("/rotate-token",validate(refreshTokenSchema),rotateToken);

export default router;