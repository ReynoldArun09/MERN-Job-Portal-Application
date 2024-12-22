import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UserType } from "@/store/types";
import { LogOutIcon, User2 } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileInfoProps {
  user: UserType;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const handleLogout = () => {};

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
          />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 w-80">
        <div className="flex items-center gap-5">
          <div>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>{user?.fullname.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1">
            <h1 className="capitalize">{user?.fullname}</h1>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-1.5">
          <Link
            to="/profile"
            className={cn(
              buttonVariants({ variant: "link" }),
              "flex gap-x-1.5"
            )}
          >
            <User2 size={20} />
            View Profile
          </Link>
          <Button variant={"link"} onClick={handleLogout}>
            <LogOutIcon size={25} />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
