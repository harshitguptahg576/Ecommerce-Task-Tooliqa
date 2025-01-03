import express from "express";
import { config } from "dotenv";
import dotenv from "dotenv";
dotenv.config({
  path: `${process.env.NODE_ENV ? ".env." + process.env.NODE_ENV : ".env"}`,
});
import Middleware from "./middlewares/middleware";
import Connection from "./config/connection";
import Routes from "./routes/routes";
import CronJobs from "./cron/jobs";

/**
 * @class App
 */
export class App {
  app: any;

  constructor() {
    config();
    this.app = express();
    Middleware.init(this);
    Connection.init(this);
    Routes.init(this);
    CronJobs.init();
  }
}

export default new App().app;
