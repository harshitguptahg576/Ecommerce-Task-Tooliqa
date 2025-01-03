import dotenv from "dotenv";
import { httpStatus } from "../utils/httpService";
import { createOrderSchema } from "../validator/orderValidator";
import OrderService from "../services/orderService";

dotenv.config({
  path: `.env`,
});

class OrderController {
  async createOrder(req: any, res: any) {
    try {
      console.log(`order: ${JSON.stringify(req.body)}`);
      const { error, value } = createOrderSchema.validate(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const { items } = value;
      const userId = req.user!.id;
      const order = await new OrderService().createOrder(userId, items);

      return res.status(order.status).json({
        status: order.status == httpStatus.CREATED ? 1 : 0,
        message: order.message,
        data: order.data,
      });
    } catch (error: any) {
      console.error(`order Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async listOrders(req: any, res: any) {
    try {
      const userId = req.user!.id;
      const orders = await new OrderService().getUserOrders(userId);

      return res.status(orders.status).json({
        status: orders.status == httpStatus.SUCCESS ? 1 : 0,
        message: orders.message,
        data: orders.data,
      });
    } catch (error: any) {
      console.error(`order Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async getOrder(req: any, res: any) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;
      const order = await new OrderService().getOrderById(id);

      return res.status(order.status).json({
        status: order.status == httpStatus.SUCCESS ? 1 : 0,
        message: order.message,
        data: order.data,
      });
    } catch (error: any) {
      console.error(`order Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }
}
export default new OrderController();
