import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Merriweather } from "next/font/google";
import React from "react";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

export default function Contact() {
  return (
    <div className="bg-team py-14 pl-32 grid grid-cols-2 items-center">
      <div className="flex flex-col gap-3 w-[80%]">
        <h1 className="">CONTACT US</h1>
        <p
          className={`${cn(meriwether.variable)} text-4xl mb-4`}
          style={{ fontFamily: "var(--Merriweather)" }}
        >
          We’d love to hear from you
        </p>
        <form className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
            <Input placeholder="Country" />
            <Input placeholder="City" />
            <Input placeholder="Email" />
            <Input placeholder="Mobile" />
          </div>
          <Textarea placeholder="message" />
          <Button className=" bg-orange-500 hover:bg-orange-600 transition-all duration-200">
            Send Email
          </Button>
        </form>
      </div>
      <div className="bg-contact h-svh rounded-l-md" />
    </div>
  );
}
