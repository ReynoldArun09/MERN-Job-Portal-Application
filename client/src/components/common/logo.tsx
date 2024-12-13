import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="text-2xl font-bold cursor-pointer">
            <span>Job</span>
            <span className="text-rose-500">Portal</span>
        </Link>
    );
}
