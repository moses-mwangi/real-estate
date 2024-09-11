"use client";

import first from "../../../public/images/customer 1.png";
import second from "../../../public/images/customer 2.png";
import third from "../../../public/images/customer 3.png";
import fourth from "../../../public/images/customer 4.png";
import fifth from "../../../public/images/customer 5.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import PhoneNumber from "./PhoneCall";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
  display: "swap",
});

const TestimonialData = [
  {
    id: 1,
    name: "Lucy Nyambura",
    text: "BOMAS made my dream of owning a home a reality. The entire process was seamless, from browsing properties to finalizing the purchase. Their team was so professional and supportive, answering every question I had. I’m incredibly happy with my new home and would recommend BOMAS to anyone looking for a reliable property platform!",
    img: first,
  },
  {
    id: 2,
    name: "Emmanuel Kipkurui",
    text: "I was nervous about purchasing my first home, but Boma Synergy made everything so easy. Their platform is user-friendly, and I was able to explore a wide variety of houses until I found the perfect one for my family. The service was top-notch, and I felt supported at every stage. I’m beyond satisfied!",
    img: second,
  },
  {
    id: 3,
    name: "Ann Awinja",
    text: "Boma Synergy provided an exceptional home-buying experience. The team was responsive and transparent, making sure I understood each step of the process. It was reassuring to work with professionals who genuinely care about their clients. I’m thrilled with my new home and couldn’t have asked for a better partner in this journey.",
    img: third,
  },
  {
    id: 4,
    name: "Brian Wekesa",
    text: "Buying a house through BOMAS was one of the best decisions I’ve made. The platform is intuitive, and I was able to find exactly what I was looking for in no time. The customer service was outstanding, and they made the entire transaction smooth and stress-free. I’m proud to call my new place home!",

    img: fourth,
  },
  {
    id: 5,
    name: "John Kamau",
    text: "BOMAS delivered an amazing experience from start to finish. I was impressed by the variety of homes listed, and the support I received from their team was unparalleled. The process was quick, and I felt confident every step of the way. I love my new home and wouldn’t hesitate to recommend BOMAS to anyone in the market for a new house!",
    img: fifth,
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
            Our customers are at the heart of everything we do. Every home
            purchased through BOMAS is a step toward fulfilling a dream, and we
            are honored to be a part of that journey.
          </p>
        </div>

        <div>
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div
                  key={data.id}
                  className="flex flex-col h-80 bg-white gap-4 shadow-lg py-6 px-8  sm:mx-4 rounded-xl bg-primary/5 relative"
                >
                  <div className="mb-4">
                    <Image
                      src={data.img}
                      alt="images"
                      className="rounded-full w-[75px] h-[75px]"
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
        <div className="bg-project w-full">
          <div
            className={`${cn(
              meriwether.variable
            )}  text-slate-50 font-medium flex flex-col justify-center items-center gap-4  md:px-40`}
            style={{ fontFamily: "var(--Merriweather)" }}
          >
            <p className="flex text-[14px] sm:text-[16px] justify-center">
              Our Team is Just a Call away and Ready to Serve you!
            </p>
            <p className="flex flex-col items-center justify-center text-[20px] sm:text-4xl md:text-6xl">
              <span>Do you have a Question or need</span>
              <span className="">some information?</span>
            </p>

            <PhoneNumber />
          </div>
        </div>
        <div className=" grid grid-cols-5 bg-slate-900 h-11 py-8 md:px-12"></div>
      </div>
    </div>
  );
};

export default Testimonials;
