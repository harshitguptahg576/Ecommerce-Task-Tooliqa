import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(null, ""),
  price: Joi.number().integer().min(0).required(),
  inventory: Joi.number().integer().min(0).required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string().allow(null, ""),
  price: Joi.number().integer().min(0),
  inventory: Joi.number().integer().min(0),
});
