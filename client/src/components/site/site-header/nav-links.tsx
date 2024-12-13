import { Link } from "react-router-dom";

const studentsLinks = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Jobs",
        link: "/jobs",
    },
    {
        name: "Browse",
        link: "/browse",
    },
];

const adminLinks = [
    {
        name: "Companies",
        link: "/admin/companies",
    },
    {
        name: "Jobs",
        link: "/admin/jobs",
    },
]

export default function NavLinks({ role }: { role: "student" | "recruiter" }) {
    return (
        <div>
            {role === 'student' ? (
                <div className="flex items-center gap-5">
                    {studentsLinks.map((nav) => (
                        <Link to={nav.link} key={nav.name} className="font-bold">
                            {nav.name}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex items-center gap-5">
                    {adminLinks.map((nav) => (
                        <Link to={nav.link} key={nav.name} className="font-bold">
                            {nav.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
