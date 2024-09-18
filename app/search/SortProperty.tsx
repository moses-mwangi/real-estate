"use client";

import { Card } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Sort {
  totalProperties: number;
}

const sorting = [
  { id: 1, label: "Price", name: "price" },
  { id: 2, label: "CreatedAt", name: "createdAt" },
  { id: 3, label: "Plot Size", name: "size" },
];

export default function SortProperty({ totalProperties }: Sort) {
  const [value, setValue] = useState("SortBy");
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSortChange = (name: string, label: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("SortBy", name);

    router.push(`?${params.toString()}`);

    setValue(label);
    setIsOpen(false);
  };

  return (
    <div className=" flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center">
      <div>
        <p className="text-gray-700 text-[17px] font-medium flex gap-1">
          Filtered Results:
          <span className=" font-normal text-[16px] text-gray-800">
            {totalProperties} Properties
          </span>
        </p>
      </div>
      <div className=" relative">
        <Card
          className="flex items-center justify-center h-11 w-52 cursor-pointer rounded-md"
          onClick={() => {
            setIsOpen((el) => !el);
          }}
        >
          <div className="flex justify-between items-center w-full px-3">
            <p className=" text-[15px] font-medium text-gray-700">{value}</p>
            <MdOutlineKeyboardArrowDown />
          </div>
        </Card>
        {isOpen && (
          <div className="absolute top-12 w-full z-50">
            <Card className=" shadow-lg rounded-md z-50 px-2 py-1">
              {sorting.map((el) => (
                <div
                  className=" hover:bg-slate-300 z-50 text-[15px] py-1 px-2 rounded-sm cursor-pointer transition-all duration-150"
                  key={el.id}
                  onClick={() => handleSortChange(el.name, el.label)}
                >
                  {el.label}
                </div>
              ))}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
