"use client";

import Image from "next/image";
import React from "react";
import log from "../../public/images/image copy 11.png";
import logo from "../../public/logos/image copy 3.png";
import logos from "../../public/logos/image copy 4.png";
import logoss from "../../public/logos/image copy 5.png";
import { usePathname, useRouter } from "next/navigation";
import UserDetails from "../components/user/UserDetails";
import useUser from "../components/user/useUser";
import SignUpForm from "../components/user/SignUpForm";
import NavbarSheet from "./NavbarSheet";

const lists = [
  { label: "Home", id: "home" },
  { label: "Properties", id: "properties" },
  { label: "Services", id: "services" },
  { label: "Agents", id: "agents" },
  { label: "Contact Us", id: "contact" },
];

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  const { token } = useUser();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-[5px] pl-8 shadow-md fixed w-svw z-50 top-0 left-0 bg-card flex justify-between items-center">
      <Image
        className="h-auto w-auto cursor-pointer"
        // className="cursor-pointer"
        src={logoss}
        alt="logo"
        width={60}
        height={50}
        onClick={() => {
          if (path === "/") {
            handleScroll("home");
          } else {
            router.push("/");
          }
        }}
      />
      <div className=" hidden md:flex gap-12">
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
      <div className="flex gap-1 items-center">
        <NavbarSheet />
        <div>{token ? <UserDetails /> : <SignUpForm />}</div>
      </div>
    </div>
  );
}
