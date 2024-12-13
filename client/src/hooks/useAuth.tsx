import axios from "@/config/axios";
import { AppDispatch } from "@/store";
import { setLoading, setUser } from "@/store/features/authSlice";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";

export default function useAuth() {
  const dispatch: AppDispatch = useDispatch();
  const verifyAuth = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get("/auth/verify-user");
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return null;
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { verifyAuth };
}
