import { Sequelize } from "sequelize";
import express from "express";
import dotenv from "dotenv";
import { initModels } from "../models";

dotenv.config();

export default class Connection {
  public static sequelize: Sequelize;
  public static init(server: { app: express.Application }) {
    this.sequelize = new Sequelize(process.env.DATABASE_URL!, {
      dialect: "postgres",
      logging: false,
      // dialectOptions: {
      //   ssl: {
      //     require: false,
      //     rejectUnauthorized: false,
      //   },
      // },
    });
    // server.app.use((req, res, next) => {
    //     this.sequelize.authenticate().then(next).catch(next);
    // });
    // server.app.use((req, res, next) => {
    //     this.sequelize.sync().then(next).catch(next);
    // });

    initModels(this.sequelize);

    // Optionally sync the database
    this.sequelize
      .sync()
      .then(() => {
        console.log("Database synced successfully");
      })
      .catch((error) => {
        console.error("Failed to sync database:", error);
      });
  }
}
