import {Router} from "express"
import {fetchAccountLedger, fetchLedgerEntry} from "../controllers/accountLedger.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = Router()

router.get("/:accountId",authMiddleware,fetchAccountLedger);

router.get("/entry/:ledgerId",authMiddleware,fetchLedgerEntry)

export default router;