"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import useUser from "./useUser";
import ResetPasswordForm from "./ResetPasswordForm";

import { Inter, Inter_Tight } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Inter",
});

export default function ResetPasswordEmail() {
  const loader = (
    <div
      className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );

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
