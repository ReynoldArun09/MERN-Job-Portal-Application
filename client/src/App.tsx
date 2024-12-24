import LoadingSpinner from "@/components/common/loading-spinner";
import useAuth from "@/hooks/useAuth";
import AdminLayout from "@/layouts/admin-layout";
import AuthLayout from "@/layouts/auth-layout";
import SiteLayout from "@/layouts/site-layout";
import AdminProtectedRoutes from "@/routes/admin-protected-route";
import AuthProtectedRoutes from "@/routes/auth-protected-routes";
import { RootState } from "@/store";
import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/site/home-page"));
const SignInPage = lazy(() => import("./pages/auth/signin-page"));
const SignUpPage = lazy(() => import("./pages/auth/signup-page"));
const BrowsePage = lazy(() => import("./pages/site/browse-page"));
const ProfilePage = lazy(() => import("./pages/site/profile-page"));
const DescriptionPage = lazy(() => import("./pages/site/description-page"));
const ApplicantsPage = lazy(() => import("./pages/admin/applicants-page"));
const CompaniesPage = lazy(() => import("./pages/admin/companies-page"));
const CompanyCreatePage = lazy(
  () => import("./pages/admin/create-company-page")
);
const CompanySetupPage = lazy(
  () => import("./pages/admin/create-company-page")
);
const JobsListPage = lazy(() => import("./pages/admin/jobslist-page"));
const PostJobPage = lazy(() => import("./pages/admin/postjob-page"));

export default function App() {
  const { VerifyAuth } = useAuth();
  const { isFetching } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    VerifyAuth();
  }, [VerifyAuth]);

  if (isFetching) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/description/:id" element={<DescriptionPage />} />
      </Route>
      <Route
        path="/auth"
        element={
          <AuthProtectedRoutes>
            <AuthLayout />
          </AuthProtectedRoutes>
        }
      >
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
      <Route
        path="/admin"
        element={
          <AdminProtectedRoutes allowedRoles={["recruiter"]}>
            <AdminLayout />
          </AdminProtectedRoutes>
        }
      >
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="companies-create" element={<CompanyCreatePage />} />
        <Route path="companies/:id" element={<CompanySetupPage />} />
        <Route path="jobs" element={<JobsListPage />} />
        <Route path="jobs-create" element={<PostJobPage />} />
        <Route path="jobs/:id/applicants" element={<ApplicantsPage />} />
      </Route>
      <Route path="*" element={<h1>Route not found.</h1>} />
    </Routes>
  );
}
