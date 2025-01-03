import Joi from "joi";

export const createLogSchema = Joi.object({
  action: Joi.string().required(),
  details: Joi.object().required(),
});
