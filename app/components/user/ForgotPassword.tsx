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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type Login = z.infer<typeof loginSchema>;

interface ForgotPass {
  setShowForgotPasModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ForgotPasswordForm({
  setShowForgotPasModal,
  setShow,
}: ForgotPass) {
  const [loading, setLoading] = useState(false);
  const [showResetPasModal, setShowResetPasModal] = useState(false);
  const [resetToken, setResetToken] = useState<string>();
  const { allUsers } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const handleForgotPassword: SubmitHandler<Login> = async (data) => {
    const validateUser = allUsers?.find((el) => el.email === data.email);

    if (!validateUser) {
      toast.error("Invalid Email Address");
      return;
    }

    try {
      setLoading(true);
      const url =
        "https://real-estate-api-azure.vercel.app/api/auth/forgotPassword";

      const res = await axios.post(url, data);
      const resetToken = res.data.resetToken;

      console.log(resetToken);

      setResetToken(resetToken);
      toast.success("Emal sent successful");
      setLoading(false);
      setShowResetPasModal((el) => !el);
    } catch (err) {
      toast.error("Failed to send email. Please try again.");
      console.log("Error", err);
      setLoading(false);
    }
  };

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
      {showResetPasModal === false ? (
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
          <form
            className="grid grid-cols-1"
            onSubmit={handleSubmit(handleForgotPassword)}
          >
            {/* <div className="grid grid-cols-1 gap-2 mb-5">
              <Label className="font-medium text-gray-700">Email Address</Label>
              <Input type="text" {...register("email")} />
              {errors.email && (
                <span className="text-red-600 font-medium text-[13px]">
                  {errors.email.message}
                </span>
              )}
            </div> */}

            <div className="relative mb-5">
              <Input
                type="text"
                {...register("email")}
                className="block w-full bg-white px-3 py-2 text-gray-700 bg-transparent rounded-md border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer"
              />
              <Label className="absolute left-3 -top-2.5  bg-white text-sm px-[4px] text-gray-700 font-normal transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500">
                Email address *
              </Label>
              {errors.email && (
                <span className="text-red-600 font-medium text-[13px]">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex justify-between gap-12 items-center">
              <Button
                type="submit"
                className=" w-full disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-600"
                disabled={loading}
              >
                {loading ? loader : "Send Email"}
              </Button>
              <Card
                className="w-full cursor-pointer font-medium text-card text-sm flex justify-center py-[10px] rounded-md bg-orange-500 hover:bg-orange-600"
                onClick={() => {
                  setShowForgotPasModal((el) => !el);

                  console.log("moses");
                }}
              >
                Cancel
              </Card>
            </div>
          </form>
        </Card>
      ) : (
        <ResetPasswordForm
          setShowResetPasModal={setShowResetPasModal}
          resetToken={resetToken}
          setShow={setShow}
        />
      )}
    </div>
  );
}
