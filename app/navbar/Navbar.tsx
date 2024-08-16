"use client";

import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import UserProfile from "../components/user/UserProfile";

const lists = [
  { label: "Home", id: "home" },
  { label: "Properties", id: "properties" },
  { label: "Services", id: "services" },
  { label: "Agents", id: "agents" },
  { label: "Contact Us", id: "contact" },
];

export default function Navbar() {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-5 px-12 shadow-md fixed z-50 top-0 left-0 w-full bg-card flex justify-between items-center">
      <Image
        className="h-10 w-auto cursor-pointer"
        src={logo}
        alt="logo"
        width={300}
        height={100}
        onClick={() => handleScroll("home")}
      />
      <div className="flex gap-12">
        {lists.map((el) => (
          <div key={el.label}>
            <span
              onClick={() => handleScroll(el.id)}
              className="font-semibold text-sm text-gray-700 cursor-pointer hover:text-orange-600 transition-all duration-150"
            >
              {el.label}
            </span>
          </div>
        ))}
      </div>
      <UserProfile />
    </div>
  );
}
