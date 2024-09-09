"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import React, { useState } from "react";
import useUser from "../user/useUser";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";
import axios from "axios";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

interface ContactFormValues {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  mobile: string;
  message: string;
}

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const { curUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    if (!curUser) {
      toast.error("You have to logIn first to send email");
      return;
    }

    const formData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.mobile,
      message: data.message,
      agentEmail: "moses.me7662@gmail.com",
    };

    try {
      setIsLoading(true);
      await axios.post("http://127.0.0.1:3008/api/users/sendEmail", formData);

      reset();
      toast.success("Email sent successfully!");
      setIsLoading(false);
      reset();
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      setIsLoading(false);
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
    <div
      className="bg-team py-14 md:pl-32 flex justify-center md:grid md:grid-cols-2 items-center"
      id="contact"
    >
      <div className="flex flex-col gap-3 w-[80%]">
        <h1>CONTACT US</h1>
        <p
          className={`${cn(meriwether.variable)} text-3xl sm:text-4xl mb-4`}
          style={{ fontFamily: "var(--Merriweather)" }}
        >
          We’d love to hear from you
        </p>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                className={`text-gray-600 font-medium ${
                  errors.firstName ? "border-red-500" : ""
                }`}
                value={curUser?.name.split(" ").at(0)}
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-[13px]">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                className={`text-gray-600 font-medium ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                value={curUser?.name.split(" ").at(1)}
                placeholder="Last Name"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-[13px]">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                className={`text-gray-600 font-medium ${
                  errors.country ? "border-red-500" : ""
                }`}
                placeholder="Country"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <p className="text-red-500 text-[13px]">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div>
              <Input
                className={`text-gray-600 font-medium ${
                  errors.city ? "border-red-500" : ""
                }`}
                placeholder="City"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <p className="text-red-500 text-[13px]">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <Input
                className={`text-gray-600 font-medium ${
                  errors.email ? "border-red-500" : ""
                }`}
                defaultValue={curUser?.email}
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-[13px]">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                className={`text-gray-600 font-medium ${
                  errors.mobile ? "border-red-500" : ""
                }`}
                placeholder="Mobile"
                {...register("mobile", { required: "Mobile is required" })}
              />
              {errors.mobile && (
                <p className="text-red-500 text-[13px]">
                  {errors.mobile.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Textarea
              className={`text-gray-600 font-medium ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="Message"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500 text-[13px]">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
          >
            {isLoading === false ? "Send Email" : loader}
          </Button>
        </form>
      </div>
      <div className=" hidden md:block bg-contact h-svh rounded-l-md" />
    </div>
  );
}
