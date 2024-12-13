import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "@/services/store";
import { setLoading } from "@/services/features/authSlice";

interface SigninValues {
    email: string;
    password: string;
    role: "student" | "recruiter"

}


export default function SignIPage() {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useAppDispatch();
    const loading = useSelector((state: RootState) => state.auth.isLoading)
    const [inputs, setInputs] = useState<SigninValues>({
        email: "",
        password: "",
        role: "student",

    })

    const changeEventHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            dispatch(setLoading(true))
            const response = await axios.post("/auth/signin", inputs)
            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message)
            }
        } finally {
            dispatch(setLoading(false))
        }
    }

    return (
        <section className="max-w-7xl mx-auto flex items-center justify-center min-h-screen">
            <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-6">
                <h1 className="mb-5 text-xl font-bold">Sign In</h1>
                <div>
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" name="email" value={inputs.email} onChange={changeEventHandler} />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input placeholder="your password.." type="password" name="password" value={inputs.password} onChange={changeEventHandler} />
                </div>
                <div className="flex items-center justify-between">
                    <RadioGroup className="flex items-center gap-4 my-5">
                        <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="student" checked={inputs.role === "student"} onChange={changeEventHandler} />
                            <Label>Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Input type="radio" name="role" value="recruiter" checked={inputs.role === "recruiter"} onChange={changeEventHandler} />
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
                        <Link to="/sign-up" className="text-blue-600">
                            Sign Up
                        </Link>
                    </span>
                </div>
            </form>
        </section>
    )
}
