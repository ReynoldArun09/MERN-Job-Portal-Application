import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layouts/site-layout";
import HomePage from "./pages/site/home-page";
import ProfilePage from "./pages/site/profile-page";
import BrowsePage from "./pages/site/browse-page";
import DescriptionPage from "./pages/site/description-page";
import JobsPage from "./pages/site/jobs-page";
import CompaniesPage from "./pages/admin/companies-page";
import ApplicantsPage from "./pages/admin/applicants-page";
import PostJobPage from "./pages/admin/post-job-page";
import AdminJobsPage from "./pages/admin/admin-jobs-page";
import CompanySetupPage from "./pages/admin/company-setup-page";
import CompanyCreatePage from "./pages/admin/company-create-page";
import SignInPage from "./pages/auth/sign-in-page";
import SignUpPage from "./pages/auth/sign-up-page";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import LoadingSpinner from "./components/common/loading-spinner";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";

export default function App() {
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const { verifyAuth } = useAuth();

  useEffect(() => {
    verifyAuth();
  }, []);

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
        <Route
          path="/sign-in"
          element={!user ? <SignInPage /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-in"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/companies"
          element={
            user?.role === "recruiter" ? <CompaniesPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/companies/create"
          element={
            user?.role === "recruiter" ? (
              <CompanyCreatePage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/companies/:id"
          element={
            user?.role === "recruiter" ? (
              <CompanySetupPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/jobs"
          element={
            user?.role === "recruiter" ? <AdminJobsPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/jobs/create"
          element={
            user?.role === "recruiter" ? <PostJobPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/admin/jobs/:id/applicants"
          element={
            user?.role === "recruiter" ? (
              <ApplicantsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Route>
    </Routes>
  );
}
