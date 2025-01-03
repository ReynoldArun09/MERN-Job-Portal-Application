import { Router } from "express";
import {
  GetAdminJobsApi,
  GetAllJobsApi,
  GetJobByIdApi,
  GetLatestJobsApi,
  PostJobApi,
} from "../controllers/job-controller";
import { AuthMiddleware } from "../middlewares";

const jobRoutes = Router();

jobRoutes.get("/latest-jobs", GetLatestJobsApi);
jobRoutes.post("/create-job", AuthMiddleware, PostJobApi);
jobRoutes.get("/all-jobs", AuthMiddleware, GetAllJobsApi);
jobRoutes.get("/single/:id", AuthMiddleware, GetJobByIdApi);
jobRoutes.get("/admin-jobs", AuthMiddleware, GetAdminJobsApi);

export default jobRoutes;
