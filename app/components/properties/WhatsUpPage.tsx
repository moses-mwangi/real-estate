"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface Phone {
  el: {
    photo: string;
    name: string;
    phone: number;
    email: string;
  };
}

export default function WhatsUpPage({ el }: Phone) {
  const phoneNumber = el.phone.toString();
  const message = `Hi ${el.name}, I am interested in the property you have listed on the site. Please contact me for more details!`;
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div>
      <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Card className="hover:bg-orange-500 h-[29px] hover:text-slate-100 bg-red-100 rounded-md text-sm text-orange-600 px-6 py-1 flex justify-center items-center">
          <FaWhatsapp className="w-[15px] h-[15px] mr-1" />
        </Card>
      </Link>
    </div>
  );
}
