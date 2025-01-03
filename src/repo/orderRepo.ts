import Connection from "../config/connection";
import models, { ModelsType } from "../models";

export const createOrder = async (
  orderData: Partial<ModelsType>,
  items: Partial<ModelsType>[]
): Promise<ModelsType> => {
  return Connection.sequelize.transaction(async (t: any) => {
    const order = await models.Order.create(orderData, { transaction: t });
    await models.OrderItem.bulkCreate(
      items.map((item) => ({ ...item, orderId: order.id })),
      { transaction: t, returning: false }
    );
    return order;
  });
};

export const findOrdersByUserId = async (
  userId: number
): Promise<ModelsType[]> => {
  return models.Order.findAll({ where: { userId } });
};

export const findOrderById = async (
  orderId: number
): Promise<ModelsType | null> => {
  return models.Order.findOne({
    where: { id: orderId },
    include: [
      {
        model: models.OrderItem,
        attributes: ["quantity", "price", "productId"],
        include: [
          { model: models.Product, attributes: ["name", "description"] },
        ],
      },
    ],
  });
};
