import { useAppDispatch } from "@/store";
import { VerifyUser } from "@/store/features/authSlice";
import { useCallback } from "react";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const VerifyAuth = useCallback(() => {
    dispatch(VerifyUser());
  }, [dispatch]);

  return { VerifyAuth };
};

export default useAuth;
