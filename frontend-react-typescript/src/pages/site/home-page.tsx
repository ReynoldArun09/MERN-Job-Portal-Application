import SiteCarousel from "../../components/web/auth/site/site-carousel";
import SiteHero from "../../components/web/auth/site/site-hero";
import SiteLatestJobs from "../../components/web/auth/site/site-latest-jobs";

export default function HomePage() {
  return (
    <>
      <SiteHero />
      <SiteCarousel />
      <SiteLatestJobs />
    </>
  );
}
