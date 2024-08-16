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
import { LogOut } from "lucide-react";
import UserPage from "./User";

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
      // window.location.reload();
    } catch (err) {
      console.error(err);
      toast.success("Fail to logout");
    }
  }

  return (
    <div>
      {curUser !== null ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-pink-500 p-2 w-9 h-9 text-slate-100 font-semibold flex items-center justify-center rounded-full">
              {curUser?.name[0]}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card w-full mr-6">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="">
              <div>
                <p className=" font-medium text-gray-600">{curUser?.email}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex cursor-pointer text-blue-500 font-medium justify-between items-center"
              onClick={() => {
                handleLogout();
              }}
            >
              <LogOut className="w-5 h-5" />
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
