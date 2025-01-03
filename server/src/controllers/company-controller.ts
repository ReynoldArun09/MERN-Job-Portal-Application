import { type Request, type Response } from "express";
import {
  ApiErrorMessages,
  ApiSuccessMessages,
  HttpStatusCode,
} from "../constants";
import { SendApiResponse } from "../helpers/api-response";
import { Company } from "../models";
import { CompanySchemaType } from "../schemas/company-schema";
import { AppError, AsyncWrapper } from "../utils";

export const RegisterCompanyApi = AsyncWrapper(
  async (req: Request<{}, {}, CompanySchemaType>, res: Response) => {
    const { companyName } = req.body;
    const userId = req.user._id;
    const existingCompany = await Company.findOne({ name: companyName });

    if (existingCompany) {
      throw new AppError(
        ApiErrorMessages.COMPANY_ALREADY_EXISTS,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const newCompany = await Company.create({
      name: companyName,
      userId,
    });

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.CREATED,
      message: ApiSuccessMessages.COMPANY_CREATED,
      data: newCompany,
    });
  }
);

export const GetCompanyApi = AsyncWrapper(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    const existingCompanies = await Company.find({ userId });

    if (!existingCompanies) {
      throw new AppError(
        ApiErrorMessages.COMPANY_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: existingCompanies,
    });
  }
);

export const GetCompanyByIdApi = AsyncWrapper(
  async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const companyId = req.params.id;

    const existingCompany = await Company.findById(companyId);
    console.log(existingCompany);

    if (!existingCompany) {
      throw new AppError(
        ApiErrorMessages.COMPANY_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: existingCompany,
    });
  }
);
