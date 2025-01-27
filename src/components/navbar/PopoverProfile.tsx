"use client";
import { Button } from "../ui/button";
import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUserContext } from "@/contexts/UserContext";
import { HomeIcon, LogOutIcon, Settings, User } from "lucide-react";
import Link from "next/link";

const PopoverProfile = () => {
  const { signOut, isLoaded } = useAuth();
  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
    if (isLoaded) {
      queryClient.clear();
    }
  };

  const { user } = useUserContext();

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="neutral"
        className=" items-center gap-2  hidden sm:flex"
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </Button>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="cursor-pointer">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.data?.image} />
            <AvatarFallback className="border border-ring">
              {user?.data?.name[0]}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="p-0 mt-2 w-full" align="end" asChild>
          <Command className="rounded-lg min-w-60">
            <CommandList>
              <CommandGroup heading="User Profile">
                <CommandItem className="py-0 aria-selected:outline-none">
                  <span>{user?.data?.name}</span>
                </CommandItem>
                <CommandItem className="aria-selected:outline-none">
                  <span>{user?.data?.username}</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <Link href="/" className="block sm:hidden">
                  <CommandItem
                    className="cursor-pointer"
                    onSelect={() => setOpen(false)}
                  >
                    <HomeIcon className="w-4 h-4" />
                    <span>Home</span>
                  </CommandItem>
                </Link>
                <Link href={`/profile/${user?.data?.username}`}>
                  <CommandItem
                    className="cursor-pointer "
                    onSelect={() => setOpen(false)}
                  >
                    <User />
                    <span>Profile</span>
                  </CommandItem>
                </Link>
                <CommandItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOutIcon />
                  <span>Logout</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverProfile;
