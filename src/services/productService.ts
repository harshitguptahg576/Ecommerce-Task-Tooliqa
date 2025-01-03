import { httpStatus } from "../utils/httpService.js";
import { Messages } from "../utils/messages.js";
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProducts,
  updateProduct,
} from "../repo/productRepo.js";
import LogService from "./logService.js";

class ProductService {
  constructor() {}

  async createProduct(product: any): Promise<object | any> {
    try {
      const newProduct = await createProduct(product);

      if (!newProduct) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Product not created, please try again`,
        };
      }
      return {
        status: httpStatus.CREATED,
        message: `Product ${Messages.SUCCESS_CREATED}`,
        data: newProduct,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async updateExistingProduct(id: number, product: any): Promise<object | any> {
    try {
      const productExists = await findProductById(id);
      if (!productExists)
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Product ${Messages.NOT_FOUND}`,
        };
      const updatedProduct = await updateProduct(id, product);
      if (!updatedProduct) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Product not updated, please try again`,
        };
      }
      return {
        status: httpStatus.SUCCESS,
        message: `Product ${Messages.SUCCESS_UPDATED}`,
        data: updatedProduct,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async removeProduct(id: number): Promise<object | any> {
    try {
      const productExists = await findProductById(id);
      if (!productExists)
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Product ${Messages.NOT_FOUND}`,
        };
      const deletedProduct = await deleteProduct(id);
      if (!deletedProduct) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Product not deleted, please try again`,
        };
      }
      return {
        status: httpStatus.SUCCESS,
        message: `Product ${Messages.SUCCESS_DELETED}`,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getProducts({ search, limit, offset }: any): Promise<object | any> {
    try {
      const products = await findProducts({ search, limit, offset });
      if (!products?.count) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Product ${Messages.NOT_FOUND}`,
        };
      }
      return {
        status: httpStatus.SUCCESS,
        message: `Product ${Messages.SUCCESS_FETCHED}`,
        data: products?.rows,
        count: products?.count,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async getProductById(userId: number, id: number): Promise<object | any> {
    try {
      const product = await findProductById(id);
      if (!product) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Product ${Messages.NOT_FOUND}`,
        };
      }

      if (userId)
        await new LogService().createLog(userId, "view-product", product);

      return {
        status: httpStatus.SUCCESS,
        message: `Product ${Messages.SUCCESS_FETCHED}`,
        data: product,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default ProductService;
