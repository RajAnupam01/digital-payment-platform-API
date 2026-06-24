import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  addBeneficairy,
  listBeneficairies,
  removeBeneficairy
} from "../services/beneficairy.service.js";

export const createBeneficairy = AsyncHandler(async (req, res) => {
  const result = await addBeneficairy(
    req.user._id,
    req.body.beneficairyId
  );

  return res
    .status(201)
    .json(new ApiResponse(201, result, "Beneficairy added successfully"));
});

export const listBeneficairiesController = AsyncHandler(async (req, res) => {
  const result = await listBeneficairies(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Beneficairies fetched successfully"));
});

export const deleteBeneficairyController = AsyncHandler(async (req, res) => {
  const result = await removeBeneficairy(req.user._id, req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Beneficairy removed successfully"));
});
