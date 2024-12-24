import axios from "@/config/axios";
import { SignInSchemaType, SignUpSchemaType } from "@/schemas/auth-schema";

export const SignInApi = async (values: SignInSchemaType) => {
  const response = await axios.post("/auth/signin", values);
  return response.data;
};

export const SignUpApi = async (values: SignUpSchemaType) => {
  const response = await axios.post("/auth/signup", values);
  return response.data;
};
