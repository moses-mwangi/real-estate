"use client";
import React from "react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useUser from "./useUser";
import { LogOut, User } from "lucide-react";
import UserPage from "./User";
import { Separator } from "@/components/ui/separator";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  googleId: string;
  date: Date;
}

export default function UserProfile() {
  const { curUser, logOut } = useUser();

  function handleLogout() {
    try {
      logOut();
      toast.success("You have successfully logout");
    } catch (err) {
      console.error(err);
      toast.success("Fail to logout");
    }
  }

  return (
    <div>
      {curUser ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-pink-500 p-2 w-9 h-9 text-slate-100 font-semibold flex items-center justify-center rounded-full">
              {curUser?.name[0]}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card w-64 mr-6">
            <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <div className=" bg-slate-100 rounded-full p-[8px]">
                <User />
              </div>
              <div>
                <p>{curUser.name}</p>
                <p className=" font-medium text-gray-600">{curUser?.email}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-5 items-center cursor-pointer text-blue-500 font-medium"
              onClick={() => {
                handleLogout();
              }}
            >
              <LogOut className="w-[18px] h-[18px]" />
              <p className=" font-medium">Logout</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          <UserPage />
        </div>
      )}
    </div>
  );
}
