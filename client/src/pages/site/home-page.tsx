import SiteCategoryCarousel from "@/components/site/site-categories-carousel";
import SiteHeroSection from "@/components/site/site-hero-section";
import SiteLatestJobs from "@/components/site/site-latest-jobs";

export default function HomePage() {
  return (
    <main className="container mx-auto px-8 md:px-6 lg:px-4">
      <SiteHeroSection />
      <SiteCategoryCarousel />
      <SiteLatestJobs />
    </main>
  );
}
