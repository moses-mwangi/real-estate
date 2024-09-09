"use client";

import Image from "next/image";
import React, { useState } from "react";
import agent from "../../public/dubai/agent 2.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "../components/user/useUser";
import toast from "react-hot-toast";
import useProperty from "../components/properties/useProperty";
import { useParams } from "next/navigation";
import axios from "axios";

import PhoneNumber from "./PhoneCall";
import WhatsUpPage from "./WhatsUpPage";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
  agentEmail: string;
}

export default function Form() {
  const { id } = useParams();

  const { curUser } = useUser();
  const { properties } = useProperty();
  const property = properties.find((el) => el._id === id);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.message ||
      !data.agentEmail
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (!curUser) {
      toast.error("You have to logIn first to send email");
      return;
    }

    try {
      setIsLoading(true);

      await axios.post(
        "https://real-estate-api-azure.vercel.app/api/users/sendEmail",
        data
      );

      toast.success("Email sent successfully!");
      reset();

      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      setIsLoading(false);
      console.error("ERROR:", error);
    }
  };

  const loader = (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

  return (
    <div className="bg-card p-8">
      {property?.userId.map((el) => (
        <div key={el.photo} className="flex gap-3 items-center mb-2">
          <Image
            src={el.photo ? el.photo : agent}
            alt="agent"
            className=" w-28 h-auto rounded-lg"
            width={150}
            height={80}
          />
          <div>
            <p className="font-semibold text-[17px]">{el.name}</p>
            <p className="text-[15px] text-orange-600">Sales Executive</p>
          </div>
        </div>
      ))}
      <Card className="w-full text-sm rounded-md text-slate-50 flex justify-start py-1 px-3 bg-cyan-600 hover:bg-cyan-700">
        Schedule a showing?
      </Card>
      {property?.userId.map((el) => (
        <div key={el.email}>
          <div className="mt-4">
            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-1 gap-3">
                <Input
                  type="text"
                  className="text-[13px]"
                  value={curUser?.name || ""}
                  placeholder={errors.name ? "Name is required" : "Your Name"}
                  {...register("name", { required: true })}
                />
                <Input
                  type="text"
                  className="text-[13px]"
                  value={curUser?.email || ""}
                  placeholder={
                    errors.email ? "Email is required" : "Your Email"
                  }
                  {...register("email", { required: true })}
                />
                <Input
                  className="text-[13px]"
                  type="hidden"
                  defaultValue={el.email}
                  placeholder={
                    errors.agentEmail
                      ? "agentEmail is required"
                      : "Your agentEmail"
                  }
                  {...register("agentEmail", { required: true })}
                />
                <Input
                  className="text-[13px]"
                  placeholder={
                    errors.phone ? "Phone is required" : "Your Phone"
                  }
                  {...register("phone", { required: true })}
                />
              </div>
              <Textarea
                className="text-[13px] h-28"
                placeholder="I'm interested in [Luxury 6 Bed Mansion in Palm Jumeira]"
                {...register("message", { required: true })}
              />
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:text-orange-600 hover:bg-red-100 transition-all duration-150"
              >
                {isLoading === false ? "Send Email" : loader}
              </Button>
            </form>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            <div className="grid grid-cols-2 justify-between gap-3">
              <div className=" cursor-pointer">
                <PhoneNumber el={el} />
              </div>
              <div>
                <WhatsUpPage el={el} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
