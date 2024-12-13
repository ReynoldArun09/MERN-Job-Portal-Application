export interface initialAuthState {
  user: UserType | null;
  isLoading: boolean;
}

export interface UserType {
  _id: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  role: "student" | "recruiter";
  profile: Profile;
}

export interface Profile {
  bio: string;
  skills: string;
  resume: string;
  resumeOriginalName: string;
  company: Company;
  profilePhoto: string;
}
