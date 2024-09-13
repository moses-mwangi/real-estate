"use client";

import Image from "next/image";
import React from "react";
import logo1 from "../../public/logos/image copy 6.png";
import logo2 from "../../public/logos/image copy 7.png";
import logo3 from "../../public/logos/image copy 8.png";
import logo4 from "../../public/logos/image copy 9.png";

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
    <div className="pt-[2px] pb-[1px] pl-2 sm:pl-5 md:pl-8 shadow-md fixed w-full z-50 top-0 left-0 bg-card flex justify-between items-center">
      <div
        className=" cursor-pointer"
        onClick={() => {
          if (path === "/") {
            handleScroll("home");
          } else {
            router.push("/");
          }
        }}
      >
        {/* <Image
          className="cursor-pointer"
          src={logo2}
          alt="logo"
          width={150}
          height={90}
        /> */}
        <Image
          className="cursor-pointer"
          src={logo4}
          alt="logo"
          width={150}
          height={90}
        />
      </div>
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
        <div className="mr-3 md:mr-0">
          {token ? <UserDetails /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}
