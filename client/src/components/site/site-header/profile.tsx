import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { UserType } from "@/services/types";
import { LogOutIcon, UserPenIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileProps {
    userInfo: UserType;
}

export default function Profile({ userInfo }: ProfileProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage
                        src={
                            userInfo.profile.profilePhoto || "https://github.com/shadcn.png"
                        }
                    />
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="space-y-4 w-80">
                <div className="flex items-center gap-5">
                    <div>
                        <Avatar className="cursor-pointer">
                            <AvatarImage src={userInfo.profile.profilePhoto} />
                            <AvatarFallback>
                                {userInfo.fullname.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="space-y-1">
                        <h1>{userInfo.fullname}</h1>
                        <p>{userInfo.email}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2.5">
                    {userInfo.role === "student" && (
                        <Link
                            to="/profile"
                            className="flex items-center gap-5 font-semibold"
                        >
                            <UserPenIcon />
                            View Profile
                        </Link>
                    )}
                    <Link to="/" className="flex items-center gap-5 font-semibold">
                        <LogOutIcon />
                        Logout
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}
