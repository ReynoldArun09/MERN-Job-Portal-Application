import CompanySetupForm from "@/components/web/admin/forms/company-setup-form";
import Head from "@/utils/seo/head";

export default function CompanySetupPage() {
  return (
    <>
      <Head
        title="Company setup"
        description="job portal application, company setup page"
      />
      <section>
        <CompanySetupForm />
      </section>
    </>
  );
}
