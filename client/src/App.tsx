import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/common/loading-spinner";
import AdminLayout from "./layouts/admin-layout";
import AuthLayout from "./layouts/auth-layout";
import SiteLayout from "./layouts/site-layout";
import PrivateRoute from "./middlewares/private-route";
import PublicRoute from "./middlewares/public-route";
import JobsPage from "./pages/site/jobs-page";
import { RootState, useAppDispatch } from "./store";
import { VerifyUser } from "./store/services/auth/auth-service";

const HomePage = lazy(() => import("./pages/site/home-page"));
const ProfilePage = lazy(() => import("./pages/site/profile-page"));
const DescriptionPage = lazy(() => import("./pages/site/description-page"));
const SignInPage = lazy(() => import("./pages/auth/signin-page"));
const SignUpPage = lazy(() => import("./pages/auth/signup-page"));
const ApplicantsListPage = lazy(
  () => import("./pages/admin/applicants-list-page")
);
const CompaniesListPage = lazy(
  () => import("./pages/admin/companies-list-page")
);
const CompanyCreatePage = lazy(
  () => import("./pages/admin/create-company-page")
);
const CompanySetupPage = lazy(() => import("./pages/admin/company-setup-page"));
const JobsListPage = lazy(() => import("./pages/admin/jobs-list-page"));
const PostJobPage = lazy(() => import("./pages/admin/create-job-page"));
const BrowsePage = lazy(() => import("./pages/site/browse-page"));

export default function App() {
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(VerifyUser());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/description/:id" element={<DescriptionPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
      </Route>
      <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="companies" element={<CompaniesListPage />} />
          <Route path="companies/:id" element={<CompanySetupPage />} />
          <Route path="companies-create" element={<CompanyCreatePage />} />
          <Route path="jobs" element={<JobsListPage />} />
          <Route path="jobs-create" element={<PostJobPage />} />
          <Route path="jobs/:id/applicants" element={<ApplicantsListPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
