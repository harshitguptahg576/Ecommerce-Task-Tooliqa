import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../config/swagger.js";

dotenv.config({
  path: `.env`,
});
export default class Middleware {
  static init(server: { app: express.Application }) {
    // express middleware
    server.app.use(express.urlencoded({ extended: false }));
    server.app.use(express.json());

    server.app.use(bodyParser.json({ limit: "1000mb" }));
    server.app.use(bodyParser.urlencoded({ limit: "1000mb", extended: true }));
    server.app.use(express.json({ limit: "1000mb" }));
    server.app.use(express.urlencoded({ limit: "1000mb", extended: true }));

    server.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // cors middleware
    var corsOptions = {
      origin: "*",
      optionsSuccessStatus: 200,
    };
    server.app.use(cors(corsOptions));
    server.app.use((req, res, next) => {
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, PATCH, PUT, DELETE, OPTIONS "
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With," +
          " Content-Type, Accept," +
          " Authorization," +
          " Access-Control-Allow-Credentials"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }
}
