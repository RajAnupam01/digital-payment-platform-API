import Notification from "../models/notification.model.js";
import ApiError from "../utils/ApiError.js";

export const getNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};


export const markNotificationRead = async (userId, notificationId) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true }
  );
  if (!notification) throw new ApiError(404, "Notification not found");
  return notification;
};


export const clearNotifications = async (userId) => {

  await Notification.deleteMany({ userId });
  return { message: "All notifications cleared" };
};