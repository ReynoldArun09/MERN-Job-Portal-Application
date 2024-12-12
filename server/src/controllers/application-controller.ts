import { type Request, type Response } from "express";
import { AppError, AsyncWrapper } from "../utils";
import { Application, Job } from "../models";
import {
  ApiErrorMessages,
  ApiSuccessMessages,
  HttpStatusCode,
} from "../constants";
import { SendApiResponse } from "../helpers/api-response";

export const ApplyJobApi = AsyncWrapper(
  async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const userId = req.user._id;
    const jobId = req.params.id;

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      throw new AppError(
        ApiErrorMessages.APPLICATION_ALREADY_EXISTS,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const existingJob = await Job.findById(jobId);

    if (!existingJob) {
      throw new AppError(
        ApiErrorMessages.JOB_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    existingJob?.applications.push(newApplication._id);
    await existingJob.save();

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.CREATED,
      message: ApiSuccessMessages.JOB_APPLICATION_CREATED,
    });
  }
);

export const GetAppliedJobsApi = AsyncWrapper(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const existingApplication = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });

    if (!existingApplication) {
      throw new AppError(
        ApiErrorMessages.APPLICATION_ALREADY_EXISTS,
        HttpStatusCode.BAD_REQUEST
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: existingApplication,
    });
  }
);

export const GetApplicantsApi = AsyncWrapper(
  async (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      throw new AppError(
        ApiErrorMessages.JOB_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      data: job,
    });
  }
);

type StatusType = "rejected" | "pending" | "accepted";

export const UpdateStatusApi = AsyncWrapper(
  async (
    req: Request<{ id: string }, {}, { status: StatusType }>,
    res: Response
  ) => {
    const { status } = req.body;
    const applicationId = req.params.id;

    const existingApplication = await Application.findOne({
      _id: applicationId,
    });

    if (!existingApplication) {
      throw new AppError(
        ApiErrorMessages.APPLICATION_NOT_FOUND,
        HttpStatusCode.NOT_FOUND
      );
    }

    existingApplication.status = status;
    await existingApplication.save();

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      message: ApiSuccessMessages.STATUS_UPDATED,
    });
  }
);
