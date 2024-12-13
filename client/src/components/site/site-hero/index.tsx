import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setSearchQuery } from "@/services/features/jobSlice";
import { AppDispatch, useAppDispatch } from "@/services/store";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SiteHeroSection() {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const dispatch: AppDispatch = useAppDispatch()
    const navigate = useNavigate()


    const SearchJobs = async () => {
        dispatch(setSearchQuery(searchTerm))
        navigate("/browse")
    }


    return (
        <section className="flex flex-col items-center justify-center h-[40vh] space-y-2.5 max-w-7xl mx-auto">
            <div>
                <Badge className="text-2xl rounded-full py-2.5 px-6">
                    No. 1 job hunt website
                </Badge>
            </div>
            <div>
                <h1 className="text-5xl font-bold leading-[60px]">
                    Search, Apply & <br /> Get Your{" "}
                    <span className="text-indigo-700">Dream Jobs</span>
                </h1>
            </div>
            <div className="flex w-2/5">
                <Input
                    type="text"
                    className="outline-none border-none w-full rounded-l-full"
                    placeholder="find your dream jobs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="rounded-r-full" onClick={SearchJobs}>
                    <Search className="size-5" />
                </Button>
            </div>
        </section>
    );
}
