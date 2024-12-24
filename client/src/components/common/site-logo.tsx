import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

export default function SiteLogo() {
  return (
    <Link to="/" className="flex items-center gap-x-2.5 cursor-pointer">
      <Briefcase className="hidden md:block" />
      <h1 className="font-bold text-2xl">
        <span className="text-purple-600">Job</span> Portal
      </h1>
    </Link>
  );
}
