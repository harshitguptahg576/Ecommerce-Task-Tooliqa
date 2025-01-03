import dotenv from "dotenv";
dotenv.config({
  path: `.env`,
});
import axios from "axios";

export const httpStatus = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORISED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};

export const httpGetData = async (
  url: string,
  headers: Record<string, string>
) => {
  return axios.get(url, { headers: headers });
};

export const httpPostData = async (
  url: string,
  data: any,
  headers: Record<string, string>
) => {
  return axios.post(url, data, { headers: headers });
};
