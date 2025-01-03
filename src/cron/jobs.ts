import cron from "node-cron";
import { exec } from "child_process";

class CronJobs {
  static perDayCron() {
    cron.schedule("0 0 * * *", () => {
      //   Recommended Product Sysytem
    });
  }

  static init() {
    this.perDayCron();
  }
}

export default CronJobs;
