import models, { ModelsType } from "../models/index.js";
import {
  createOrder,
  findOrderById,
  findOrdersByUserId,
} from "../repo/orderRepo.js";
import { findProductById } from "../repo/productRepo.js";
import { httpStatus } from "../utils/httpService.js";
import { Messages } from "../utils/messages.js";
import WebSocket from "../webSocket.js";
import LogService from "./logService.js";
import ProductService from "./productService.js";

class OrderService {
  constructor() {}

  async createOrder(
    userId: number,
    items: { productId: number; quantity: number }[]
  ): Promise<object | any> {
    try {
      let total = 0;

      const orderItems: Partial<Omit<ModelsType, "id" | "orderId">>[] = [];

      for (const item of items) {
        const product = await findProductById(item.productId);

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.inventory < item.quantity) {
          throw new Error(`Product ${item.productId} is out of stock`);
        }
        total += product.price * item.quantity;
        orderItems.push({
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
        await new ProductService().updateExistingProduct(item.productId, {
          inventory: product.inventory - item.quantity,
        });
        WebSocket.io.to("product-updates").emit("product-update", {
          productId: item.productId,
          inventory: product.inventory - item.quantity,
        });
      }

      const createdOrder = JSON.parse(
        JSON.stringify(
          await createOrder({ userId, status: "pending", total }, orderItems)
        )
      );
      if (!createdOrder) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Order not created, please try again`,
        };
      }

      await new LogService().createLog(userId, `order-created`, {
        orderId: createdOrder.id,
        items: orderItems,
      });

      return {
        status: httpStatus.CREATED,
        message: `Order ${Messages.SUCCESS_CREATED}`,
        data: { ...createdOrder, orderItems },
      };
    } catch (err: any) {
      console.log(err);

      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getUserOrders(userId: number): Promise<object | any> {
    try {
      const orders = await findOrdersByUserId(userId);
      if (!orders) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `No orders found for user ${userId}`,
        };
      }
      return {
        status: httpStatus.SUCCESS,
        message: `Orders ${Messages.SUCCESS_FETCHED}`,
        data: orders,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getOrderById(orderId: number): Promise<object | any> {
    try {
      const order = await findOrderById(orderId);
      if (!order) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Order ${Messages.NOT_FOUND}`,
        };
      }
      return {
        status: httpStatus.SUCCESS,
        message: `Order ${Messages.SUCCESS_FETCHED}`,
        data: order,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default OrderService;
