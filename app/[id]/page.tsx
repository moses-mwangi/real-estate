"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";
import { BathIcon, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BiArea } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Form from "./Form";
import axios from "axios";
import { useParams } from "next/navigation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

interface Property {
  _id: string;
  image: (string | StaticImport)[];
  description: string;
  about: string;
  type: string;
  bathrooms: number;
  bedrooms: number;
  garages: number;
  createdAt: Date;
  price: number;
  city: string;
  zipcode: number;
  address: string;
  position: number[];
}

export default function SingleProperty() {
  const house = {
    latitude: 51.505,
    longitude: -0.09,
    address: "221B Baker Street, London",
  };

  const [property, setProperties] = useState<Property>();
  const { id } = useParams();

  useEffect(() => {
    async function fetchAgents() {
      const propety = await axios.get(
        `http://127.0.0.1:3008/api/property/${id}`
      );
      setProperties(propety.data.data);
    }

    fetchAgents();
  });

  return (
    <div className="bg-id pt-20">
      <div>
        <div className="grid h-svh grid-cols-2 gap-[1px]">
          <Image
            className=" w-full h-full"
            src={property?.image[0]!}
            alt="mm"
            width={600}
            height={200}
          />
          <div className="grid grid-cols-2 gap-[1px]">
            <Image
              className=" w-full h-full"
              src={property?.image[1]!}
              alt="mm"
              width={500}
              height={200}
            />
            <Image
              className=" w-full h-full"
              src={property?.image[2]!}
              alt="mm"
              width={500}
              height={200}
            />
            <Image
              className=" w-full h-full"
              src={property?.image[3]!}
              alt="mm"
              width={500}
              height={200}
            />
            <Image
              className=" w-full h-full"
              src={property?.image[4]!}
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
                {property?.about}
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
                  AED {property?.price.toLocaleString()}
                </p>
              </span>
            </div>
          </div>
          <div className=" grid grid-cols-[2.2fr_1fr] gap-7 mt-12">
            <div className="flex flex-col gap-6">
              <Card className="w-full flex justify-between h-36 rounded-md border-none px-8 pt-14">
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <IoIosBed className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    {property?.bedrooms} bedrooms
                  </h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <BathIcon className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    {property?.bathrooms} Bathrooms
                  </h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <FaCar className=" w-6 h-6" />
                  <h1 className=" text-[15px]">{property?.garages} Garages</h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <BiArea className=" w-6 h-6" />
                  <h1 className=" text-[15px]">2657 ft</h1>
                </div>
                <div className="flex flex-col gap-1 items-center text-gray-700">
                  <Calendar className=" w-6 h-6" />
                  <h1 className=" text-[15px]">
                    Year Built:
                    {property?.createdAt &&
                      new Date(property.createdAt).getFullYear()}
                  </h1>
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
                      {property?.zipcode}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="font-medium text-gray-800">Country:</p>
                    <p className="font-normal  text-gray-600">
                      United Arab Emirates
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            <Form />
          </div>
        </div>
      </div>
      <Map address={String(property?.address)} location={property?.position} />
      <div className="flex gap-5 px-8 py-8 mb-10">
        <Button className="bg-orange-600 hover:bg-orange-700">
          Book a visit now
        </Button>
        <Button className="bg-orange-600 hover:bg-orange-700">
          Return Back
        </Button>
      </div>
    </div>
  );
}
