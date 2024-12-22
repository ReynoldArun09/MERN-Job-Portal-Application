import { RootState } from "@/store";
import { useSelector } from "react-redux";
import AuthButtons from "./auth-buttons";
import NavLinks from "./nav-links";
import ProfileInfo from "./profile-info";
import SiteLogo from "./site-logo";

export default function SiteHeader() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <SiteLogo />
        <div className="flex items-center gap-5">
          {user && (
            <>
              <NavLinks authRole={user.role} />
              <ProfileInfo user={user} />
            </>
          )}
          {!user && <AuthButtons />}
        </div>
      </div>
    </header>
  );
}
