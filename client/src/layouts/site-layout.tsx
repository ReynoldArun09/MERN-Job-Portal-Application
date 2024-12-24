import { CustomContainerWrapper } from "@/components/common/custom";
import SiteFooter from "@/components/web/site/site-footer";
import SiteHeader from "@/components/web/site/site-header";
import { Outlet } from "react-router-dom";

export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <CustomContainerWrapper as={"main"} className="py-10">
        <Outlet />
      </CustomContainerWrapper>
      <SiteFooter />
    </>
  );
}
