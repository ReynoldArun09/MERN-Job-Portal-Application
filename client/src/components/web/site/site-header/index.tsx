import { CustomContainerWrapper } from "@/components/common/custom";

import SiteLogo from "@/components/common/site-logo";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import AuthButtons from "./auth-buttons";
import NavLinks from "./nav-links";
import ProfileInfo from "./profile-info";

export default function SiteHeader() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <header className="border-b">
      <CustomContainerWrapper as="div" className="flex justify-between py-5">
        <SiteLogo />
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <NavLinks authRole={user.role} />
              <ProfileInfo user={user} />
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </CustomContainerWrapper>
    </header>
  );
}
