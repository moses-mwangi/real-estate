"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, X } from "lucide-react";
import React, { useState } from "react";

export default function PhoneNumber() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        className="bg-orange-500 hover:bg-orange-600 text-[13px] sm:text-[16px]"
        onClick={() => setIsModalOpen(true)}
      >
        <PhoneCall className="mr-[5px] w-[18px] h-[18px] sm:w-5 sm:h-5" /> CALL
        US NOW
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold opacity-100 text-black/95">
                Contact Information
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X />
              </button>
            </div>
            <CardContent className="px-2 font-medium text-gray-700 text-[14px]">
              You can contact Moses Mwangi via phone: 0725672675.Thanks for
              reaching out
            </CardContent>
          </div>
        </div>
      )}
    </div>
  );
}
