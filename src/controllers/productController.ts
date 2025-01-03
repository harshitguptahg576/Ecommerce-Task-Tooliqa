import dotenv from "dotenv";
import { httpStatus } from "../utils/httpService";
import {
  createProductSchema,
  updateProductSchema,
} from "../validator/productValidator";
import ProductService from "../services/productService";

dotenv.config({
  path: `.env`,
});

class ProductController {
  async createProduct(req: any, res: any) {
    try {
      console.log(`product: ${JSON.stringify(req.body)}`);
      const { error, value } = createProductSchema.validate(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }
      const product = await new ProductService().createProduct(value);

      return res.status(product.status).json({
        status: product.status == httpStatus.CREATED ? 1 : 0,
        message: product.message,
        data: product.data,
      });
    } catch (error: any) {
      console.error(`product Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async updateProduct(req: any, res: any) {
    try {
      const { error, value } = updateProductSchema.validate(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }
      const product = await new ProductService().updateExistingProduct(
        req.params?.id,
        value
      );

      return res.status(product.status).json({
        status: product.status == httpStatus.SUCCESS ? 1 : 0,
        message: product.message,
        data: product.data,
      });
    } catch (error: any) {
      console.error(`product Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async deleteProduct(req: any, res: any) {
    try {
      const product = await new ProductService().removeProduct(req.params.id);

      return res.status(product.status).json({
        status: product.status == httpStatus.SUCCESS ? 1 : 0,
        message: product.message,
        data: product.data,
      });
    } catch (error: any) {
      console.error(`product Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async listProducts(req: any, res: any) {
    try {
      const product = await new ProductService().getProducts(req.query);

      return res.status(product.status).json({
        status: product.status == httpStatus.SUCCESS ? 1 : 0,
        message: product.message,
        data: product.data,
        total: product.count,
      });
    } catch (error: any) {
      console.error(`product Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async getProduct(req: any, res: any) {
    try {
      const product = await new ProductService().getProductById(
        req.user?.id,
        req.params.id
      );

      return res.status(product.status).json({
        status: product.status == httpStatus.SUCCESS ? 1 : 0,
        message: product.message,
        data: product.data,
      });
    } catch (error: any) {
      console.error(`product Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }
}
export default new ProductController();
