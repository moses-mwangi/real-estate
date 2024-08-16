"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";

import agent from "../../../public/dubai/agent 2.png";

import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import useUser from "../user/useUser";
import { X } from "lucide-react";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Email() {
  const { curUser } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const serviceId = "service_qmydrmg";
    const templateId = "template_hkpilep";
    const publicKey = "my4sRMVXuyAu-Oamg";

    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      toast.success("Email sent successfully!");
      reset(); // Reset the form after successful submission
      setIsModalOpen(false); // Close the modal after success
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    }
  };

  const handleSendEmail = handleSubmit((data) => {
    if (!data.name || !data.email || !data.phone || !data.message) {
      toast.error("All fields are required!");
      return;
    }
    onSubmit(data); // Send email if all fields are filled
  });

  return (
    <div>
      <Card
        className="hover:bg-orange-500 hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center"
        onClick={() => setIsModalOpen(true)}
      >
        <MdOutlineEmail className="w-[15px] h-[15px] mr-1" /> Email
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[1px] bg-black/55">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3 items-center">
                <Image
                  src={agent}
                  alt="agent"
                  className="w-[87px] h-20 rounded-lg"
                />
                <div>
                  <p className="font-semibold text-[17px]">Maria Barlow</p>
                  <p className="text-[15px] text-orange-600">Sales Executive</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>

            <Card className="w-full text-sm rounded-md text-slate-50 flex justify-start py-1 px-3 bg-cyan-600 hover:bg-cyan-700">
              Schedule a showing?
            </Card>

            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={handleSendEmail}
            >
              <div className="grid grid-cols-3 gap-3">
                <Input
                  className="text-[13px]"
                  defaultValue={curUser?.name || ""}
                  placeholder={errors.name ? "Name is required" : "Your Name"}
                  {...register("name", { required: true })}
                />
                <Input
                  className="text-[13px]"
                  defaultValue={curUser?.email || ""}
                  placeholder={
                    errors.email ? "Email is required" : "Your Email"
                  }
                  {...register("email", { required: true })}
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
                className="text-[13px] h-40"
                placeholder="I'm interested in [Luxury 6 Bed Mansion in Palm Jumeira]"
                {...register("message", { required: true })}
              />
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-500"
              >
                Send Email
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
