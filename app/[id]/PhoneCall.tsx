"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { PhoneCall, X } from "lucide-react";
import React, { useState } from "react";

export default function PhoneNumber() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Button
        className="w-full flex items-center bg-orange-600 hover:bg-orange-500"
        onClick={() => setIsModalOpen(true)}
      >
        <PhoneCall className="w-4 h-4 mr-2" /> Call
      </Button>

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
            <CardContent className="px-2 text-[13px]">
              You can contact Janet Richmond via phone: (305) 555-4555 mobile:
              (305) 555-4555. Please use the #%id to identify the property:
              Apartment in GEMZ in Al Furjan
            </CardContent>
          </div>
        </div>
      )}
    </div>
  );
}
