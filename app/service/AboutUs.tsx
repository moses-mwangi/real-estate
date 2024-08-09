import { Card } from "@/components/ui/card";
import React from "react";
import { GiFamilyHouse, GiShakingHands } from "react-icons/gi";
import { TfiBarChart } from "react-icons/tfi";

const about = [
  {
    logo: <GiShakingHands className=" w-10 h-10" />,
    desc: "Legal services",
    service:
      "We offer expert legal help for all related property items in Dubai.",
  },
  {
    logo: <GiFamilyHouse className=" w-10 h-10" />,
    desc: "Sell your home",
    service:
      "We sell your home at the best market price and very quickly as well.",
  },
  {
    logo: <TfiBarChart className=" w-10 h-10" />,
    desc: "Buy your home",
    service: "We offer you free consultancy to get a loan for your new home.",
  },
];

export default function AboutUs() {
  return (
    <div className="grid grid-rows-2 py-20 px-12">
      <div className="">
        <h1 className="flex justify-center text-sm">ABOUT US</h1>
        <p className="flex justify-center text-gray-800/85 text-4xl font-semibold mt-2">
          Why You Should Work With Us
        </p>
      </div>
      <div className="flex items-center justify-between gap-14">
        {about.map((el) => (
          <Card
            key={el.desc}
            className="flex flex-col border-none gap-5 py-4 px-3 shadow-md"
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
