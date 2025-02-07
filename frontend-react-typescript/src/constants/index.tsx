import { FacebookIcon, LinkedInIcon, TwitterIcon } from "@/assets";
import { Building2Icon, FileUserIcon, PlusIcon } from "lucide-react";

export const categories: string[] = ["Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer", "FullStack Developer"];
export const socialLinks = [
  { name: "Facebook", url: "https://facebook.com", Icon: FacebookIcon },
  { name: "Twitter", url: "https://twitter.com", Icon: TwitterIcon },
  { name: "LinkedIn", url: "https://linkedin.com", Icon: LinkedInIcon },
];

export const adminRoutes = [
  { name: "Home", url: "/" },
  { name: "Companies", url: "/admin/companies" },
  { name: "Jobs", url: "/admin/jobs" },
];

export const siteRoutes = [
  { name: "Home", url: "/" },
  { name: "Jobs", url: "/jobs" },
  { name: "Browse", url: "/browse" },
];

export const filterData = [
  {
    fitlerType: "Location",
    array: ["Denver, CO", "Portland, OR", "Chicago, IL", "Washington, DC", "San Jose, CA"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Mobile Developer", "DevOps Lead", "Backend Developer", "Al Engineer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

export const adminSidebarLinks = [
  {
    title: "Jobs",
    url: "/admin/jobs",
    icon: FileUserIcon,
  },
  {
    title: "Create Jobs",
    url: "/admin/jobs-create",
    icon: PlusIcon,
  },
  {
    title: "Companies",
    url: "/admin/companies",
    icon: Building2Icon,
  },
  {
    title: "Create Company",
    url: "/admin/companies-create",
    icon: PlusIcon,
  },
];
