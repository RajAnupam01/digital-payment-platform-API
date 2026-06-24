import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  listNotifications,
  readNotification,
  deleteAllNotifications
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", authMiddleware, listNotifications);
router.patch("/:id/read", authMiddleware, readNotification);
router.delete("/clear", authMiddleware, deleteAllNotifications);

export default router;
