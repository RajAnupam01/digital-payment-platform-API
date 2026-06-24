import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createBeneficairy,
  deleteBeneficairyController,
  listBeneficairiesController
} from "../controllers/beneficairy.controller.js";

const router = Router();

router.post("/add", authMiddleware, createBeneficairy);
router.get("/fetch", authMiddleware, listBeneficairiesController);
router.delete("/remove/:id", authMiddleware, deleteBeneficairyController);

export default router;