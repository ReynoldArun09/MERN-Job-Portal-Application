import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/auth/sign-up-page";
import SignInPage from "./pages/auth/sign-in-page";
import HomePage from "./pages/site/home-page";



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
        </Routes>
    )
}
