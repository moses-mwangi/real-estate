import Image from "next/image";
import React from "react";
import agent from "../../public/dubai/agent 2.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneCall } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";

export default function Form() {
  return (
    <div className="bg-card p-8">
      <div className="flex gap-3 items-center mb-2">
        <Image
          src={agent}
          alt="agent"
          // width={100}
          // height={100}
          className=" w-20 h-20 rounded-lg"
        />
        <div>
          <p className=" font-semibold text-[17px]">Maria Barlow</p>
          <p className=" text-[15px] text-orange-600">sales executive</p>
        </div>
      </div>
      <Card className="w-full text-sm rounded-md text-slate-50  flex justify-start py-1 px-3 bg-cyan-600 hover:bg-cyan-700">
        Schedule a showing?
      </Card>
      <div className=" mt-4">
        <form className=" flex flex-col gap-3">
          {/* <Input placeholder="Day" />
          <Input placeholder="Time" /> */}
          <Input className=" text-[13px]" placeholder="Your Name" />
          <Input className=" text-[13px]" placeholder="Your Email" />
          <Input className=" text-[13px]" placeholder="Your Phone" />

          <Textarea
            className=" text-[13px]"
            placeholder="I'm interested in [ Luxury 6 Bed Mansion in Palm Jumeira ]"
          />
        </form>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <Button className="w-full bg-orange-600 hover:bg-orange-500">
          Send Email
        </Button>
        <div className="flex justify-between gap-3">
          <Button className="w-full flex items-center bg-orange-600 hover:bg-orange-500">
            <PhoneCall className=" w-4 h-4 mr-2" /> Call
          </Button>
          <Button className="w-full flex items-center bg-orange-600 hover:bg-orange-500">
            <BsWhatsapp className="w-4 h-4 mr-2" /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
