import SiteCarousel from "@/components/web/site/site-carousel";
import SiteHero from "@/components/web/site/site-hero";
import SiteLatestJobs from "@/components/web/site/site-latest-jobs";

export default function HomePage() {
  return (
    <>
      <SiteHero />
      <SiteCarousel />
      <SiteLatestJobs />
    </>
  );
}
