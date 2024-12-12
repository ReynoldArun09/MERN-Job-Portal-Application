import { Profile } from "./models/types";

export interface UserDataType {
  _id: ObjectId;
  fullname: string;
  email: string;
  role: "student" | "recruiter";
  phoneNumber: number;
  profile: Profile;
}

declare global {
  namespace Express {
    interface Request {
      user: UserDataType;
    }
  }
}
