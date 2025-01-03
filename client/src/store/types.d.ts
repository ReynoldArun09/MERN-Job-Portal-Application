export interface initialAuthState {
  isLoading: boolean;
  currentUser: undefined | null | UserType;
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

export type SignInApiResponse = {
  success: boolean;
  data: UserType;
  message: string;
};

export type ApiError = {
  message: string;
};
export type JobApiResponse = {
  success: boolean;
  data: JobType[];
};
export type CompanyApiResponse = {
  success: boolean;
  data: {
    _id: string;
    name: string;
    userId: string;
  };
};

export type SignUpApiResponse = Omit<SignInApiResponse, "data">;
export type VerifyApiResponse = Omit<SignInApiResponse, "message">;
export type SignOutApiResponse = Omit<SignInApiResponse, "data">;

export interface initialJobState {
  searchQuery: string;
  isLoading: boolean;
  jobsData: JobType[];
  latestJobsData: JobType[];
  adminJobsData: JobType[];
  singleJob: JobType | null;
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
  company: {
    _id: string;
    name: string;
    userId: string;
  };
  createdBy: string;
  applications: ApplicationType[];
  createdAt: string;
  updatedAt: string;
}

export interface CompanyType {
  _id: string;
  name: string;
  location: string;
  website: string;
  description: string;
  logo: string;
}

export interface ApplicationType {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface initialCompanyState {
  isLoading: boolean;
  singleCompany: null | CompanyData;
  companiesData: CompanyData[];
}
export interface initialApplicantState {
  isLoading: boolean;
  applicationData: ApplicationType[];
}

// refactor pending..

export type CompaniesReponse = {
  success: boolean;
  data: CompanyData[];
};

export type CompanyData = {
  _id: string;
  name: string;
  description: string;
  location: string;
  website: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  logo?: string;
};

export type SingleJobResponse = {
  success: boolean;
  data: JobType;
};
