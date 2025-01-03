import axios from "@/config/axios";

export const fetchAllJobsApi = async (query: string) => {
  let response;
  if (query) {
    response = await axios.get(`/job/all-jobs?keyword=${query}`);
  } else {
    response = await axios.get("/job/all-jobs");
  }

  return response.data;
};

export const fetchLatestJobsApi = async () => {
  const response = await axios.get(`/job/latest-jobs`);
  return response.data;
};

export const fetchAdminJobsApi = async () => {
  const response = await axios.get(`/job/admin-jobs`);
  return response.data;
};

export const fetchSingleJobApi = async (id: string) => {
  const response = await axios.get(`/job/single/${id}`);
  return response.data;
};
