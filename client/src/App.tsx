import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout";
import SiteLayout from "./layouts/site-layout";
const HomePage = lazy(() => import("./pages/site/home-page"));
const SignInPage = lazy(() => import("./pages/auth/signin-page"));
const SignUpPage = lazy(() => import("./pages/auth/signup-page"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}
