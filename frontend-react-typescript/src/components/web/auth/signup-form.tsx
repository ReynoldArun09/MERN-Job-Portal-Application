import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import AuthSubmitButton from "@/components/web/auth/auth-submit-button";
import { useAuthStore } from "@/stores/useAuthStore";
import { SignUpSchema, SignUpSchemaType } from "@/validations/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState("");
  const { isFetching, SignupUser } = useAuthStore();
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

  const onSubmit: SubmitHandler<SignUpSchemaType> = (values: SignUpSchemaType) => {
    const formatValues = {
      ...values,
      photo,
    };
    SignupUser(formatValues);
    navigate("/auth/sign-in");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 border rounded-md p-6 space-y-2.5">
      <h1 className="mb-5 text-xl font-bold">Sign Up</h1>
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input placeholder="john doe" {...register("fullname")} />
        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input placeholder="john@example.com" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <Input placeholder="+91 1234567899" {...register("phoneNumber")} />
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <Input placeholder="your password.." type="password" {...register("password")} />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
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
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>
      <div className="space-y-2">
        <Label>Profile Picture</Label>
        <Input type="file" accept="image/*" className="pointer" onChange={changeFileHandler} />
      </div>
      <AuthSubmitButton isFetching={isFetching} authType="Sign-up" />
    </form>
  );
}
