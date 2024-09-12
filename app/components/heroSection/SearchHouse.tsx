"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import useSearchProperty from "./useSearchProperty";
import { Input } from "@/components/ui/input";

const price = [
  { from: 0, to: 10000000 },
  { from: 10, to: 20000000 },
  { from: 20, to: 30000000 },
  { from: 30, to: 40000000 },
  { from: 40, to: 50000000 },
  { from: 50, to: 60000000 },
  { from: 60, to: 70000000 },
  { from: 70, to: 80000000 },
  { from: 80, to: 90000000 },
  { from: 90, to: 100000000 },
  { from: 100, to: 110000000 },
  { from: 110, to: 120000000 },
  { from: 120, to: 130000000 },
  { from: 130, to: 140000000 },
];

const bedrooms = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
  { label: 8, value: 8 },
  { label: 9, value: 9 },
  { label: 10, value: 10 },
];

const bathrooms = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
  { label: 8, value: 8 },
  { label: 9, value: 9 },
  { label: 10, value: 10 },
];

const category = [
  { id: 1, type: "Apartment" },
  { id: 2, type: "Penthouse" },
  { id: 3, type: "Mansion" },
  { id: 4, type: "Villa" },
];

export default function SearchHouse() {
  const { onSubmit } = useSearchProperty();
  const { register, handleSubmit, setValue } = useForm();

  const handleSelectChange = (name: string, value: string) => {
    setValue(name, value);
  };

  return (
    <div className="rounded-md relative">
      <Button className="bg-orange-500 hover:bg-orange-600 w-36 py-1  absolute left-[1px] -top-10 rounded-t-md rounded-b-none">
        SALES
      </Button>
      <Card className="md:w-full w-[90svw] rounded-tl-none h-auto py-7">
        <form
          className="h-full px-7 flex flex-col gap-4 justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <Select
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="w-full border-none text-[13px] text-slate-500">
                  <SelectValue placeholder="Property Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[13px] text-slate-500">
                      Property Category
                    </SelectLabel>
                    {category.map((el) => (
                      <div key={el.id}>
                        <SelectItem
                          className="text-[13px] text-slate-500"
                          value={el.type}
                        >
                          {el.type}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Separator />
            </div>

            <div>
              <Select
                onValueChange={(value) => handleSelectChange("bedrooms", value)}
              >
                <SelectTrigger className="w-full border-none text-[13px] text-slate-500">
                  <SelectValue placeholder="Property Bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[13px] text-slate-500">
                      Property Bedrooms
                    </SelectLabel>

                    {bedrooms?.map((el) => (
                      <div key={el.label}>
                        <SelectItem
                          className="text-[13px] text-slate-500"
                          value={el.value.toString()}
                        >
                          {el.value}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Separator />
            </div>

            <div>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("bathrooms", value)
                }
              >
                <SelectTrigger className="w-full border-none text-[13px] text-slate-500">
                  <SelectValue placeholder="Bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[13px] text-slate-500">
                      Bathrooms
                    </SelectLabel>

                    {bathrooms?.map((el) => (
                      <div key={el.label}>
                        <SelectItem
                          className="text-[13px] text-slate-500"
                          value={el.value.toString()}
                        >
                          {el.value}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Separator />
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div>
              <Input
                placeholder="Enter City,Country or Area"
                {...register("city")}
                className="w-full border-none text-[13px] text-slate-500"
              />
              <Separator />
            </div>

            <div>
              <Select
                onValueChange={(value) => handleSelectChange("price", value)}
              >
                <SelectTrigger className="w-full border-none text-[13px] text-slate-500">
                  <SelectValue placeholder="Property Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[13px] text-slate-500">
                      Property Price
                    </SelectLabel>
                    {price?.map((el) => (
                      <div key={el.from}>
                        <SelectItem
                          className="text-[13px] text-slate-500"
                          value={el.to.toString()}
                        >
                          ksh {el.from}m - ksh {el.to.toLocaleString()}
                        </SelectItem>
                      </div>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Separator />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600"
              >
                <Search className="w-4 h-4 mr-2" /> Search
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
