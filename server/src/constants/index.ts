export enum GlobalSuccessMessages {
  DEV_SERVER_STARTED = "Development server started successfully",
  SERVER_STARTED = "Server started successfully",
  MONGO_CONNECTION_SUCCESS = "MongoDB connected successfully",
}
export enum GlobalErrorMessages {
  DEV_SERVER_FAILED_TO_START = "Failed to start development server",
  SERVER_FAILED_TO_START = "Failed to start server",
  ENV_PARSE_ERROR = "Error parsing environment variables:",
  ROUTE_NOT_FOUND = "Route not found",
  MONGO_ENV_NOT_DEFINED = "MONGO_DB_URI environment variable not defined",
  MONGO_CONNECTION_ERROR = "MongoDB connection error: ",
  INVALID_ID = "The ID you entered is invalid.",
  INTERNAL_SERVER_ERROR = "Oops! Something went wrong. Please try again later.",
  UNAUTHORIZED = "You are not authorized to perform this action.",
}

export enum ValidationMessages {
  MONGO_DB_URI_REQUIRED = "MongoDB URI is required",
  ACCESS_TOKEN_SECRET_LENGTH = "Access token secret must be at least 10 characters",
  CORS_ORIGIN_REQUIRED = "CORS Origin must be provided",
  CLOUDINARY_CLOUD_NAME_REQUIRED = "Cloudinary Cloud Name is required",
  CLOUDINARY_API_KEY_REQUIRED = "Cloudinary API Key is required",
  CLOUDINARY_API_SECRET_REQUIRED = "Cloudinary API Secret is required",
  SALT_REQUIRED = "SALT is required",
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export enum ApiErrorMessages {
  USER_ALREADY_EXISTS = "User already exists",
  USER_NOT_FOUND = "User not found",
  COMPANY_ALREADY_EXISTS = "Company already exists",
  INVALID_TOKEN = "Invalid Token",
  COMPANY_NOT_FOUND = "Company not found",
  JOB_NOT_FOUND = "Job not found",
  APPLICATION_ALREADY_EXISTS = "Application already exist",
  APPLICATION_NOT_FOUND = "Application not found",
}

export enum ApiSuccessMessages {
  SIGN_IN_SUCCESS = "User successfully logged in",
  SIGN_UP_SUCCESS = "User Account has been created",
  SIGN_OUT_SUCCESS = "User has been logged out",
  COMPANY_CREATED = "Company created",
  JOB_CREATED = "Job Created",
  JOB_APPLICATION_CREATED = "Job Application created",
  STATUS_UPDATED = "Status updated",
}
