import express from "express";
import dotenv from "dotenv";
import AuthRouter from "./authRouter";
import ProductRouter from "./productRouter";
import OrderRouter from "./orderRouter";
import AnalyticsRouter from "./analyticsRouter";
import LogRouter from "./logRouter";

dotenv.config({
  path: `${process.env.NODE_ENV ? ".env." + process.env.NODE_ENV : ".env"}`,
});

export default class Routes {
  static init(server: { app: express.Application }) {
    server.app.get("/", (req, res) => {
      res.send("Ecommerce Server is working fine.");
    });

    server.app.use("/api/v1/auth", new AuthRouter().router);
    server.app.use("/api/v1/products", new ProductRouter().router);
    server.app.use("/api/v1/orders", new OrderRouter().router);
    server.app.use("/api/v1/analytics", new AnalyticsRouter().router);
    server.app.use("/api/v1/logs", new LogRouter().router);
  }
}
