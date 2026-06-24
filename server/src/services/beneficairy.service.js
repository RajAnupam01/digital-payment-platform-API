import Beneficairy from "../models/beneficairy.model.js";
import ApiError from "../utils/ApiError.js";

export const addBeneficairy = async (ownerId, beneficairyId) => {
  const existing = await Beneficairy.findOne({ ownerId, beneficairyId });

  if (existing) {
    throw new ApiError(400, "Beneficairy already exists");
  }

  return await Beneficairy.create({
    ownerId,
    beneficairyId
  });
};

export const listBeneficairies = async (ownerId) => {
  return await Beneficairy.find({ ownerId })
    .populate("beneficairyId", "name upiId phone");
};

export const removeBeneficairy = async (ownerId, beneficairyId) => {
  const beneficairy = await Beneficairy.findOneAndDelete({
    ownerId,
    beneficairyId
  });

  if (!beneficairy) {
    throw new ApiError(404, "Beneficairy not found");
  }

  return beneficairy;
};
