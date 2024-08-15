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

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  googleId: string;
  date: Date;
}

export default function UserProfile() {
  const { curUser } = useUser();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="bg-pink-500 p-2 w-9 h-9 text-slate-100 font-semibold flex items-center justify-center rounded-full">
            {curUser?.name[0]}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-card w-20">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
