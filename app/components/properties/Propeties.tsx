"use client";

import React, { useEffect, useState } from "react";
import { Merriweather } from "next/font/google";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PhoneCall } from "lucide-react";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

interface Property {
  _id: string;
  image: [string];
  description: string;
  about: string;
  type: string;
  bathrooms: number;
  bedrooms: number;
  garages: number;
  createdAt: Date;
  price: number;
  city: string;
  zipcode: number;
  address: string;
  position: [number];
}

export default function Propeties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAgents() {
      // const propety = await axios.get("http://127.0.0.1:3008/api/property");
      const propety = await axios.get(
        "https://real-estate-mu-peach.vercel.app/api/property"
      );
      setProperties(propety.data.data);
    }

    fetchAgents();
  }, []);

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
              key={el._id}
              onClick={() => {
                router.push(`/${el._id}`);
              }}
            >
              <div className="overflow-hidden rounded-t-md">
                <Image
                  className="w-full h-auto hover:scale-105 transition-all duration-200"
                  src={el.image[0]}
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
                  <p className="text-[12px] text-slate-500">
                    {el.description.substring(0, 130)}....
                  </p>
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
