import { Document, ObjectId } from "mongoose";

interface Profile {
  bio: string;
  skills: string;
  resume: string;
  resumeOriginalName: string;
  company: ObjectId;
  profilePhoto: string;
}

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: number;
  role: "student" | "recruiter";
  profile: Profile;
}

export interface ICompany extends Document {
  name: string;
  location: string;
  description: string;
  logo: string;
  website: string;
  userId: ObjectId;
}
