import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { currentUser } = useSelector((state: RootState) => state.auth);
  return currentUser ? <Navigate to="/" /> : <Outlet />;
}
