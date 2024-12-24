import { lazy, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/common/loading-spinner";
import useAuth from "./hooks/useAuth";
import AuthLayout from "./layouts/auth-layout";
import SiteLayout from "./layouts/site-layout";
import AuthProtectedRoutes from "./routes/auth-protected-routes";
import { RootState } from "./store";
const HomePage = lazy(() => import("./pages/site/home-page"));
const SignInPage = lazy(() => import("./pages/auth/signin-page"));
const SignUpPage = lazy(() => import("./pages/auth/signup-page"));
const BrowsePage = lazy(() => import("./pages/site/browse-page"));

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
    </Routes>
  );
}
