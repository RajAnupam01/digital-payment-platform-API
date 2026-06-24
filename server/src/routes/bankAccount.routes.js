import {Router} from "express"
import{getBalance,getAccountDetail,freezeAccount,unfreezeAccount} from "../controllers/bankAccount.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/balance",authMiddleware,getBalance);
router.get("/account-detail",authMiddleware,getAccountDetail);
router.patch("/freeze",authMiddleware,freezeAccount);
router.patch("/unfreeze",authMiddleware,unfreezeAccount);

export default router;

