import bcyrpt from "bcryptjs";
import mongoose from "mongoose";
import { ParsedEnvVariables } from "../config";
import { Application, Company, Job, User } from "../models";
import { logger } from "../utils";
import { applications, companies, jobs, users } from "./data";

const mongoURI = ParsedEnvVariables.MONGO_DB_URI;

const seedApplicationData = async () => {
  try {
    await Application.deleteMany({});
    await Application.insertMany(applications);
    logger.info("Application data seeded successfully");
  } catch (error) {
    console.log(error);
    logger.info("Application data seed failed...");
  }
};

const seedJobsData = async () => {
  try {
    await Job.deleteMany({});
    await Job.insertMany(jobs);
    logger.info("job data seeded successfully");
  } catch (error) {
    logger.info("job data seed failed...");
  }
};

const seedCompanyData = async () => {
  try {
    await Company.deleteMany({});
    await Company.insertMany(companies);
    logger.info("company data seeded successfully");
  } catch (error) {
    logger.info("company data seed failed...");
  }
};

const seedUserData = async () => {
  try {
    await User.deleteMany({});

    const data = users.map((user) => ({
      ...user,
      password: bcyrpt.hashSync(user.password, 10),
    }));
    await User.insertMany(data);
    logger.info("user data seed successfully");
  } catch (error) {
    logger.info("user data seed failed...");
  }
};

(async () => {
  if (ParsedEnvVariables.NODE_ENV === "development") {
    try {
      await mongoose.connect(mongoURI);
      await seedUserData();
      await seedApplicationData();
      await seedJobsData();
      await seedCompanyData();
      await mongoose.connection.close();
      process.exit(1);
    } catch (error) {
      logger.error("Failed to connect to MongoDB", error);
    }
  } else {
    logger.warn("Not in development mode");
  }
})();
