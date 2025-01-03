import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthSubmitButtonProps {
  isFetching: boolean;
  authType: "Sign-in" | "Sign-up";
}

export default function AuthSubmitButton({
  isFetching,
  authType,
}: AuthSubmitButtonProps) {
  return (
    <div>
      {isFetching ? (
        <Button className="w-full my-4">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait..
        </Button>
      ) : (
        <Button type="submit" className="w-full my-4">
          {authType === "Sign-in" ? "Sign In" : "Sign Up"}
        </Button>
      )}
      <span className="text-sm">
        {authType === "Sign-in"
          ? "Are you new, create account?"
          : "Already have an account?"}{" "}
        <Link
          to={authType === "Sign-in" ? "/auth/sign-up" : "/auth/sign-in"}
          className="text-purple-600"
        >
          {authType === "Sign-in" ? "Sign Up" : "Sign In"}
        </Link>
      </span>
    </div>
  );
}
