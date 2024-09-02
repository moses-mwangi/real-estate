"use client";

import Image from "next/image";
import React from "react";
import agent from "../../public/dubai/agent 2.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneCall } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import useUser from "../components/user/useUser";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import PhoneNumber from "./PhoneCall";
import useProperty from "../components/properties/useProperty";
import { useParams } from "next/navigation";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Form() {
  const { id } = useParams();

  const { curUser } = useUser();
  const { properties } = useProperty();
  const property = properties.find((el) => el._id === id);

  const user = property?.userId.map((el) => el.photo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

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

      reset();
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
    }
  };

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
      <div className="mt-4">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="text-[13px]"
            defaultValue={curUser?.name || ""}
            placeholder={errors.name ? "Name is required" : "Your Name"}
            {...register("name", { required: true })}
          />
          <Input
            className="text-[13px]"
            defaultValue={curUser?.email || ""}
            placeholder={errors.email ? "Email is required" : "Your Email"}
            {...register("email", { required: true })}
          />
          <Input
            className="text-[13px]"
            placeholder={errors.phone ? "Phone is required" : "Your Phone"}
            {...register("phone", { required: true })}
          />
          <Textarea
            className="text-[13px]"
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
      <div className="mt-5 flex flex-col gap-4">
        <div className="grid grid-cols-2 justify-between gap-3">
          <PhoneNumber />
          <Button className="w-full flex items-center bg-orange-600 hover:bg-orange-500">
            <BsWhatsapp className="w-4 h-4 mr-2" /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
