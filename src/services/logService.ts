import { createLog, findLogs } from "../repo/logRepo.js";
import { httpStatus } from "../utils/httpService.js";
import { Messages } from "../utils/messages.js";

class LogService {
  constructor() {}

  async createLog(
    userId: number,
    action: string,
    details: any
  ): Promise<object | any> {
    try {
      const newLog = await createLog({ userId, action, details });
      if (!newLog) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Log not created, please try again`,
        };
      }
      return {
        status: httpStatus.CREATED,
        message: `Log ${Messages.SUCCESS_CREATED}`,
        data: newLog,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async listLogs(
    startDate: Date | null,
    endDate: Date | null,
    action: string | null
  ): Promise<object | any> {
    try {
      const logs = await findLogs(startDate, endDate, action);
      if (!logs) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `Logs not found`,
        };
      }
      return {
        status: httpStatus.SUCCESS,
        message: `Logs ${Messages.SUCCESS_FETCHED}`,
        data: logs,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default LogService;
