export interface initialAuthStateProps {
  isLoading: boolean;
  user: UserType | null;
}

export interface initialJobState {
  jobsData: JobType[] | [];
  searchQuery: string;
}

export interface Profile {
  bio: string;
  skills: string;
  resume: string;
  resumeOriginalName: string;
  company: Company;
  profilePhoto: string;
}

export interface UserType {
  _id: string;
  email: string;
  fullname: string;
  phoneNumber: string;
  role: "student" | "recruiter";
  profile: Profile;
}

export interface Company {
  name: string;
  location: string;
  description: string;
  logo: string;
  website: string;
  userId: string;
}

export interface Job {
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
  applications: Application[];
}

export interface Application {
  job: Job;
  applicant: string;
  status: "pending" | "accepted" | "rejected";
}
