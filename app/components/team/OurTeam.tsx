"use client";

import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";
import React from "react";
import Image from "next/image";

import { FaFacebook } from "react-icons/fa";
import { Linkedin, PhoneCall } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import useUser from "../user/useUser";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

export default function OurTeam() {
  const { agent } = useUser();

  return (
    <div className="bg-team py-14 px-12" id="agents">
      <div>
        <h1 className=" flex justify-center">OUR AGENTS</h1>
        <h1
          className={`${cn(
            meriwether.variable
          )} text-4xl flex justify-center mt-2 text-gray-800`}
          style={{ fontFamily: "var(--Merriweather)" }}
        >
          Meet Our Team
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-12">
        {agent?.map((el) => (
          <div
            className="bg-card p-2 shadow-lg grid grid-rows-2 gap-5 rounded-md cursor-pointer"
            key={el._id}
          >
            <div className="overflow-hidden h-full rounded-md">
              <Image
                className="w-full h-full rounded-md hover:scale-105 transition-all duration-200"
                src={el.photo}
                alt="house"
                width={400}
                height={300}
              />
            </div>
            <div className="flex flex-col gap-3 px-2">
              <div className="flex flex-col">
                <p className="text-[18px] font-medium text-gray-800">
                  {el.name}
                </p>
                <p className=" text-slate-500 text-sm">{el.role}</p>
                <p className="text-[13px] text-slate-500 mt-3">
                  {/* {el.aboutYou} */}
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Mollitia in cum pariatur facilis obcaecati excepturi atque
                  iure dolorum illo? Enim iste voluptatibus, ea sint ducimus
                  doloribus debitis ratione assumenda quos!
                </p>
              </div>
              <div className="flex justify-between py-4 mt-2">
                <div className="flex gap-3">
                  <FaFacebook className=" text-slate-500 w-4 h-4" />
                  <Linkedin className=" text-slate-500 w-4 h-4" />
                  <BsTwitter className=" text-slate-500 w-4 h-4" />
                  <BsInstagram className=" text-slate-500 w-4 h-4" />
                </div>
                <div className="flex gap-3">
                  <MdEmail className=" text-slate-500 w-4 h-4" />
                  <PhoneCall className=" text-slate-500 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
