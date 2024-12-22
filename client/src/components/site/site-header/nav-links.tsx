import { Link } from "react-router-dom";

const adminRoutes = [
  {
    name: "Companies",
    url: "/admin/companies",
  },
  {
    name: "Jobs",
    url: "/admin/admin-jobs",
  },
];
const siteRoutes = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Jobs",
    url: "/jobs",
  },
  {
    name: "Browse",
    url: "/browse",
  },
];

interface NavLinksProps {
  authRole: "recruiter" | "student" | undefined;
}

export default function NavLinks({ authRole }: NavLinksProps) {
  return (
    <div>
      <ul className="flex items-center gap-5">
        {authRole === "recruiter" ? (
          <>
            {adminRoutes.map((route) => (
              <li key={route.name}>
                <Link to={route.url}>{route.name}</Link>
              </li>
            ))}
          </>
        ) : (
          <>
            {siteRoutes.map((route) => (
              <li key={route.name}>
                <Link to={route.url}>{route.name}</Link>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
}
