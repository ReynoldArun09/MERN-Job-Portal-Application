import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import axios from "@/config/axios";
import Head from "@/seo/head";
import { AppDispatch, RootState, useAppDispatch } from "@/store";
import { setLoading } from "@/store/features/authSlice";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SignupValues {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "student" | "recruiter";
  file: string;
}

export default function SignUpPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const [inputs, setInputs] = useState<SignupValues>({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
    file: "",
  });
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setInputs({ ...inputs, file: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post("/auth/signup", inputs);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head title="Sign up" description="job portal application signup page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <form onSubmit={submitHandler} className="w-1/2 border rounded-md p-6">
          <h1 className="mb-5 text-xl font-bold">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              placeholder="john doe"
              name="fullname"
              value={inputs.fullname}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              placeholder="john@example.com"
              name="email"
              value={inputs.email}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              placeholder="+91 1234567899"
              name="phoneNumber"
              value={inputs.phoneNumber}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              placeholder="your password.."
              type="password"
              name="password"
              value={inputs.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={inputs.role === "student"}
                  onChange={changeEventHandler}
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={inputs.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              className="pointer"
              onChange={changeFileHandler}
            />
          </div>
          <div>
            {loading ? (
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
              <Link to="/auth/sign-in" className="text-blue-600">
                Sign In
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
}
