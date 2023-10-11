"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiOutlineLogout } from "react-icons/hi";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogContentLogout } from "../alerts/logout-alerts";

export function UserNav() {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserAvatar />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-row gap-2 justify-center items-center">
              <UserAvatar />
              <UserDesc />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <HiOutlineLogout className="mx-2" />
              Log out
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContentLogout />
    </AlertDialog>
  );
}

export const UserAvatar = () => {
  const { data, status } = useSession({
    required: true,
  });

  if (status === "loading" || !data.user) {
    return <Skeleton className="h-9 w-9 rounded-full" />;
  }

  return (
    <Avatar className="h-9 w-9">
      {data.user?.image && <AvatarImage alt="@shadcn" src={data.user.image} />}
      <AvatarFallback>{data.user.name?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export const UserDesc = () => {
  const { data, status } = useSession({
    required: true,
  });

  if (status === "loading" || !data.user) {
    return (
      <div className="flex flex-col">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium leading-none">{data.user.name}</p>
      <p className="text-xs leading-none text-muted-foreground">
        {data.user.email}
      </p>
    </div>
  );
};
