"use client";

import React from "react";
import { Merriweather } from "next/font/google";
import SearchHouse from "./SearchHouse";
import { cn } from "@/lib/utils";
import { PiBuildingApartmentBold, PiBuildingOfficeThin } from "react-icons/pi";
import { GiFamilyHouse } from "react-icons/gi";
import { TbBuildingMosque } from "react-icons/tb";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

export default function HeroSection() {
  return (
    <section
      className="px-[10px] sm:pl-7 md:pl-12 z-20 w-full h-[105svh] sm:h-[105svh] pt-20 md:grid md:grid-cols-[1fr_1.5fr] relative"
      id="home"
    >
      <div>
        <div className="z-50 flex flex-col gap-[70px] mt-24 sm:mt-[120px] absolute w-full md:w-[60svw]">
          <p
            className={`${cn(
              meriwether.variable
            )} text-4xl sm:text-[53px] leading-[1] text-gray-800`}
            style={{ fontFamily: "var(--Merriweather)" }}
          >
            Kenya Real Estate <br /> Luxury Market Place
          </p>
          <SearchHouse />
          <div className=" hidden sm:flex gap-10">
            <span className="flex gap-2 text-slate-800 font-medium text-[15px] items-center">
              <PiBuildingApartmentBold className="w-[22px] h-[22px] text-orange-600" />{" "}
              Apartment
            </span>
            <span className="flex gap-2 text-slate-800 font-medium text-[15px] items-center">
              <GiFamilyHouse className="w-[22px] h-[22px] text-orange-600" />{" "}
              Townhouse
            </span>
            <span className="flex gap-2 text-slate-800 font-medium text-[15px] items-center">
              <TbBuildingMosque className="w-[22px] h-[22px] text-orange-600" />{" "}
              Penthouse
            </span>
            <span className="flex gap-2 text-slate-800 font-medium text-[15px] items-center">
              <PiBuildingOfficeThin className="w-[22px] h-[22px] text-orange-600" />{" "}
              Duplex
            </span>
          </div>
        </div>
      </div>
      <div className="bg-header-img md:block hidden" />
    </section>
  );
}

////  https://dubai.wpresidence.net/wp-content/uploads/2023/05/80532.webp);

/// https://dubai.wpresidence.net/wp-content/uploads/revslider/craftsman/slider-bg.png

//https://dubai.wpresidence.net/wp-content/uploads/2023/04/dubai-bg-pattern-dark.png

////  https://dubai.wpresidence.net/wp-content/uploads/2023/05/header-e1683715581611.webp);
