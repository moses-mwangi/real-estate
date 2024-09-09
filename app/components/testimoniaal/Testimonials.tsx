"use client";

import first from "../../../public/images/customer 1.png";
import second from "../../../public/images/customer 2.png";
import third from "../../../public/images/customer 4.png";
import fourth from "../../../public/images/customer 3.png";

import pa from "../../../public/dubai/im 1.png";
import pb from "../../../public/dubai/im 2.png";
import pc from "../../../public/dubai/im 3.png";
import pd from "../../../public/dubai/im 4.png";
import pe from "../../../public/dubai/im 5.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
  display: "swap",
});

const comp = [
  { im: pa, id: 1 },
  { im: pb, id: 2 },
  { im: pc, id: 3 },
  { im: pd, id: 4 },
  { im: pe, id: 5 },
];

const TestimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: first,
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: second,
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: third,
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: fourth,
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-test pt-12">
      <div className="container">
        <div className=" flex flex-col gap-2 text-center mb-10 max-w-[600px] mx-auto">
          <p className="text-sm text-primary text-orange-600">
            What our customers are saying
          </p>
          <h1
            className={`${cn(meriwether.variable)} text-3xl font-bold`}
            style={{ fontFamily: "var(--Merriweather)" }}
          >
            Testimonials
          </h1>
          <p className="text-xs text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>

        <div>
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div
                  key={data.id}
                  className="flex flex-col bg-white gap-4 shadow-lg py-6 px-8  sm:mx-4 rounded-xl bg-primary/5 relative"
                >
                  <div className="mb-4">
                    <Image
                      src={data.img}
                      alt="images"
                      className="rounded-full w-20 h-20"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-light">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">
                    ,,
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="mt-24">
        <div className="bg-project flex  justify-center">
          <h1
            className={`${cn(
              meriwether.variable
            )} pt-40 text-6xl text-slate-50 font-medium`}
            style={{ fontFamily: "var(--Merriweather)" }}
          >
            Popular Dubai Projects
          </h1>
        </div>
        <div className="flex justify-between bg-slate-900 px-[8px] md:px-12">
          {comp.map((el) => (
            <Image key={el.id} src={el.im} alt="logo" width={120} height={50} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
