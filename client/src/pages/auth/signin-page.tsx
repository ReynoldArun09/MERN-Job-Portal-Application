import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema, SignInSchemaType } from "@/schemas/auth-schema";
import { RootState, useAppDispatch } from "@/store";
import { clearState, SigninUser } from "@/store/features/authSlice";
import Head from "@/utils/seo/head";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isFetching, isSuccess, isError, errorMessage, successMessage } =
    useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit: SubmitHandler<SignInSchemaType> = (
    values: SignInSchemaType
  ) => {
    dispatch(SigninUser(values));
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(successMessage);
      dispatch(clearState());
      navigate("/");
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, navigate, errorMessage, successMessage, dispatch]);

  return (
    <>
      <Head title="Sign in" description="job portal application sign in page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 border space-y-2 rounded-lg p-6"
        >
          <h1 className="mb-5 text-xl font-bold">Sign In</h1>
          <div className="space-y-2.5">
            <Label>Email</Label>
            <Input
              placeholder="john@example.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2.5">
            <Label>Password</Label>
            <Input
              placeholder="your password.."
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" value="student" {...register("role")} />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" value="recruiter" {...register("role")} />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>
          <div>
            {isFetching ? (
              <Button className="w-full my-4">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait..
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Signin
              </Button>
            )}
            <span className="text-sm">
              Are you new, create account?{" "}
              <Link to="/auth/sign-up" className="text-purple-600">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
}
