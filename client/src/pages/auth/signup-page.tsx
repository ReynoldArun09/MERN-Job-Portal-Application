import SignUpForm from "@/components/web/auth/forms/sign-up-form";
import Head from "@/utils/seo/head";

export default function SignUpPage() {
  return (
    <>
      <Head title="Sign up" description="job portal application, signup page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <SignUpForm />
      </section>
    </>
  );
}
