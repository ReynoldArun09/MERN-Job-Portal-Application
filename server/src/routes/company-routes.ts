import { Router } from "express";
import {
  GetCompanyApi,
  GetCompanyByIdApi,
  RegisterCompanyApi,
} from "../controllers/company-controller";
import { AuthMiddleware, ValidationMiddleware } from "../middlewares";
import { CompanySchema } from "../schemas/company-schema";

const companyRoutes = Router();

companyRoutes.post(
  "/create-company",
  AuthMiddleware,
  ValidationMiddleware(CompanySchema),
  RegisterCompanyApi
);
companyRoutes.get("/get-company", AuthMiddleware, GetCompanyApi);
companyRoutes.get("/:id", GetCompanyByIdApi);

export default companyRoutes;
