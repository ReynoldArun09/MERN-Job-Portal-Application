import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AdminProtectedRoutesProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function AdminProtectedRoutes({
  allowedRoles,
  children,
}: AdminProtectedRoutesProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
