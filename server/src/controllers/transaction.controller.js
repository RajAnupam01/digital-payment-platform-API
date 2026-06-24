import ApiResponse from "../utils/ApiResponse.js"
import AsyncHandler from "../utils/AsyncHandler.js"
import { sendUserMoney } from "../services/transaction.service.js"


export const sendMoney = AsyncHandler(async (req, res) => {
  const result = await sendUserMoney(req.user._id, req.body);

  if (result.transaction.status === "failed") {
    return res.status(400).json(
      new ApiResponse(400, result, "Transaction failed")
    );
  }

  return res.status(200).json(
    new ApiResponse(200, result, "Transaction success")
  );
});