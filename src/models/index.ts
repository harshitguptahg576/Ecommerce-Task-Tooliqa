import { DataTypes, Sequelize } from "sequelize";
import UserModel from "./user";
import ProductModel from "./product";
import OrderModel from "./order";
import OrderItemModel from "./orderItem";
import LogModel from "./log";

const models: { [key: string]: any } = {
  User: UserModel,
  product: ProductModel,
  Order: OrderModel,
  OrderItem: OrderItemModel,
  Log: LogModel,
};

export const initModels = (sequelize: Sequelize) => {
  models.User = UserModel(sequelize, DataTypes);
  models.Product = ProductModel(sequelize, DataTypes);
  models.Order = OrderModel(sequelize, DataTypes);
  models.OrderItem = OrderItemModel(sequelize, DataTypes);
  models.Log = LogModel(sequelize, DataTypes);

  Object.entries(models).forEach(([modelName, model]) => {
    if (model.associate) {
      model.associate(models);
    }
  });
};

export default models;

export type ModelsType = typeof models;
