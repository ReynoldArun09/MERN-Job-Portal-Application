import express, { type Application } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import { ParsedEnvVariables } from "./config";
import {
  applicationRoutes,
  authRoutes,
  companyRoutes,
  jobRoutes,
} from "./routes";
import { ErrorMiddleware, RouteNotFound } from "./middlewares";

const app: Application = express();
const swaggerSpec = YAML.load("./src/docs/swagger.yaml");

app.use(helmet());
app.use(
  cors({
    origin: ParsedEnvVariables.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.disable("x-powered-by");

if (ParsedEnvVariables.NODE_ENV !== "production") {
  app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use(ErrorMiddleware);
app.use(RouteNotFound);

export default app;
