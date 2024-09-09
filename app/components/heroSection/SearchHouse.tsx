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
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Apartment"
                    >
                      Apartment
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Penthouse"
                    >
                      Penthouse
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Mansion"
                    >
                      Mansion
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Villa"
                    >
                      Villa
                    </SelectItem>
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
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="1"
                    >
                      1
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="2"
                    >
                      2
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="3"
                    >
                      3
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="4"
                    >
                      4
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="5"
                    >
                      5
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="6"
                    >
                      6
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="7"
                    >
                      7
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="8"
                    >
                      8
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="9"
                    >
                      9
                    </SelectItem>
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
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="1"
                    >
                      1
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="2"
                    >
                      2
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="3"
                    >
                      3
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="4"
                    >
                      4
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="5"
                    >
                      5
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="6"
                    >
                      6
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="7"
                    >
                      7
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="8"
                    >
                      8
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="9"
                    >
                      9
                    </SelectItem>
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
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="1600000"
                    >
                      $0 - $1600000
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="2000000"
                    >
                      $0 - $2000000
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="3500000"
                    >
                      $0 - $3500000
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="5000000"
                    >
                      $0 - $5000000
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="6000000"
                    >
                      $0 - $6000000
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="8000000"
                    >
                      $0 - $8000000
                    </SelectItem>
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
