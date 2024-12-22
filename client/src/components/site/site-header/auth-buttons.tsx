import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function AuthButtons() {
  return (
    <div className="flex gap-x-2.5">
      <Link
        to="/auth/sign-up"
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        Signup
      </Link>
      <Link
        to="/auth/sign-in"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "bg-violet-600 hover:bg-violet-800 text-white"
        )}
      >
        Signin
      </Link>
    </div>
  );
}
