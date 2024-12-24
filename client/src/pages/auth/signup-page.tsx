import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignUpSchema, SignUpSchemaType } from "@/schemas/auth-schema";
import { RootState, useAppDispatch } from "@/store";
import { clearState, SignupUser } from "@/store/features/authSlice";
import Head from "@/utils/seo/head";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Loader2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");

  const { isFetching, isSuccess, isError, errorMessage, successMessage } =
    useSelector((state: RootState) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      fullname: "",
      password: "",
      email: "",
      role: "student",
      phoneNumber: "",
    },
  });

  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<SignUpSchemaType> = (
    values: SignUpSchemaType
  ) => {
    const formatValues = {
      ...values,
      photo,
    };
    dispatch(SignupUser(formatValues));
  };

  useEffect(() => {
    if (isSuccess && successMessage) {
      toast.success(successMessage);
      navigate("/auth/sign-in");
      dispatch(clearState());
    }

    if (isError && errorMessage) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError, successMessage, errorMessage, navigate, dispatch]);
  return (
    <>
      <Head title="Sign up" description="job portal application signup page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/2 border rounded-md p-6 space-y-2.5"
        >
          <h1 className="mb-5 text-xl font-bold">Sign Up</h1>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input placeholder="john doe" {...register("fullname")} />
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input placeholder="john@example.com" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input placeholder="+91 1234567899" {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              className="pointer"
              onChange={changeFileHandler}
            />
          </div>
          <div>
            {isFetching ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Signup
              </Button>
            )}
            <span className="text-sm">
              Already have an account?{" "}
              <Link to="/auth/sign-in" className="text-purple-600">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
}
