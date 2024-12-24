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
