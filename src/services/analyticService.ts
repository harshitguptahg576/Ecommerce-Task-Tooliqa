import { col, fn } from "sequelize";
import models from "../models/index.js";
import { httpStatus } from "../utils/httpService.js";
import { Messages } from "../utils/messages.js";

class AnalyticsService {
  constructor() {}

  async getProductSales(): Promise<object | any> {
    try {
      const productSales = await models.OrderItem.findAll({
        attributes: [
          "productId",
          [fn("SUM", col("quantity")), "totalQuantity"],
        ],
        group: ["productId"],
      });
      return {
        status: httpStatus.SUCCESS,
        message: `Product sales ${Messages.SUCCESS_FETCHED}`,
        data: productSales,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getAverageOrder(): Promise<object | any> {
    try {
      const averageOrder = await models.Order.findAll({
        attributes: [[fn("AVG", col("total")), "averageOrder"]],
      });
      return {
        status: httpStatus.SUCCESS,
        message: `Average order ${Messages.SUCCESS_FETCHED}`,
        data: averageOrder,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default AnalyticsService;
