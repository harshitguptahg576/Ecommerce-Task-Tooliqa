import { Op } from "sequelize";
import models, { ModelsType } from "../models";

export const createLog = async (
  logData: Partial<ModelsType>
): Promise<ModelsType> => {
  return models.Log.create(logData);
};

export const findLogs = async (
  startDate: Date | null,
  endDate: Date | null,
  action: string | null
): Promise<ModelsType[]> => {
  const whereClause: any = {};
  if (startDate && endDate) {
    whereClause.createdAt = { [Op.between]: [startDate, endDate] };
  }
  if (action) {
    whereClause.action = action;
  }
  return models.Log.findAll({
    where: whereClause,
    order: [["createdAt", "DESC"]],
  });
};
