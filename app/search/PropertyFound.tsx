"use client";

import React, { Suspense, useState } from "react";
import { Heart, Plus } from "lucide-react";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoShareSocialSharp } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import PhoneNumber from "../components/properties/PhoneCall";
import Email from "../components/properties/Email";
import useProperty, { Property } from "../components/properties/useProperty";
import { Label } from "@/components/ui/label";
import SortProperty from "./SortProperty";
import WhatsUpPage from "../components/properties/WhatsUpPage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Select {
  filteredProperties: Property[];
  handlePreviousImage: (index: number, imageCount: number) => void;
  handleNextImage: (index: number, imageCount: number) => void;
  nextImageIndexes: number[];
}

export default function PropertyFound({
  filteredProperties,
  handlePreviousImage,
  handleNextImage,
  nextImageIndexes,
}: Select) {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4;

  const selectedProperties = filteredProperties?.length
    ? filteredProperties
    : [];

  const totalPages = Math.ceil(selectedProperties.length / propertiesPerPage);

  const params = searchParams.get("SortBy"); /// size,price,createdAt

  let sortedProperties = selectedProperties;

  if (params === "" || !params) sortedProperties = selectedProperties;

  if (params === "size")
    sortedProperties = selectedProperties.sort((a, b) => b.size - a.size);

  if (params === "price")
    sortedProperties = selectedProperties.sort((a, b) => b.price - a.price);

  if (params === "createdAt")
    sortedProperties = selectedProperties.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  // Get properties for the current page
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  // Handle pagination with checks for next and previous pages
  const handleNextPage = () => {
    if (currentPage < totalPages && paginatedProperties.length > 0) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalProperties = selectedProperties.length;

  return (
    <div className="flex flex-col gap-8">
      <Separator />
      <Suspense fallback={<p>Loading...</p>}>
        <SortProperty totalProperties={totalProperties} />
      </Suspense>
      {sortedProperties?.map((property, index) => (
        <div
          className="bg-card shadow-lg grid grid-cols-1 md:grid-cols-[1fr_2.3fr] items-center gap-5 rounded-md"
          key={property._id}
        >
          <div className="overflow-hidden h-full z-30 relative rounded-t-md cursor-zoom-out">
            {property.image[0] && (
              <Image
                className=" w-full h-full hover:scale-105 transition-all duration-200"
                src={
                  property._id
                    ? property.image[nextImageIndexes[index]] ||
                      property.image[0]
                    : property.image[0]
                }
                alt="house"
                width={200}
                height={200}
                loading="lazy" // Lazy loading for performance
              />
            )}
            <GrNext
              aria-label="Next image"
              onClick={() => handleNextImage(index, property.image.length)}
              className="w-10 h-10 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute right-1 top-1/2 transform -translate-y-1/2 z-50 text-slate-100"
            />
            <GrPrevious
              aria-label="Previous image"
              onClick={() => handlePreviousImage(index, property.image.length)}
              className="w-10 h-10 font-bold cursor-pointer hover:bg-card/20 rounded-full p-1 absolute left-1 top-1/2 transform -translate-y-1/2 z-50 text-slate-100"
            />
            <div className="rounded-sm px-[6px] py-[2px] absolute left-4 top-4 z-50 bg-cyan-600 text-[10px] text-slate-100">
              Featured
            </div>
            <div className="rounded-sm px-[6px] py-[2px] absolute right-4 top-4 z-50 bg-orange-400 text-[10px] text-slate-100">
              Sales
            </div>
            <div className="flex gap-2 items-center absolute bottom-3 left-3">
              <IoShareSocialSharp className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
              <Heart className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
              <Plus className=" w-5 h-5 hover:bg-slate-800 bg-slate-900/45 p-[2px] rounded-sm text-slate-50" />
            </div>
          </div>
          <div className="flex flex-col gap-3 px-4 cursor-pointer">
            <Link
              href={`/${property._id}?lat=${property.position.at(
                0
              )}&lng=${property.position.at(1)}`}
              className="flex flex-col gap-2"
            >
              <p className="text-[13px] text-slate-700">
                {property.type}, sales
              </p>
              <p className="font-semibold text-[16px] hover:text-orange-500 text-black/85">
                {property.description.substring(0, 30)}...
              </p>
              <p className=" font-medium text-orange-500">
                KSH {property.price.toLocaleString()}
              </p>
              <p className="text-[12px] text-slate-500">
                {property.description.substring(0, 200)}....
              </p>
            </Link>

            <div className=" pb-8">
              {property.userId.map((el) => (
                <div
                  className="flex sm:gap-10 items-center justify-between mt-2"
                  key={el.email}
                >
                  <PhoneNumber el={el} />
                  <Email el={el} />
                  <WhatsUpPage el={el} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center my-6">
        <p className=" hidden sm:block text-[16px]">{`SHOWING ${currentPage} PAGE of ${totalPages} PAGES`}</p>
        <p className="  sm:hidden text-[16px]">{`Results on page ${currentPage}`}</p>
        <div className="flex gap-4">
          <Label
            className={`py-[5px] text-[16px] px-3 cursor-pointer  hover:bg-orange-500 hover:text-card transition-all duration-200 rounded-sm ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrevPage}
          >
            Previous
          </Label>

          <Label
            className={`py-[5px] text-[16px] px-3 cursor-pointer hover:bg-orange-500 hover:text-card transition-all duration-200 rounded-sm ${
              currentPage === totalPages || paginatedProperties.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleNextPage}
          >
            Next
          </Label>
        </div>
      </div>
      <Separator />
    </div>
  );
}
