import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const ValidationMiddleware =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.safeParse(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
