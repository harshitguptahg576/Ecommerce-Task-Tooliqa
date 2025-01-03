import { Router } from "express";
import authController from "../controllers/authController";

class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.post("/register", authController.register);
    this.router.post("/login", authController.login);
  };
}

export default AuthRouter;
