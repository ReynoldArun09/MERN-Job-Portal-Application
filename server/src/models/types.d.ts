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
