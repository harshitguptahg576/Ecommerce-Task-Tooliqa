import { Router } from "express";
import { authenticateJWT, authorizeRole } from "../middlewares/auth";
import logController from "../controllers/logController";

class LogRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.post("/", authenticateJWT, logController.createLog);
    this.router.get(
      "/",
      authenticateJWT,
      authorizeRole(["admin"]),
      logController.listLogs
    );
  };
}

export default LogRouter;
