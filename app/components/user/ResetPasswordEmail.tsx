"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Inter",
});

export default function ResetPasswordEmail() {
  return (
    <div className="flex absolute top-0 right-0 bg-black/40 backdrop-blur-[2px]  justify-center items-center h-svh w-svw z-50">
      <Card className="w-[398px] shadow-xl border-[1px] px-7 py-9">
        <div
          className={`${cn(inter.variable)} flex flex-col gap-3 mb-8`}
          style={{ fontFamily: "var(--Inter)" }}
        >
          <p className=" flex justify-center  text-[26px]">
            Forgot Your Password?
          </p>
          <div className=" flex flex-col items-center justify-center text-[16px]">
            <p>Enter your email address and we will send you</p>
            <p>instructions to reset your password.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
