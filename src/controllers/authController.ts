import dotenv from "dotenv";
import { httpStatus } from "../utils/httpService";
import { loginSchema, registerSchema } from "../validator/authValidator";
import AuthService from "../services/authService";
dotenv.config({
  path: `.env`,
});

class AuthController {
  async register(req: any, res: any) {
    try {
      console.log(`register: ${JSON.stringify(req.body)}`);
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const user = await new AuthService().register(value);

      return res.status(user.status).json({
        status: user.status == httpStatus.SUCCESS ? 1 : 0,
        message: user.message,
        data: user.data,
      });
    } catch (error: any) {
      console.error(`register Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }

  async login(req: any, res: any) {
    try {
      console.log(`login: ${JSON.stringify(req.body)}`);
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: error.details[0].message });
      }

      const user = await new AuthService().login(value);

      return res.status(user.status).json({
        status: user.status == httpStatus.SUCCESS ? 1 : 0,
        message: user.message,
        data: user.data,
        token: user.token,
      });
    } catch (error: any) {
      console.error(`login Error ${error}`);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 0, message: error.message });
    }
  }
}
export default new AuthController();
