import { type Response } from "express";
import { HttpStatusCode } from "../constants";

export const SendApiResponse = <T>(
  res: Response,
  statusCode: HttpStatusCode,
  success: boolean = true,
  message: string,
  data?: T
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};
