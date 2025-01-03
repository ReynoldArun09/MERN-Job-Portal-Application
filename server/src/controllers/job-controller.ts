import { type Request, type Response } from "express";
import {
  ApiErrorMessages,
  ApiSuccessMessages,
  HttpStatusCode,
} from "../constants";
import { SendApiResponse } from "../helpers/api-response";
import { Job } from "../models";
import { JobSchemaType } from "../schemas/job-schema";
import { AppError, AsyncWrapper } from "../utils";

export const PostJobApi = AsyncWrapper(
  async (req: Request<{}, {}, JobSchemaType>, res: Response) => {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
      applications,
    } = req.body;
    const userId = req.user._id;

    const parsedRequirements =
      typeof requirements === "string"
        ? requirements.split(",").map((item: string) => item.trim())
        : [];

    const job = await Job.create({
      title,
      description,
      location,
      jobType,
      experienceLevel,
      requirements: parsedRequirements,
      salary: Number(salary),
      position,
      company: companyId,
      createdBy: userId,
      applications,
    });

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.CREATED,
      message: ApiSuccessMessages.JOB_CREATED,
      data: job,
    });
  }
);

export const GetAllJobsApi = AsyncWrapper(
  async (req: Request<{}, {}, {}, { keyword: string }>, res: Response) => {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      throw new AppError(
        ApiErrorMessages.JOB_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: jobs,
    });
  }
);

export const GetJobByIdApi = AsyncWrapper(
  async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const jobId = req.params.id;
    const existingJob = await Job.findById(jobId)
      .populate({
        path: "applications",
      })
      .populate({
        path: "company",
      });

    if (!existingJob) {
      throw new AppError(
        ApiErrorMessages.JOB_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: existingJob,
    });
  }
);

export const GetAdminJobsApi = AsyncWrapper(
  async (req: Request, res: Response) => {
    const adminId = req.user._id;
    const existingJobs = await Job.find({ createdBy: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!existingJobs) {
      throw new AppError(
        ApiErrorMessages.JOB_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: existingJobs,
    });
  }
);

export const GetLatestJobsApi = AsyncWrapper(
  async (req: Request<{}, {}, {}, {}>, res: Response) => {
    const jobs = await Job.find({})
      .limit(6)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      throw new AppError(
        ApiErrorMessages.JOB_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: jobs,
    });
  }
);
