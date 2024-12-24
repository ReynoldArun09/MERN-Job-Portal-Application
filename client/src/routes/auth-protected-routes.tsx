import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AuthProtectedRoutesProps {
  children: React.ReactNode;
}

export default function AuthProtectedRoutes({
  children,
}: AuthProtectedRoutesProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
