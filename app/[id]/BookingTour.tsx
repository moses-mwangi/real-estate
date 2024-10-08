"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import useUser from "../components/user/useUser";

type FormValues = {
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  property: string;
};

export default function BookingTour() {
  const [cursor, setCursor] = useState(false);

  const [date, setDate] = React.useState<Date>();
  const { register, handleSubmit, setValue, reset } = useForm<FormValues>();
  const { curUser } = useUser();
  const { id } = useParams();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await axios.post(
        "https://real-estate-api-azure.vercel.app/api/tours",
        data
      );

      toast.success("You have succefully booked");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to make Booking:Try again");
    }
    reset();
  };

  const timeOptions = Array.from({ length: 13 }, (_, i) => {
    const hour = 7 + Math.floor(i / 3);
    const minute = (i % 3) * 20;
    const time = new Date(0, 0, 0, hour, minute).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return time;
  });

  return (
    <>
      <Button
        className={`${
          cursor === false ? " cursor-not-allowed opacity-50" : ""
        }   bg-orange-500  hover:bg-orange-600`}
      >
        Book a visit now
      </Button>
      <div className="hidden">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className={`${
                cursor === false ? " cursor-not-allowed opacity-50" : ""
              }   bg-orange-500  hover:bg-orange-600`}
              // disabled={cursor === false ? true : false}
            >
              Book a visit now
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="">
                Make a booking for a house tour
              </AlertDialogTitle>
              <AlertDialogDescription></AlertDialogDescription>
              <div className="mt-4">
                <form
                  className="flex flex-col gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full text-gray-600 flex justify-between items-center text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="mr-2 h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          setValue("date", selectedDate as Date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Select onValueChange={(value) => setValue("time", value)}>
                    <SelectTrigger className="w-full text-[13px] text-slate-500">
                      <SelectValue placeholder="Choose Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {timeOptions.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <Input
                    className="text-[13px]"
                    placeholder="Your Name"
                    defaultValue={curUser?.name}
                    {...register("name")}
                  />
                  <Input
                    type="hidden"
                    defaultValue={id}
                    {...register("property")}
                  />
                  <Input
                    className="text-[13px]"
                    placeholder="Your Email"
                    defaultValue={curUser?.email}
                    {...register("email")}
                  />
                  <Input
                    className="text-[13px]"
                    placeholder="Your Phone"
                    {...register("phone")}
                  />

                  <Textarea
                    className="text-[13px]"
                    placeholder="I'm interested in [ Luxury 6 Bed Mansion in Palm Jumeira ]"
                    {...register("message")}
                  />
                  <div className="flex justify-end gap-4 mt-6">
                    <AlertDialogCancel className="w-full text-slate-50 hover:text-slate-50 font-medium bg-orange-600 hover:bg-orange-500">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-500"
                    >
                      Continue
                    </AlertDialogAction>
                  </div>
                </form>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
