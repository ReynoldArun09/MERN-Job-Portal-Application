import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInSchema, SignInSchemaType } from "@/schemas/auth-schema";
import { RootState, useAppDispatch } from "@/store";
import { SigninUser } from "@/store/services/auth/auth-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthSubmitButton from "../auth-submit-button";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isFetching = useSelector((state: RootState) => state.auth.isLoading);

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
    navigate("/");
  };

  return (
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
      <AuthSubmitButton isFetching={isFetching} authType="Sign-in" />
    </form>
  );
}
