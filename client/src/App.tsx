import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
import SignInPage from "./pages/auth/sign-in-page";
import HomePage from "./pages/site/home-page";
import { useSelector } from "react-redux";
import { RootState } from "./services/store";
import { useEffect } from "react";
import useAuth from "./hooks/useAuth";

import BrowsePage from "./pages/site/browse-page";
import LoadingSpinner from "./components/common/loading-spinner";
import SiteLayout from "./layouts/site-layout";

export default function App() {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const { verifyAuth } = useAuth();
    useEffect(() => {
        verifyAuth();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <Routes>
            <Route path="/" element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route
                    path="/sign-up"
                    element={!user ? <SignUpPage /> : <Navigate to="/" />}
                />
                <Route
                    path="/sign-in"
                    element={!user ? <SignInPage /> : <Navigate to="/" />}
                />
            </Route>
        </Routes>
    );
}
