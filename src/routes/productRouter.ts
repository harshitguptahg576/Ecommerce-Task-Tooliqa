import { Router } from "express";
import { authenticateJWT, authorizeRole } from "../middlewares/auth";
import productController from "../controllers/productController";

class ProductRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes = () => {
    this.router.get("/", productController.listProducts);
    this.router.get("/:id", authenticateJWT, productController.getProduct);
    this.router.post(
      "/",
      authenticateJWT,
      authorizeRole(["admin"]),
      productController.createProduct
    );
    this.router.put(
      "/:id",
      authenticateJWT,
      authorizeRole(["admin"]),
      productController.updateProduct
    );
    this.router.delete(
      "/:id",
      authenticateJWT,
      authorizeRole(["admin"]),
      productController.deleteProduct
    );
  };
}

export default ProductRouter;
