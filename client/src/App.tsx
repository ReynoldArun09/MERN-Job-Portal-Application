import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/common/loading-spinner";
import useAuth from "./hooks/useAuth";
import AdminLayout from "./layouts/admin-layout";
import AuthLayout from "./layouts/auth-layout";
import SiteLayout from "./layouts/site-layout";
import ProtectedRoutes from "./routes/admin-protected-route";
import AuthProtectedRoutes from "./routes/auth-protected-route";
import { RootState } from "./store";
const AdminJobsPage = lazy(() => import("./pages/admin/admin-jobs-page"));
const ApplicantsPage = lazy(() => import("./pages/admin/applicants-page"));
const CompaniesPage = lazy(() => import("./pages/admin/companies-page"));
const CompanyCreatePage = lazy(
  () => import("./pages/admin/company-create-page")
);
const CompanySetupPage = lazy(() => import("./pages/admin/company-setup-page"));
const PostJobPage = lazy(() => import("./pages/admin/post-job-page"));
const SignInPage = lazy(() => import("./pages/auth/sign-in-page"));
const SignUpPage = lazy(() => import("./pages/auth/sign-up-page"));
const HomePage = lazy(() => import("./pages/site/home-page"));
const ProfilePage = lazy(() => import("./pages/site/profile-page"));
const BrowsePage = lazy(() => import("./pages/site/browse-page"));
const DescriptionPage = lazy(() => import("./pages/site/description-page"));
const JobsPage = lazy(() => import("./pages/site/jobs-page"));

export default function App() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const { verifyAuth } = useAuth();

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  if (!user && isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/description/:id" element={<DescriptionPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoutes allowedRoles={["recruiter"]}>
            <AdminLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="companies/create" element={<CompanyCreatePage />} />
        <Route path="companies/:id" element={<CompanySetupPage />} />
        <Route path="admin-jobs" element={<AdminJobsPage />} />
        <Route path="jobs/create" element={<PostJobPage />} />
        <Route path="jobs/:id/applicants" element={<ApplicantsPage />} />
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
      <Route path="*" element={<h1>Route not found.</h1>} />
    </Routes>
  );
}
