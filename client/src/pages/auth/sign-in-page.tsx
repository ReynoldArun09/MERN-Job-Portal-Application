import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import axios from "@/config/axios";
import Head from "@/seo/head";
import { AppDispatch, RootState, useAppDispatch } from "@/store";
import { setLoading, setUser } from "@/store/features/authSlice";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SigninValues {
  email: string;
  password: string;
  role: "student" | "recruiter";
}

export default function SignIPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const loading = useSelector((state: RootState) => state.auth.isLoading);
  const [inputs, setInputs] = useState<SigninValues>({
    email: "",
    password: "",
    role: "student",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post("/auth/signin", inputs);
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Head title="Sign in" description="job portal application sign in page" />
      <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-6"
        >
          <h1 className="mb-5 text-xl font-bold">Sign In</h1>
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
            {loading ? (
              <Button className="w-full my-4">
                {" "}
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait{" "}
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Signin
              </Button>
            )}
            <span className="text-sm">
              Are you new, create account?{" "}
              <Link to="/auth/sign-up" className="text-blue-600">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </section>
    </>
  );
}
