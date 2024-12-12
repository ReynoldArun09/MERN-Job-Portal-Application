import app from "../app";
import request from "supertest";
import { Company, User } from "../models";
import jwt from "jsonwebtoken";
import { UserDataType } from "../types";
import { ApiErrorMessages, ApiSuccessMessages } from "../constants";

jest.mock("../models/company-model.ts");
jest.mock("../models/user-model.ts");
jest.mock("jsonwebtoken");

describe("Company controller testing", () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });
  describe("Register company", () => {
    beforeEach(() => {
      const mockUserId = "userId123";
      const mockUser: UserDataType = {
        _id: mockUserId,
        email: "mockuser@example.com",
        phoneNumber: 12345676788,
        profile: {
          bio: "testbio",
          skills: "testskills",
          resume: "testresume",
          resumeOriginalName: "testoriginname",
          company: "12345678" as any,
          profilePhoto: "testphoto",
        },
        fullname: "mockusername",
        role: "recruiter",
      };
      const mockSelect = jest.fn().mockRejectedValue(mockUser);
      (jwt.verify as jest.Mock).mockReturnValue({ _id: mockUserId });
      (User.findById as jest.Mock).mockResolvedValueOnce({
        select: mockSelect,
      });
    });
    it("should return 400 status if company already exists", async () => {
      (Company.findOne as jest.Mock).mockResolvedValue({});
      const response = await request(app)
        .post("/api/v1/company/create-company")
        .send({
          companyName: "testingcompany",
        })
        .set("Cookie", [`accessToken=mocktoken`]);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        ApiErrorMessages.COMPANY_ALREADY_EXISTS
      );
    });

    it("should create company and return 201 status code", async () => {
      const mockCompany = {
        name: "testingcompnay",
        userId: "test123456",
        _id: "1234567899",
      };
      (Company.findOne as jest.Mock).mockResolvedValue(null);
      (Company.create as jest.Mock).mockResolvedValue(mockCompany);
      const response = await request(app)
        .post("/api/v1/company/create-company")
        .send({
          companyName: "testingcompany",
        })
        .set("Cookie", [`accessToken=mockToken`]);
      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.message).toBe(ApiSuccessMessages.COMPANY_CREATED);
    });
  });

  describe("Get companies", () => {
    beforeEach(() => {
      const mockUserId = "userId123";
      const mockUser: UserDataType = {
        _id: mockUserId,
        email: "mockuser@example.com",
        phoneNumber: 12345676788,
        profile: {
          bio: "testbio",
          skills: "testskills",
          resume: "testresume",
          resumeOriginalName: "testoriginname",
          company: "12345678" as any,
          profilePhoto: "testphoto",
        },
        fullname: "mockusername",
        role: "recruiter",
      };
      const mockSelect = jest.fn().mockRejectedValue(mockUser);
      (jwt.verify as jest.Mock).mockReturnValue({ _id: mockUserId });
      (User.findById as jest.Mock).mockResolvedValueOnce({
        select: mockSelect,
      });
    });
    it("should return 404 status code if companies not found", async () => {
      (Company.find as jest.Mock).mockResolvedValue(null);
      const response = await request(app)
        .get("/api/v1/company/get-company")
        .set("Cookie", [`accessToken=mockToken`]);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(ApiErrorMessages.COMPANY_NOT_FOUND);
    });

    it("should return companies list", async () => {
      const mockCompanies = [
        {
          name: "testingcompnay",
          userId: "test123456",
          _id: "1234567899",
        },
        {
          name: "testingcompnay1",
          userId: "test1234567",
          _id: "12345678939",
        },
      ];
      (Company.find as jest.Mock).mockResolvedValue(mockCompanies);
      const response = await request(app)
        .get("/api/v1/company/get-company")
        .set("Cookie", [`accessToken=mockToken`]);
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("Get company By Id", () => {
    it("should return 404 if company is not found", async () => {
      (Company.findById as jest.Mock).mockResolvedValue(null);
      const response = await request(app).get("/api/v1/company/company/:id");
      expect(response.status).toBe(404);
      expect(response.body.message).toBe(ApiErrorMessages.COMPANY_NOT_FOUND);
    });

    it("should return 200 if company is found", async () => {
      const mockCompany = {
        name: "testingcompnay",
        userId: "test123456",
        _id: "1234567899",
      };

      (Company.findById as jest.Mock).mockResolvedValue(mockCompany);
      const response = await request(app).get("/api/v1/company/company/:id");
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });
});
