import BankAccount from "../models/bankAccount.model.js";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import AccountLedger from "../models/accountLedger.model.js";
import ApiError from "../utils/ApiError.js";

export const sendUserMoney = async (
  senderId,
  { receiverUpiId, amount, pin }
) => {

  const sender = await User.findById(senderId)
    .select("+pin");

  if (!sender) {
    throw new ApiError(404, "Sender not found");
  }

  const senderAccount = await BankAccount.findOne({
    userId: senderId
  });

  if (!senderAccount) {
    throw new ApiError(404, "Sender account not found");
  }

  if (senderAccount.status === "frozen") {
    throw new ApiError(
      403,
      "Sender account is frozen"
    );
  }

  // Self transfer

  if (sender.upiId === receiverUpiId) {

    const failedTx = await Transaction.create({
      senderAccountId: senderAccount._id,
      receiverAccountId: senderAccount._id,
      amount,
      type: "transfer",
      status: "failed",
      failureReason: "SELF_TRANSFER_NOT_ALLOWED"
    });

    await Notification.create({
      userId: senderId,
      type: "TRANSACTION_FAILED"
    });

    return {
      transaction: failedTx,
      message: "Self transfer not allowed"
    };
  }

  // PIN validation

  const isPinCorrect =
    await sender.comparePin(pin);

  if (!isPinCorrect) {

    const failedTx = await Transaction.create({
      senderAccountId: senderAccount._id,
      amount,
      type: "transfer",
      status: "failed",
      failureReason: "INVALID_PIN"
    });

    await Notification.create({
      userId: senderId,
      type: "TRANSACTION_FAILED"
    });

    return {
      transaction: failedTx,
      message: "Invalid PIN"
    };
  }

  // Balance validation

  if (senderAccount.balance < amount) {

    const failedTx = await Transaction.create({
      senderAccountId: senderAccount._id,
      amount,
      type: "transfer",
      status: "failed",
      failureReason: "INSUFFICIENT_BALANCE"
    });

    await Notification.create({
      userId: senderId,
      type: "TRANSACTION_FAILED"
    });

    return {
      transaction: failedTx,
      message: "Insufficient balance"
    };
  }

  // Receiver validation

  const receiver = await User.findOne({
    upiId: receiverUpiId
  });

  if (!receiver || !receiver.isVerified) {

    const failedTx = await Transaction.create({
      senderAccountId: senderAccount._id,
      amount,
      type: "transfer",
      status: "failed",
      failureReason: "RECEIVER_NOT_FOUND"
    });

    await Notification.create({
      userId: senderId,
      type: "TRANSACTION_FAILED"
    });

    return {
      transaction: failedTx,
      message: "Receiver not found"
    };
  }

  const receiverAccount =
    await BankAccount.findOne({
      userId: receiver._id
    });

  if (!receiverAccount) {
    throw new ApiError(
      404,
      "Receiver account not found"
    );
  }

  if (receiverAccount.status === "frozen") {
    throw new ApiError(
      403,
      "Receiver account is frozen"
    );
  }

  // Demo server failure

  if (Math.random() < 0.2) {

    const failedTx = await Transaction.create({
      senderAccountId: senderAccount._id,
      receiverAccountId: receiverAccount._id,
      amount,
      type: "transfer",
      status: "failed",
      failureReason: "SERVER_ERROR"
    });

    await Notification.create({
      userId: senderId,
      type: "TRANSACTION_FAILED"
    });

    return {
      transaction: failedTx,
      message: "Server error"
    };
  }

  const balanceBeforeSender =
    senderAccount.balance;

  const balanceBeforeReceiver =
    receiverAccount.balance;

  senderAccount.balance -= amount;
  receiverAccount.balance += amount;

  await senderAccount.save();
  await receiverAccount.save();

  const transaction =
    await Transaction.create({
      senderAccountId: senderAccount._id,
      receiverAccountId: receiverAccount._id,
      amount,
      type: "transfer",
      status: "success",
      completedAt: new Date()
    });

  await AccountLedger.create({
    accountId: senderAccount._id,
    transactionId: transaction._id,
    type: "debit",
    amount,
    balanceBefore: balanceBeforeSender,
    balanceAfter: senderAccount.balance
  });

  await AccountLedger.create({
    accountId: receiverAccount._id,
    transactionId: transaction._id,
    type: "credit",
    amount,
    balanceBefore: balanceBeforeReceiver,
    balanceAfter: receiverAccount.balance
  });

  await Notification.create({
    userId: senderId,
    type: "MONEY_SENT"
  });

  await Notification.create({
    userId: receiver._id,
    type: "MONEY_RECEIVED"
  });

  return {
    transaction,
    senderAccount,
    receiverAccount
  };
};