import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../../../../../stores/useJobStore";

export default function SiteHero() {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();
  const { setSearchQuery } = useJobStore();

  const handleSubmit = () => {
    if (!query || query.length < 1) return;
    setSearchQuery(query);
    navigate("/browse");
  };

  return (
    <section className="text-center space-y-5 py-10">
      <div className="space-y-5">
        <Badge className="bg-purple-600 text-white font-bold tracking-wider px-4 py-2 rounded-full">No. 1 Job Search Platform</Badge>
        <h1 className="font-bold text-5xl tracking-wider">Discover & Apply to Your Dream Career</h1>
        <h2 className="text-lg tracking-wide text-muted-foreground">Connect with top recruiter and find your perfect role</h2>
      </div>
      <div className="flex lg:w-2/5 border items-center rounded-full mx-auto">
        <Input
          placeholder="Search jobs by title, company or keywords"
          className="outline-none border-none w-full px-6 focus-visible:ring-0"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button size={"lg"} className="rounded-r-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSubmit}>
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
