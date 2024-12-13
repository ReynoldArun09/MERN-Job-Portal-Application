import { type Request, type Response } from "express";
import { AppError, AsyncWrapper } from "../utils";
import { SignInSchemaType, SignUpSchemaType } from "../schemas/auth-schema";
import { User } from "../models";
import {
  ApiErrorMessages,
  ApiSuccessMessages,
  HttpStatusCode,
} from "../constants";
import bcrypt from "bcryptjs";
import { SendApiResponse } from "../helpers/api-response";
import { ParsedEnvVariables } from "../config";
import jwt from "jsonwebtoken";
import { UserDataType } from "../types";

export const SignUpApi = AsyncWrapper(
  async (req: Request<{}, {}, SignUpSchemaType>, res: Response) => {
    const { fullname, email, phoneNumber, password, role, photo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(
        ApiErrorMessages.USER_ALREADY_EXISTS,
        HttpStatusCode.BAD_REQUEST
      );
    }
    const salt = parseInt(ParsedEnvVariables.SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: photo,
      },
    });

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.CREATED,
      message: ApiSuccessMessages.SIGN_UP_SUCCESS,
    });
  }
);

export const SignInApi = AsyncWrapper(
  async (req: Request<{}, {}, SignInSchemaType>, res: Response) => {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new AppError(
        ApiErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw new AppError(
        ApiErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST
      );
    }

    const token = await jwt.sign(
      { _id: existingUser._id },
      ParsedEnvVariables.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: ParsedEnvVariables.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = {
      _id: existingUser._id,
      fullname: existingUser.fullname,
      email: existingUser.email,
      phoneNumber: existingUser.phoneNumber,
      role: existingUser.role,
      profile: existingUser.profile,
    };

    SendApiResponse({
      res,
      statusCode: HttpStatusCode.OK,
      message: ApiSuccessMessages.SIGN_IN_SUCCESS,
      data: userData,
    });
  }
);

export const SignOutApi = AsyncWrapper(async (req: Request, res: Response) => {
  res.clearCookie("accessToken");

  SendApiResponse({
    res,
    statusCode: HttpStatusCode.OK,
    message: ApiSuccessMessages.SIGN_OUT_SUCCESS,
  });
});

export const VerifyUserApi = AsyncWrapper(
  async (req: Request, res: Response) => {
    const user = req.user as UserDataType;
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: user,
    });
  }
);
