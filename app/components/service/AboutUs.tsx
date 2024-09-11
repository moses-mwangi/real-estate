import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";
import React from "react";
import { GiFamilyHouse, GiShakingHands } from "react-icons/gi";
import { TfiBarChart } from "react-icons/tfi";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

const about = [
  {
    logo: <GiShakingHands className="w-10 h-10" />,
    desc: "Legal Services",
    service:
      "Our global legal experts ensure smooth property transactions, offering advice every step of the way.",
  },
  {
    logo: <GiFamilyHouse className="w-10 h-10" />,
    desc: "Sell Your Home",
    service:
      "We ensure your home is sold at the best possible price, quickly and hassle-free.",
  },
  {
    logo: <TfiBarChart className="w-10 h-10" />,
    desc: "Buy Your Home",
    service:
      "Get free consultations for securing a loan and buying your dream home with ease.",
  },
];

export default function AboutUs() {
  return (
    <div
      className="flex flex-col gap-10 py-20 px-[12px] sm:px-12"
      id="services"
    >
      <div className="">
        <h1 className="flex justify-center text-sm">ABOUT US</h1>
        <p
          className={`${cn(
            meriwether.variable
          )} flex justify-center text-gray-800 text-3xl sm:text-4xl mt-2`}
          style={{ fontFamily: "var(--Merriweather)" }}
        >
          Why You Should Work With Us
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-between gap-6">
        {about.map((el) => (
          <Card
            key={el.desc}
            className="flex flex-col gap-5 py-4 px-3 shadow-lg"
          >
            <span className=" text-orange-400">{el.logo}</span>
            <h1 className=" font-semibold text-xl text-gray-800/90">
              {el.desc}
            </h1>
            <p className=" text-sm text-gray-500">{el.service}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
