import { adminRoutes, siteRoutes } from "@/constants";
import { Link } from "react-router-dom";

interface NavLinksProps {
  authRole: "recruiter" | "student" | undefined;
}

export default function NavLinks({ authRole }: NavLinksProps) {
  const renderRoutes = (routes: { url: string; name: string }[]) => {
    return routes.map((route) => (
      <li key={route.name}>
        <Link to={route.url}>{route.name}</Link>
      </li>
    ));
  };

  const routes = authRole === "recruiter" ? adminRoutes : siteRoutes;

  return (
    <div>
      <ul className="flex items-center gap-5">{renderRoutes(routes)}</ul>
    </div>
  );
}
