"use client";

import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import prone from "../../../public/dubai/agent 1.png";
import protwo from "../../../public/dubai/agent 2.png";
import prothree from "../../../public/dubai/agent 3.png";
import { FaFacebook } from "react-icons/fa";
import { Linkedin, PhoneCall, WifiHigh } from "lucide-react";
import { MdEmail } from "react-icons/md";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import axios from "axios";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

interface Agent {
  _id: string;
  name: string;
  role: string;
  image: string;
  information: string;
}

export default function OurTeam() {
  const [agents, setAgents] = useState<Agent[]>([]);
  //real-estate-api-azure.vercel.app
  https: useEffect(() => {
    async function fetchAgents() {
      // const res = await axios.get("http://127.0.0.1:3008/api/agents");
      const res = await axios.get(
        "https://real-estate-api-azure.vercel.app/api/agents"
      );

      setAgents(res.data.data);
    }

    fetchAgents();
  }, []);

  return (
    <div className="bg-team py-14 px-12">
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
        {agents.map((el) => (
          <div
            className="bg-card p-2 shadow-lg flex flex-col gap-5 rounded-md cursor-pointer"
            key={el._id}
          >
            <div className="overflow-hidden rounded-md">
              <Image
                className="w-full h-auto rounded-md hover:scale-105 transition-all duration-200"
                src={el.image}
                alt="house"
                width={400}
                height={300}
              />
            </div>
            <div className="flex flex-col gap-3 px-2">
              <div className="flex flex-col">
                <p className="text-xl font-medium text-slate-800">{el.name}</p>
                <p className=" text-slate-500 text-sm">{el.role}</p>
                <p className="text-[13px] text-slate-500 mt-3">
                  {el.information}
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
