import { Router } from "express";
import { authenticateJWT, authorizeRole } from "../middlewares/auth";
import analyticsController from "../controllers/analyticsController";

class AnalyticsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.get(
      "/product-sales",
      authenticateJWT,
      authorizeRole(["admin"]),
      analyticsController.getProductSales
    );
    this.router.get(
      "/average-order",
      authenticateJWT,
      authorizeRole(["admin"]),
      analyticsController.getAverageOrder
    );
  };
}

export default AnalyticsRouter;
