import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth";
import orderController from "../controllers/orderController";

class OrderRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.post("/", authenticateJWT, orderController.createOrder);
    this.router.get("/", authenticateJWT, orderController.listOrders);
    this.router.get("/:id", authenticateJWT, orderController.getOrder);
  };
}

export default OrderRouter;
