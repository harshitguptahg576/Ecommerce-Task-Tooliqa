import dotenv from "dotenv";
import { httpStatus } from "../utils/httpService";
import AnalyticsService from "../services/analyticService";

dotenv.config({
  path: `.env`,
});

class AnalyticsController {
  async getProductSales(req: any, res: any) {
    try {
      const productSales = await new AnalyticsService().getProductSales();
      if (productSales.status != httpStatus.SUCCESS)
        throw new Error(productSales.message);
      return res.status(productSales?.status).json({
        status: productSales?.status == httpStatus.SUCCESS ? 1 : 0,
        message: productSales?.message,
        data: productSales?.data,
      });
    } catch (error: any) {
      console.error(`analytics Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async getAverageOrder(req: any, res: any) {
    try {
      const averageOrder = await new AnalyticsService().getAverageOrder();
      if (averageOrder.status != httpStatus.SUCCESS)
        throw new Error(averageOrder.message);
      return res.status(averageOrder?.status).json({
        status: averageOrder?.status == httpStatus.SUCCESS ? 1 : 0,
        message: averageOrder?.message,
        data: averageOrder?.data,
      });
    } catch (error: any) {
      console.error(`analytics Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }
}
export default new AnalyticsController();
