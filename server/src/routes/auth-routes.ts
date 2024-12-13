import { Router } from "express";
import {
  SignInApi,
  SignOutApi,
  SignUpApi,
  VerifyUserApi,
} from "../controllers/auth-controller";
import { AuthMiddleware, ValidationMiddleware } from "../middlewares";
import { SignInSchema, SignUpSchema } from "../schemas/auth-schema";

const authRoutes = Router();

authRoutes.post("/signup", ValidationMiddleware(SignUpSchema), SignUpApi);
authRoutes.post("/signin", ValidationMiddleware(SignInSchema), SignInApi);
authRoutes.get("/verify-user", AuthMiddleware, VerifyUserApi);
authRoutes.post("/signout", SignOutApi);

export default authRoutes;
