import dotenv from "dotenv";
import { httpStatus } from "../utils/httpService";
import { createLogSchema } from "../validator/logValidator";
import LogService from "../services/logService";

dotenv.config({
  path: `.env`,
});

class LogController {
  async createLog(req: any, res: any) {
    try {
      console.log(`log: ${JSON.stringify(req.body)}`);
      const { error, value } = createLogSchema.validate(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }
      const { action, details } = value;
      const userId = req.user!.id;
      const log = await new LogService().createLog(userId, action, details);
      if (log.status != httpStatus.SUCCESS) throw new Error(log.message);
      return res.status(log.status).json({
        status: log.status == httpStatus.CREATED ? 1 : 0,
        message: log.message,
        data: log.data,
      });
    } catch (error: any) {
      console.error(`log Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async listLogs(req: any, res: any) {
    try {
      const { startDate, endDate, action } = req.query;

      console.log(
        startDate ? new Date(startDate as string) : null,
        endDate ? new Date(endDate as string) : null
      );

      const logs = await new LogService().listLogs(
        startDate ? new Date(startDate as string) : null,
        endDate ? new Date(endDate as string) : null,
        action as string | null
      );
      if (logs.status != httpStatus.SUCCESS) throw new Error(logs.message);
      return res.status(logs.status).json({
        status: logs.status == httpStatus.SUCCESS ? 1 : 0,
        message: logs.message,
        data: logs.data,
      });
    } catch (error: any) {
      console.error(`log Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }
}
export default new LogController();
