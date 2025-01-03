import { httpStatus } from "../utils/httpService.js";
import { Messages } from "../utils/messages.js";
import { generateToken } from "../utils/helpers.js";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../repo/userRepo.js";
import LogService from "./logService.js";

class AuthService {
  constructor() {}

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<object | any> {
    try {
      let user = JSON.parse(JSON.stringify(await findUserByEmail(email)));
      if (!user) {
        return {
          status: httpStatus.NOT_FOUND,
          message: Messages.USER_NOT_FOUND,
        };
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          status: httpStatus.UNAUTHORISED,
          message: Messages.INVALID_PASSWORD,
        };
      }

      delete user.password;

      const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      await new LogService().createLog(user.id, "login", {
        email: user.email,
        token: token,
      });

      return {
        status: httpStatus.SUCCESS,
        message: Messages.SUCCESS_LOGIN,
        data: user,
        token: token,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }

  async register({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: string;
  }): Promise<object | any> {
    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        return {
          status: httpStatus.BAD_REQUEST,
          message: `User already exists`,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await createUser({ email, password: hashedPassword, role });

      await new LogService().createLog(user.id, "register", {
        email: email,
        password: password,
        role: role,
      });

      return {
        status: httpStatus.SUCCESS,
        message: "User " + Messages.SUCCESS_CREATED,
        data: user,
      };
    } catch (err: any) {
      return {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: err.message,
      };
    }
  }
}

export default AuthService;
