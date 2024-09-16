"use client";
import React from "react";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { BathIcon, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BiArea } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Form from "./Form";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import BookingTour from "./BookingTour";
import useProperty from "../components/properties/useProperty";
import { GiSpookyHouse } from "react-icons/gi";
import AllImagePreview from "./AllImagePreview";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

export default function SingleProperty() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const posi = [Number(lat), Number(lng)];
  const { id } = useParams();
  const { properties } = useProperty();
  const property = properties.find((el) => el._id === id);

  return (
    <div className="bg-id pt-20">
      <div>
        <div className="grid h-svh grid-cols-1 sm:grid-cols-2 gap-[1px]">
          <div className=" hidden sm:block ">
            {property?.image[0] && (
              <Image
                className=" w-full h-full"
                src={property.image[0]}
                alt="mm"
                width={600}
                height={200}
              />
            )}
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-[1px]">
            {property?.image[1] && (
              <Image
                className=" w-full h-full"
                src={property.image[1]}
                alt="mm"
                width={500}
                height={200}
              />
            )}
            {property?.image[2] && (
              <Image
                className=" w-full h-full"
                src={property.image[2]}
                alt="mm"
                width={500}
                height={200}
              />
            )}
            {property?.image[3] && (
              <Image
                className=" w-full h-full"
                src={property.image[3]}
                alt="mm"
                width={500}
                height={200}
              />
            )}
            {property?.image[4] && (
              <Image
                className="w-full h-full"
                src={property.image[4]}
                alt="logoo"
                width={500}
                height={200}
              />
            )}
          </div>
        </div>
        <AllImagePreview image={property?.image} />
        <div className="px-3 sm:px-8 py-10">
          <div className="flex sm:gap-0 gap-3 sm:justify-between sm:flex-row flex-col sm:items-center">
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
                className={`${cn(
                  meriwether.variable
                )} leading-normal text-[29px] sm:text-3xl`}
                style={{ fontFamily: "var(--Merriweather)" }}
              >
                {property?.description.substring(0, 28)}...
              </p>
              <div className=" flex gap-2 mt-2 items-center">
                <MapPin className=" w-4 h-4 text-slate-500" />
                <p className=" text-slate-600 text-[15px]">
                  Kenya {property?.address}
                </p>
              </div>
            </div>
            <div>
              <span>
                <p className=" text-orange-500 text-2xl font-semibold">
                  Ksh {property?.price.toLocaleString()}
                </p>
              </span>
            </div>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-[2.2fr_1fr] gap-7 mt-12">
            <div className="flex flex-col  gap-6">
              <Card className="w-full h-auto flex flex-col gap-4 sm:gap-0 sm:flex-row sm:justify-between  rounded-md border-none px-7 sm:px-8 py-8 sm:pt-14">
                <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 items-center text-gray-700">
                  <IoIosBed className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    {property?.bedrooms} bedrooms
                  </h1>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 items-center text-gray-700">
                  <BathIcon className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    {property?.bathrooms} Bathrooms
                  </h1>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 items-center text-gray-700">
                  <FaCar className=" w-6 h-6" />
                  <h1 className=" text-[15px]">{property?.garages} Garages</h1>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 items-center text-gray-700">
                  <BiArea className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    {property?.size ? property?.size.toLocaleString() : 5000} ft
                  </h1>
                </div>
                <div className="flex flex-row sm:flex-col gap-4 sm:gap-1 items-center text-gray-700">
                  <GiSpookyHouse className=" w-7 h-7" />
                  <h1 className="text-[15px]">Type: {property?.type}</h1>
                </div>
              </Card>

              <Card className="border-none w-full py-6 px-7 rounded-md">
                <h1 className=" font-semibold">Description</h1>
                <p className=" text-gray-600 text-[14px] mt-3">
                  {property?.description}
                </p>
              </Card>

              <Card className="border-none w-full py-6 px-7 rounded-md">
                <h1 className=" font-semibold mb-3">Address</h1>
                <div className="grid grid-cols-1 text-[15px] gap-2">
                  <div className="flex gap-2 items-center">
                    <p className="font-medium text-gray-800">Address:</p>
                    <p className=" font-normal text-gray-600">
                      {property?.address}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-medium text-gray-800">City:</p>
                    <p className="font-normal  text-gray-600">
                      {property?.city}
                    </p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <p className="font-medium text-gray-800">Zip:</p>
                    <p className="font-normal  text-gray-600">
                      {property?.zip}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-medium text-gray-800">Country:</p>
                    <p className="font-normal  text-gray-600">Kenya</p>
                  </div>
                </div>
              </Card>
            </div>
            <Form />
          </div>
        </div>
      </div>
      <Map
        address={String(property?.address)}
        location={posi || [25.112, 55.139]}
        image={property?.image}
      />
      <div className="flex gap-5 px-3 sm:px-8 py-8 mb-10">
        {/* <BookingTour /> */}
        <Button
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => {
            router.back();
          }}
        >
          Return Back
        </Button>
      </div>
    </div>
  );
}
