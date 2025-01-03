import models, { ModelsType } from "../models";

export const createUser = async (
  userData: Partial<ModelsType>
): Promise<ModelsType> => {
  return models.User.create(userData);
};

export const findUserByEmail = async (
  email: string
): Promise<ModelsType | null> => {
  return models.User.findOne({ where: { email } });
};
