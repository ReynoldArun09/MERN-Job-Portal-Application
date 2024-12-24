import { FacebookIcon, LinkedInIcon, TwitterIcon } from "@/assets";

export const adminRoutes = [
  { name: "Companies", url: "/admin/companies" },
  { name: "Jobs", url: "/admin/admin-jobs" },
];

export const siteRoutes = [
  { name: "Home", url: "/" },
  { name: "Jobs", url: "/jobs" },
  { name: "Browse", url: "/browse" },
];

export const socialLinks = [
  { name: "Facebook", url: "https://facebook.com", Icon: FacebookIcon },
  { name: "Twitter", url: "https://twitter.com", Icon: TwitterIcon },
  { name: "LinkedIn", url: "https://linkedin.com", Icon: LinkedInIcon },
];

export const categories: string[] = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];
