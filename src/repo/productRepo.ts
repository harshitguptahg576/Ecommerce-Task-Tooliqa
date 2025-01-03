import { Op } from "sequelize";
import models, { ModelsType } from "../models";

export const createProduct = async (
  productData: Partial<ModelsType>
): Promise<ModelsType> => {
  return models.Product.create(productData);
};

export const updateProduct = async (
  id: number,
  productData: Partial<ModelsType>
): Promise<[number, ModelsType[]]> => {
  return models.Product.update(productData, { where: { id }, returning: true });
};

export const deleteProduct = async (id: number): Promise<number> => {
  return models.Product.destroy({ where: { id } });
};

export const findProducts = async ({
  search,
  limit,
  offset,
}: {
  search: string | undefined;
  limit: number;
  offset: number;
}): Promise<{ rows: ModelsType[]; count: number }> => {
  const whereClause = search ? { name: { [Op.iLike]: `%${search}%` } } : {};
  return models.Product.findAndCountAll({ where: whereClause, limit, offset });
};

export const findProductById = async (
  id: number
): Promise<ModelsType | null> => {
  return models.Product.findByPk(id);
};
