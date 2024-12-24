export interface InitialAuthState {
  user: null | UserType;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  successMessage: string;
}

export interface initialJobState {
  searchQuery: string;
  jobs: JobType[];
  isFetching: boolean;
  isError: boolean;
  errorMessage: string;
  latestJobs: JobType[];
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

export interface JobType {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  company: Company;
  createdBy: string;
  applications: [];
  createdAt: string;
  updatedAt: string;
}

export interface CompanyType {
  _id: string;
}
