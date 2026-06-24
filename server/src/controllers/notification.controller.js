import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  getNotifications,
  markNotificationRead,
  clearNotifications
} from "../services/notification.service.js";

export const listNotifications = AsyncHandler(async (req, res) => {
  const result = await getNotifications(req.user._id);
  return res.status(200).json(new ApiResponse(200, result, "Notifications fetched successfully"));
});

export const readNotification = AsyncHandler(async (req, res) => {
  const result = await markNotificationRead(req.user._id, req.params.id);
  return res.status(200).json(new ApiResponse(200, result, "Notification marked as read"));
});

export const deleteAllNotifications = AsyncHandler(async (req, res) => {
  const result = await clearNotifications(req.user._id);
  return res.status(200).json(new ApiResponse(200, result, "All notifications cleared"));
});