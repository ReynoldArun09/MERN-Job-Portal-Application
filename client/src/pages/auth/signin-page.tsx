import SignInForm from "@/components/web/auth/forms/sign-in-form";
import Head from "@/utils/seo/head";

export default function SignInPage() {
  return (
    <>
      <Head
        title="Sign in"
        description="job portal application, sign in page"
      />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <SignInForm />
      </section>
    </>
  );
}
