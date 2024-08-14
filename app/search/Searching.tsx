"use client";

import React, { useEffect, useState } from "react";
import useSearchProperty from "../components/heroSection/useSearchProperty";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, PhoneCall, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";

export default function Searching() {
  const [nextImageIndexes, setNextImageIndexes] = useState<number[]>([]);
  const { properties } = useSearchProperty();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchAgents() {
      setNextImageIndexes(Array(properties.length).fill(0));
    }

    fetchAgents();
  }, [properties]);

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

  const price = searchParams
    .get("price")
    ?.split(",")
    .sort((a, b) => b.localeCompare(a));
  const bathrooms = searchParams
    .get("bathrooms")
    ?.split(",")
    .sort((a, b) => b.localeCompare(a));
  const bedrooms = searchParams
    .get("bedrooms")
    ?.split(",")
    .sort((a, b) => b.localeCompare(a));
  const type = searchParams.get("type");

  const selected = properties?.filter(
    (el) =>
      el.price <= Number(price?.at(0)) &&
      el.type === type &&
      el.bathrooms <= Number(bathrooms?.at(0)) &&
      el.bedrooms <= Number(bedrooms?.at(0))
  );

  return (
    <div className="flex flex-col gap-8">
      {selected.length === 0 && <div className=" h-svh"></div>}
      {selected?.map((el, index) => (
        <div
          className="bg-card shadow-lg grid grid-cols-[1fr_2.3fr] items-center gap-5 rounded-md"
          key={el._id}
        >
          <div className="overflow-hidden z-30 relative rounded-t-md cursor-zoom-out">
            {el.image[0] && (
              <Image
                className=" w-full h-auto hover:scale-105 transition-all duration-200"
                src={
                  el._id
                    ? el.image[nextImageIndexes[index]] || el.image[0]
                    : el.image[0]
                }
                alt="house"
                width={200}
                height={200}
              />
            )}
            <GrNext
              onClick={() => handleNextImage(index, el.image.length)}
              className="w-10 h-10 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute right-1 top-1/2 transform -translate-y-1/2 z-50 text-slate-100"
            />
            <GrPrevious
              onClick={() => handlePreviousImage(index, el.image.length)}
              className="w-10 h-10 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute left-1 top-1/2 transform -translate-y-1/2 z-50 text-slate-100"
            />
            <div className="rounded-sm px-[6px] py-[2px] absolute left-4 top-4  z-50 bg-cyan-600 text-[10px] text-slate-100">
              Featured
            </div>
            <div className="rounded-sm px-[6px] py-[2px] absolute right-4 top-4  z-50 bg-orange-400 text-[10px] text-slate-100">
              Sales
            </div>
            <div className="flex gap-2 items-center absolute bottom-3 left-3">
              <IoShareSocialSharp className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
              <Heart className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
              <Plus className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
            </div>
          </div>
          <div
            className="flex flex-col gap-3 px-4 cursor-pointer"
            onClick={() => {
              router.push(
                `/${el._id}?lat=${el.position.at(0)}&lng=${el.position.at(1)}`
              );
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="text-[13px] text-slate-700">{el.type}, sales</p>
              <p className="font-semibold text-[16px] hover:text-orange-500 text-black/85">
                {el.about}
              </p>
              <p className=" font-medium text-orange-500">AED {el.price}</p>
              <p className="text-[12px] text-slate-500">
                {el.description.substring(0, 200)}....
              </p>
            </div>

            <div className="flex gap-10 items-center mt-2">
              <Card className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
                <PhoneCall className=" w-[15px] h-[15px] mr-1" /> Call
              </Card>
              <Card className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
                <MdOutlineEmail className="w-[15px] h-[15px] mr-1" /> Email
              </Card>
              <Card className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
                <FaWhatsapp className=" w-[15px] h-[15px] mr-1" /> WhatsAPP
              </Card>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
