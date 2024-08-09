import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import Link from "next/link";

const lists = [
  { label: "Home" },
  { label: "Property" },
  { label: "Agents" },
  { label: "Blog" },
  { label: "Contact Us" },
];

export default function Navbar() {
  return (
    <div className="py-5 px-12 flex justify-between items-center">
      <Link href="/">
        <Image
          className=" h-10 w-auto"
          src={logo}
          alt="logo"
          width={300}
          height={100}
        />
      </Link>

      <div className="flex gap-12">
        {lists.map((el) => (
          <div key={el.label}>
            <span className="font-medium text-slate-700 cursor-pointer hover:text-orange-600 transition-all duration-150">
              {el.label}
            </span>
          </div>
        ))}
      </div>
      <div className="bg-red-300 h-8 w-8 rounded-full"></div>
    </div>
  );
}
