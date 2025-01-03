import axios from "@/config/axios";

export const fetchAppliedJobsApi = async (id: string) => {
  const response = await axios.get(`/application/${id}`);
  return response.data;
};
