"use client";

import React, { useEffect, useState } from "react";
import { Merriweather } from "next/font/google";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Heart, Phone, PhoneCall, Plus } from "lucide-react";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";
import useUser from "../user/useUser";
import toast from "react-hot-toast";
import Email from "./Email";
import PhoneNumber from "./PhoneCall";

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
  const [nextImageIndexes, setNextImageIndexes] = useState<number[]>([]);
  const router = useRouter();
  const { curUser, setShow } = useUser();

  useEffect(() => {
    async function fetchAgents() {
      const propety = await axios.get(
        "https://real-estate-api-azure.vercel.app/api/property"
      );
      setProperties(propety.data.data);
      setNextImageIndexes(Array(propety.data.data.length).fill(0));
    }

    fetchAgents();
  }, []);

  const handleNextImage = (index: number, imageCount: number) => {
    setNextImageIndexes((prev) =>
      prev.map((value, i) => (i === index ? (value + 1) % imageCount : value))
    );
  };

  const handlePreviousImage = (index: number, imageCount: number) => {
    setNextImageIndexes((prev) =>
      prev.map((value, i) =>
        i === index ? (value - 1 + imageCount) % imageCount : value
      )
    );
  };

  return (
    <div className="bg-property">
      <div className="bg-white px-12 py-20 bg-opacity-[96%]">
        <div className="flex flex-col gap-2 mb-5">
          <p className="opacity-80 font-light">DUBAI REAL ESTATE</p>
          <h1
            className={`${cn(meriwether.variable)} text-4xl`}
            style={{ fontFamily: "var(--Merriweather)" }}
          >
            Latest Properties
          </h1>
        </div>
        <div className="gap-y-8 gap-x-10 grid grid-cols-3">
          {properties.map((el, index) => (
            <div
              className="bg-card shadow-lg flex flex-col gap-5 rounded-md cursor-zoom-out"
              key={el._id}
            >
              <div className="overflow-hidden relative rounded-t-md">
                {el.image[0] && (
                  <Image
                    className="w-full z-40 h-auto hover:scale-105 transition-all duration-200"
                    src={
                      el._id ? el.image[nextImageIndexes[index]] : el.image[0]
                    }
                    alt="house"
                    width={400}
                    height={400}
                  />
                )}
                <GrNext
                  onClick={() => handleNextImage(index, el.image.length)}
                  className="w-10 h-10 font-bold hover:bg-card/20 rounded-full p-1 absolute right-1 top-1/2 transform -translate-y-1/2 z-40 text-slate-100"
                />
                <GrPrevious
                  onClick={() => handlePreviousImage(index, el.image.length)}
                  className="w-10 h-10 font-bold hover:bg-card/20 rounded-full p-1 absolute left-1 top-1/2 transform -translate-y-1/2 z-40 text-slate-100"
                />
                <div className="rounded-sm px-[6px] py-[2px] absolute left-4 top-4  z-40 bg-cyan-600 text-[10px] text-slate-100">
                  Featured
                </div>
                <div className="rounded-sm px-[6px] py-[2px] absolute right-4 top-4  z-40 bg-orange-400 text-[10px] text-slate-100">
                  Sales
                </div>
                <div className="flex gap-2 items-center absolute bottom-3 left-3">
                  <IoShareSocialSharp className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
                  <Heart className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
                  <Plus className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
                </div>
              </div>
              <div className="flex flex-col gap-3 px-4 cursor-pointer">
                <div
                  className="flex flex-col gap-2"
                  onClick={() => {
                    if (curUser) {
                      router.push(
                        `/${el._id}?lat=${el.position.at(
                          0
                        )}&lng=${el.position.at(1)}`
                      );
                    } else {
                      setShow((el) => !el);
                      toast.error("Log in First");
                    }
                  }}
                >
                  <p className="text-[13px] text-slate-700">{el.type}, sales</p>
                  <p className="font-semibold text-[16px] text-black/85 duration-150 transition-all hover:text-orange-500">
                    {el.about}
                  </p>
                  <p className="font-medium text-orange-500">AED {el.price}</p>
                  <p className="text-[12px] text-slate-500">
                    {el.description.substring(0, 130)}....
                  </p>
                </div>
                <Separator />
                <div className="flex justify-between mb-3">
                  <PhoneNumber />
                  <Email />
                  <Card className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
                    <FaWhatsapp className="w-[15px] h-[15px] mr-1" />
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
