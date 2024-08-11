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

export default function SearchHouse() {
  const { handleSubmit, setValue, reset } = useForm();

  function onSubmit(data: any) {
    console.log("Form Data:", data);
  }

  // Handle the change event for Select components
  const handleSelectChange = (name: string, value: string) => {
    setValue(name, value);
  };

  return (
    <div>
      <Card className="w-full h-auto py-7">
        <form
          className="h-full px-7 flex flex-col gap-4 justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
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
                      value="Full Floor"
                    >
                      Full Floor
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Compound"
                    >
                      Compound
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
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Separator />
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            <div>
              <Select
                onValueChange={(value) => handleSelectChange("city", value)}
              >
                <SelectTrigger className="w-full border-none text-[13px] text-slate-500">
                  <SelectValue placeholder="Property City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel className="text-[13px] text-slate-500">
                      Property City
                    </SelectLabel>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="Dubai"
                    >
                      Dubai
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                      value="500"
                    >
                      $0 - $500
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="1000"
                    >
                      $0 - $1000
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="1500"
                    >
                      $0 - $1500
                    </SelectItem>
                    <SelectItem
                      className="text-[13px] text-slate-500"
                      value="2500"
                    >
                      $0 - $2500
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
