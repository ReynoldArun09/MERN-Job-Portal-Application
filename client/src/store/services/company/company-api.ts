import axios from "@/config/axios";

export const CreateCompanyApi = async (companyName: string) => {
  const response = await axios.post(`/company/create-company`, { companyName });
  return response.data;
};

export const FetchCompanyByIdApi = async (id: string) => {
  const response = await axios.get(`/company/${id}`);
  return response.data.data;
};

export const FetchCompaniesApi = async () => {
  const response = await axios.get(`/company/get-company`);
  return response.data;
};
