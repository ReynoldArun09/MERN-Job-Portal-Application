import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useAuthActions, useUserData } from "@/stores/useAuthStore";
import { LogOutIcon, User2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileInfo() {
  const { SignOutUser } = useAuthActions();

  const user = useUserData();

  const handleLogout = () => {
    SignOutUser();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profile?.profilePhoto} />
          <AvatarFallback>{user?.fullname?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="space-y-4 w-80">
        <div className="flex items-center gap-5">
          <div>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.profile?.profilePhoto} />
              <AvatarFallback>{user?.fullname?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-1">
            <h1 className="capitalize">{user?.fullname}</h1>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-x-1.5">
          <Link to="/profile" className={cn(buttonVariants({ variant: "link" }), "flex gap-x-1.5")}>
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
