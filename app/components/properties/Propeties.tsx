"use client";

import React from "react";
import { Merriweather } from "next/font/google";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Heart, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";
import Email from "./Email";
import PhoneNumber from "./PhoneCall";
import useProperty from "./useProperty";
import WhatsUpPage from "./WhatsUpPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

export default function Propeties() {
  const router = useRouter();
  const { properties, nextImageIndexes, handleNextImage, handlePreviousImage } =
    useProperty();

  const sortedProperty = properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="bg-property" id="properties">
      <div className="bg-white px-7 sm:px-12 pt-20 bg-opacity-[96%]">
        <div className="flex flex-col gap-2 mb-5">
          <p className="opacity-80 font-light">GLOBAL REAL ESTATE</p>
          <h1
            className={`${cn(meriwether.variable)} text-4xl`}
            style={{ fontFamily: "var(--Merriweather)" }}
          >
            Latest Properties
          </h1>
        </div>
        <div className="gap-y-8 gap-x-10 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
          {sortedProperty?.map((el, index) => (
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
                  className="w-10 h-10 cursor-pointer font-bold hover:bg-card/20 rounded-full p-1 absolute right-1 top-1/2 transform -translate-y-1/2 z-40 text-slate-100"
                />
                <GrPrevious
                  onClick={() => handlePreviousImage(index, el.image.length)}
                  className="w-10 h-10 cursor-pointer font-bold hover:bg-card/20 rounded-full p-1 absolute left-1 top-1/2 transform -translate-y-1/2 z-40 text-slate-100"
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
              <div className="grid grid-cols-1 gap-3 px-4 cursor-pointer">
                <Link
                  href={`/${el._id}?lat=${el.position.at(
                    0
                  )}&lng=${el.position.at(1)}`}
                  className="flex flex-col gap-2"
                >
                  <p className="text-[13px] text-slate-700">{el.type}, sales</p>
                  <p className="font-semibold text-[16px] text-black/85 duration-150 transition-all hover:text-orange-500">
                    {/* {el.about} */}
                    {el.description.substring(0, 35)}...
                  </p>
                  <p className="font-medium text-orange-500">
                    Ksh {el.price.toLocaleString()}
                  </p>
                  <p className="text-[12px] h-14 text-slate-500">
                    {el.description.substring(0, 130)}....
                  </p>
                </Link>
                <Separator />
                <div>
                  {el.userId.map((arr) => (
                    <div
                      className="flex justify-between items-center mb-3"
                      key={arr.photo}
                    >
                      <PhoneNumber el={arr} />
                      <Email el={arr} />
                      <WhatsUpPage el={arr} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" flex justify-center py-16">
          <Button
            className="font-normal text-[17px] transition-all duration-150  bg-orange-500 hover:bg-orange-400 rounded-md px-3 py-1"
            onClick={() => {
              router.push("/allProperties");
            }}
          >
            SHOW ALL PROPERTIES
          </Button>
        </div>
      </div>
    </div>
  );
}
