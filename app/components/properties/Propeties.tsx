import React from "react";
import { Merriweather } from "next/font/google";

import pro from "../../../public/assets/pro 1.png";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PhoneCall } from "lucide-react";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const properties = [
  {
    image: pro,
    id: 1,
    type: "Villa",
    about: "Signature Villas For Sale In Palm Jumei...",
    price: "100,000",
    description:
      "Mineral Reserves: 2008 core drilling and testing (on just 60 of the 1,100 acres) proved 30 ...",
  },
  {
    image: pro,
    id: 2,
    type: "apartment",
    about: "Signature Villas For Sale In Palm Jumei...",
    price: 1000000,
    description:
      "Mineral Reserves: 2008 core drilling and testing (on just 60 of the 1,100 acres) proved 30 ...",
  },
  {
    image: pro,
    id: 3,
    type: "Villa",
    about: "Signature Villas For Sale In Palm Jumei...",
    price: 1000000,
    description:
      "Mineral Reserves: 2008 core drilling and testing (on just 60 of the 1,100 acres) proved 30 ...",
  },
  {
    image: pro,
    id: 4,
    type: "apartment",
    about: "Signature Villas For Sale In Palm Jumei...",
    price: 1000000,
    description:
      "Mineral Reserves: 2008 core drilling and testing (on just 60 of the 1,100 acres) proved 30 ...",
  },
  {
    image: pro,
    id: 6,
    type: "Villa",
    about: "Signature Villas For Sale In Palm Jumei...",
    price: 1000000,
    description:
      "Mineral Reserves: 2008 core drilling and testing (on just 60 of the 1,100 acres) proved 30 ...",
  },
  {
    image: pro,
    id: 7,
    type: "apartment",
    about: "Signature Villas For Sale In Palm Jumei...",
    price: 1000000,
    description:
      "Mineral Reserves: 2008 core drilling and testing (on just 60 of the 1,100 acres) proved 30 ...",
  },
];

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

export default function Propeties() {
  return (
    <div className="bg-property">
      <div className="bg-white px-12 py-20 bg-opacity-[96%]">
        <div className="flex flex-col gap-2 mb-5">
          <p className="opacity-80 font-light">DUBAI REAL EASTATE</p>
          <h1
            className={`${cn(meriwether.variable)} text-4xl`}
            style={{ fontFamily: "var(--Merriweather)" }}
          >
            Latest Properties
          </h1>
        </div>
        <div className="gap-y-8 gap-x-10 grid grid-cols-3">
          {properties.map((el) => (
            <div
              className="bg-card shadow-lg flex flex-col gap-5 rounded-md cursor-pointer"
              key={el.id}
            >
              <div className="overflow-hidden rounded-t-md">
                <Image
                  className="w-full h-auto hover:scale-105 transition-all duration-200"
                  src={el.image}
                  alt="house"
                  width={400}
                  height={300}
                />
              </div>
              <div className="flex flex-col gap-3 px-4">
                <div className="flex flex-col gap-2">
                  <p className=" text-[13px] text-slate-700">
                    {el.type}, sales
                  </p>
                  <p className=" font-semibold text-[16px] text-black/85">
                    {el.about}
                  </p>
                  <p className=" font-medium text-orange-500">AED {el.price}</p>
                  <p className="text-[12px] text-slate-500">{el.description}</p>
                  <div></div>
                </div>
                <Separator />
                <div className="flex justify-between mb-3">
                  <Card className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
                    <PhoneCall className=" w-[15px] h-[15px] mr-1" /> Call
                  </Card>
                  <Card className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
                    <MdOutlineEmail className="w-[15px] h-[15px] mr-1" /> Email
                  </Card>
                  <Card className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
                    <FaWhatsapp className=" w-[15px] h-[15px] mr-1" />
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
