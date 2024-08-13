"use client";

import React from "react";
import useSearchProperty from "../components/heroSection/useSearchProperty";
import { useRouter, useSearchParams } from "next/navigation";
import { PhoneCall } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { Card } from "@/components/ui/card";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Searching() {
  const { properties } = useSearchProperty();
  const searchParams = useSearchParams();
  const router = useRouter();

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
      {selected?.map((el) => (
        <div
          className="bg-card shadow-lg grid grid-cols-[1fr_2.3fr] items-center gap-5 rounded-md cursor-pointer"
          key={el._id}
          onClick={() => {
            router.push(
              `/${el._id}?lat=${el.position.at(0)}&lng=${el.position.at(1)}`
            );
          }}
        >
          <div className="overflow-hidden rounded-t-md">
            {el.image[0] && (
              <Image
                className=" w-full h-auto hover:scale-105 transition-all duration-200"
                src={el.image[0]}
                alt="house"
                width={200}
                height={200}
              />
            )}
          </div>
          <div className="flex flex-col gap-3 px-4">
            <div className="flex flex-col gap-2">
              <p className=" text-[13px] text-slate-700">{el.type}, sales</p>
              <p className=" font-semibold text-[16px] text-black/85">
                {el.about}
              </p>
              <p className=" font-medium text-orange-500">AED {el.price}</p>
              <p className="text-[12px] text-slate-500">
                {el.description.substring(0, 200)}....
              </p>
              <div></div>
            </div>
            <Separator />
            <div className="flex gap-10 items-center">
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
