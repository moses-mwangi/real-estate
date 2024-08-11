import React from "react";
import imone from "../../public/assets/pro 1.png";
import imtwo from "../../public/assets/pro 2.png";
import imthree from "../../public/assets/pro 3.png";
import imfour from "../../public/assets/pro 4.png";
import imfive from "../../public/assets/pro 5.png";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { BathIcon, Bed, Calendar, Car, LocateIcon, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BiArea } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const Map = dynamic(() => import("./Map"), {
  ssr: false, // Disable SSR for this component
});

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

const property = {
  _id: 1,
  image: [imone, imtwo, imthree, imfour, imfive],
  descrption:
    "Beautiful, updated, ground level Co-op apartment in the desirable Bay Terrace neighborhood.This home features hardwood floors throughout, brand new bathrooms, newer EIK, modern front-load washer/dryer, full dining room, large living area, 3 spacious bedrooms and plenty of storage. Master bedroom includes both a standard closet and custom closet wall unit. Large windows face many directions for tons of natural light.",
  bathrooms: 4,
  bedrooms: 6,
  Garages: 2,
  area: 29000,
  createdAt: new Date(),
};

export default function SingleProperty() {
  const house = {
    latitude: 51.505,
    longitude: -0.09,
    address: "221B Baker Street, London",
  };

  return (
    <div className="bg-id pt-20">
      <div>
        <div className="grid h-svh grid-cols-2 gap-[1px]">
          <Image
            className=" w-full h-full"
            src={property.image[0]}
            alt="mm"
            width={600}
            height={200}
          />
          <div className="grid grid-cols-2 gap-[1px]">
            <Image
              className=" w-full h-full"
              src={property.image[1]}
              alt="mm"
              width={500}
              height={200}
            />
            <Image
              className=" w-full h-full"
              src={property.image[2]}
              alt="mm"
              width={500}
              height={200}
            />
            <Image
              className=" w-full h-full"
              src={property.image[3]}
              alt="mm"
              width={500}
              height={200}
            />
            <Image
              className=" w-full h-full"
              src={property.image[4]}
              alt="mm"
              width={500}
              height={200}
            />
          </div>
        </div>
        <div className=" px-8 py-10">
          <div className=" flex justify-between items-center">
            <div>
              <span className=" flex gap-5 mb-3">
                <p className="bg-orange-600 py-[2px] px-2 rounded-sm text-slate-50 text-sm">
                  Sales
                </p>
                <p className="bg-orange-600 py-[2px] px-2 rounded-sm text-slate-50 text-sm">
                  Whole Building
                </p>
              </span>
              <p
                className={`${cn(meriwether.variable)} text-3xl`}
                style={{ fontFamily: "var(--Merriweather)" }}
              >
                Stunning Mansion In The Heart Of Dubai
              </p>
              <div className=" flex gap-2 mt-2 items-center">
                <MapPin className=" w-4 h-4 text-slate-500" />
                <p className=" text-slate-600 text-[15px]">
                  Dubai, Al Reem Island
                </p>
              </div>
            </div>
            <div>
              <span>
                <p className=" text-orange-500 text-2xl font-semibold">
                  AED 1,500,000
                </p>
              </span>
            </div>
          </div>
          <div className=" grid grid-cols-[1.6fr_1fr] gap-9 mt-12">
            <div className="flex flex-col gap-8">
              <Card className="w-full flex justify-between h-36 rounded-md border-none px-8 pt-14">
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <IoIosBed className=" w-6 h-6" />
                  <h1 className=" text-[15px]">{property.bedrooms} bedrooms</h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <BathIcon className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    {property.bathrooms} Bathrooms
                  </h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <FaCar className=" w-6 h-6" />
                  <h1 className=" text-[15px]">{property.Garages} Garages</h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <BiArea className=" w-6 h-6" />
                  <h1 className=" text-[15px]">{property.area} ft</h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <Calendar className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    Year Built:{property.createdAt.toLocaleDateString()}
                  </h1>
                </div>
              </Card>
              <Card className=" border-none w-full py-6 px-7 rounded-md">
                <h1 className=" font-semibold">Description</h1>
                <p className=" text-slate-600 text-sm mt-3">
                  {property.descrption}
                </p>
              </Card>
              <div className=" bg-card w-full h-36 rounded-md"></div>
            </div>
            <div className=" bg-red-500">mosess</div>
          </div>
        </div>
      </div>
      <Map
        latitude={house.latitude}
        longitude={house.longitude}
        address={house.address}
      />
      <div className="flex gap-5 px-8 py-8 mb-10">
        <Button className="bg-orange-600">Book a visit now</Button>
        <Button className="bg-orange-600">Return Back</Button>
      </div>
    </div>
  );
}
