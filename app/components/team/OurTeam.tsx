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
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

const SocialLinks = () => (
  <div className="flex gap-3">
    <FaFacebook className="text-slate-500 w-4 h-4" />
    <Linkedin className="text-slate-500 w-4 h-4" />
    <BsTwitter className="text-slate-500 w-4 h-4" />
    <BsInstagram className="text-slate-500 w-4 h-4" />
    <MdEmail className="text-slate-500 w-4 h-4" />
    <PhoneCall className="text-slate-500 w-4 h-4" />
  </div>
);

export default function OurTeam() {
  const { agent } = useUser();

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-team py-14 px-1 sm:px-12" id="agents">
      <div>
        <h1 className="flex justify-center text-[16px]">OUR AGENTS</h1>
        <h1
          className={`${cn(
            meriwether.variable
          )} text-4xl flex justify-center mt-2 text-gray-800`}
          style={{ fontFamily: "var(--Merriweather)" }}
        >
          Meet Our Team
        </h1>
      </div>
      <div className="mt-12">
        <Slider {...settings}>
          {agent?.map((el) => (
            <div key={el._id} className="p-3">
              <div
                className="bg-card p-4 w-full h-full shadow-lg grid grid-rows-2 gap-5 rounded-md cursor-pointer transition-all hover:shadow-xl"
                style={{ height: "512px" }}
              >
                <div className="overflow-hidden rounded-md">
                  <Image
                    className="xl:w-full w-auto h-full rounded-md hover:scale-105 transition-all duration-300"
                    src={el.photo}
                    alt={el.name}
                    width={400}
                    height={300}
                  />
                </div>
                <div className="flex flex-col gap-3 px-2">
                  <div className="flex flex-col">
                    <p className="text-[18px] font-medium text-gray-800">
                      {el.name}
                    </p>
                    <p className="text-slate-500 text-sm">{el.role}</p>
                    <p className="text-[13px] text-slate-500 mt-3">
                      {/* {el.description} */}
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Consequuntur mollitia tempore eum ab voluptatum tenetur,
                      et voluptatibus porro
                    </p>
                  </div>
                  <div className="flex justify-between py-4 mt-2">
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
