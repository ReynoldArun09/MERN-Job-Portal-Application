import Logo from "@/components/common/logo";
import NavLinks from "./nav-links";
import Profile from "./profile";
import AuthButtons from "./auth-buttons";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";

export default function SiteHeader() {
    const user = useSelector((state: RootState) => state.auth.user)
    return (
        <header className="flex items-center justify-between h-20 mx-auto max-w-7xl">
            <Logo />
            <div className="flex items-center gap-10">
                {user && (
                    <>
                        <NavLinks role={user.role} />
                        <Profile userInfo={user} />
                    </>
                )}
                {!user && <AuthButtons />}
            </div>
        </header>
    );
}
