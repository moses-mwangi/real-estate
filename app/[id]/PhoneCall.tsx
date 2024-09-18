"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, X } from "lucide-react";
import React, { useState } from "react";

interface Phone {
  el: {
    photo: string;
    name: string;
    phone: number;
    email: string;
  };
}

export default function PhoneNumber({ el }: Phone) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Card
        className="bg-orange-500 text-slate-100 hover:bg-red-100 rounded-md text-sm hover:text-orange-600 px-6 py-2 flex justify-center items-center   transition-all duration-150"
        onClick={() => setIsModalOpen(true)}
      >
        <PhoneCall className="w-[15px] h-[15px] mr-1" /> Call
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Contact Information</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            <CardContent className="px-2 font-medium text-gray-700 text-[14px]">
              You can contact {el.name} via phone: {el.phone}.
            </CardContent>
          </div>
        </div>
      )}
    </div>
  );
}
