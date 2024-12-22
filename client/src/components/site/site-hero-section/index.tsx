import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store";
import { setSearchQuery } from "@/store/features/jobSlice";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SiteHeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!query || query.length < 1) return;
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <section className="text-center space-y-5">
      <div className="space-y-5">
        <Badge className="text-rose-600 px-4 py-2 rounded-full">
          No. 1 job search platform
        </Badge>
        <h1 className="font-bold text-5xl tracking-wider">
          Discover & Apply to Your Dream Career
        </h1>
        <h2 className="text-lg tracking-wide text-muted-foreground">
          Connect with top recruiter and find your perfect role
        </h2>
      </div>
      <div className="flex lg:w-2/5 border items-center rounded-full mx-auto">
        <Input
          placeholder="Search jobs by title, company or keywords"
          className="outline-none border-none w-full px-6"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          size={"lg"}
          className="rounded-r-full bg-purple-600 text-white"
          onClick={handleSubmit}
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
