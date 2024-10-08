"use client";

import React, { useState } from "react";
import useUser from "@/app/components/user/useUser";
import Image from "next/image";
import { LogOut, User, Pencil } from "lucide-react";
import UserPhoto from "./UserPhoto";
import { MdMarkEmailUnread, MdAdminPanelSettings } from "react-icons/md";
import UserProfileSetting from "./UserProfileSetting";
import { Button } from "@/components/ui/button";
import UserImageUpload from "./UserImageUpload";
import { useRouter } from "next/navigation";

export default function UserDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const router = useRouter();

  const { curUser, logOut } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <UserPhoto />
      </div>

      {isOpen && (
        <div className="absolute right-8 mt-1 p-4 bg-white shadow-lg rounded-lg z-10">
          <div className="">
            <div className="flex items-center space-x-4 relative">
              <div
                className="flex-shrink-0 cursor-pointer relative"
                onClick={() => {
                  setIsUpload(true);
                }}
              >
                {isUpload === true && (
                  <UserImageUpload
                    isUpload={isUpload}
                    setIsUpload={setIsUpload}
                  />
                )}
                {curUser?.photo ? (
                  <div className="w-[54px] h-[54px]">
                    <Image
                      className="rounded-full h-full w-full object-cover"
                      src={curUser?.photo}
                      alt="User Avatar"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <Button className=" bg-pink-600 hover:bg-pink-700 w-12 h-12 rounded-full text-slate-50 font-semibold">
                    {curUser?.name[0].toLocaleUpperCase()}
                  </Button>
                )}
                <button className="absolute bottom-2 -right-2 p-1 bg-white border rounded-full shadow-sm hover:bg-gray-100">
                  <Pencil className="w-[14px] h-[14px] text-gray-600" />
                </button>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{curUser?.name}</h4>
                <p className="text-sm text-gray-600">{curUser?.email}</p>
              </div>
            </div>
            <hr className="mt-4 mb-3" />

            <div className="">
              <div className="w-full cursor-pointer duration-150 transition-all text-gray-800 hover:bg-slate-100 rounded-sm pl-3 py-2">
                <span className=" text-sm font-medium flex gap-3">
                  <User className=" w-5 h-5 text-gray-600" /> {curUser?.name}
                </span>
              </div>
              <div className="w-full cursor-pointer duration-150 transition-all text-gray-800 hover:bg-slate-100 rounded-sm pl-3 py-2">
                <span className=" text-sm font-medium flex gap-3">
                  <MdMarkEmailUnread className=" w-5 h-5 text-gray-600" />
                  {curUser?.email}
                </span>
              </div>
              <div className="w-full cursor-pointer duration-150 transition-all text-gray-800 hover:bg-slate-100 rounded-sm pl-3 py-2">
                <span
                  className=" text-sm font-medium flex gap-3"
                  onClick={() => {
                    if (
                      curUser?.role === "admin" ||
                      curUser?.role === "agent"
                    ) {
                      router.push(
                        // "https://real-estate-dashboard-kappa.vercel.app/login"
                        "https://admin.bomac.io/login"
                      );
                    }
                  }}
                >
                  <MdAdminPanelSettings className=" w-5 h-5 text-gray-600" />
                  {curUser?.role}
                </span>
              </div>

              <UserProfileSetting toggleDropdown={toggleDropdown} />

              <div
                className="w-full cursor-pointer duration-150 transition-all text-gray-600 hover:text-blue-600 hover:bg-slate-100 rounded-sm pl-3 py-2"
                onClick={() => {
                  logOut();
                  toggleDropdown();
                }}
              >
                <span className="text-sm font-medium flex gap-3 text-gray-800">
                  <LogOut className=" w-5 h-5 text-gray-600" /> Sign Out
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
