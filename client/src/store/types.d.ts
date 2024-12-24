export interface InitialAuthState {
  user: null | UserType;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  successMessage: string;
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
