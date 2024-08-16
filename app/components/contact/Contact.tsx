"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";
import useUser from "../user/useUser";
import toast from "react-hot-toast";
import emailjs from "emailjs-com";

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
  const { curUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    const serviceId = "service_qmydrmg";
    const templateId = "template_hkpilep";
    const publicKey = "my4sRMVXuyAu-Oamg";

    try {
      if (curUser) {
        const templateParams = {
          firstName: data.firstName,
          lastName: data.lastName,
          country: data.country,
          city: data.city,
          email: data.email,
          mobile: data.mobile,
          message: data.message,
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);

        toast.success("Email sent successfully!");
      } else {
        toast.error("You need to log in to send an email.");
      }
      reset();
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="bg-team py-14 pl-32 grid grid-cols-2 items-center">
      <div className="flex flex-col gap-3 w-[80%]">
        <h1>CONTACT US</h1>
        <p
          className={`${cn(meriwether.variable)} text-4xl mb-4`}
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
                defaultValue={curUser?.name.split(",").at(0)}
                placeholder="First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                className={`text-gray-600 font-medium ${
                  errors.lastName ? "border-red-500" : ""
                }`}
                defaultValue={curUser?.name.split(",").at(1)}
                placeholder="Last Name"
                {...register("lastName", { required: "Last Name is required" })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
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
                <p className="text-red-500 text-sm">{errors.country.message}</p>
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
                <p className="text-red-500 text-sm">{errors.city.message}</p>
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
                <p className="text-red-500 text-sm">{errors.email.message}</p>
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
                <p className="text-red-500 text-sm">{errors.mobile.message}</p>
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
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200"
          >
            Send Email
          </Button>
        </form>
      </div>
      <div className="bg-contact h-svh rounded-l-md" />
    </div>
  );
}
