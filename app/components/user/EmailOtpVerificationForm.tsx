"use client";

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";

interface SignUpFormInputs {
  otp: string;
}

interface Prop {
  userName: string;
  userEmail: string;
  userPassword: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EmailOtpVerificationForm({
  userName,
  userEmail,
  userPassword,
  setShow,
  setShowOtp,
}: Prop) {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRef = useRef<HTMLInputElement[]>([]);

  const { handleSubmit, reset } = useForm<SignUpFormInputs>();
  const router = useRouter();

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value.length === 1 && index < 5) {
      inputRef.current[index + 1]?.focus();
    }

    if (value.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    setOtp(newOtp);
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async () => {
    const otpValue = otp.join("");

    if (!otpValue || otpValue.length !== 6) {
      toast.error("Please enter the full OTP.");
      return;
    }

    const formData = {
      name: userName,
      password: userPassword,
      email: userEmail,
      otp: otpValue,
    };
    try {
      setIsLoading(true);
      const url = "https://real-estate-api-azure.vercel.app/api/auth/register";
      const deleteOtpUrl =
        "https://real-estate-api-azure.vercel.app/api/auth/deleteOtp";

      const res = await axios.post(url, formData);

      toast.success("Registration successful");
      const token = res.data.token;
      document.cookie = `token=${token}; path=/`;

      setShow((el) => !el);
      setIsLoading(false);
      reset();

      await axios.delete(deleteOtpUrl, { params: { email: formData.email } });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error("Failed to register. Please try again.");
      setIsLoading(false);
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
    <div className="flex items-center justify-center sm:w-[80svw] md:w-[60svw] h-full rounded-r-md">
      <Card className="px-5 py-7 pt-6 rounded-sm shadow-none w-full relative max-w-sm">
        <X
          className="w-8 h-8 absolute top-4 right-4 hover:bg-slate-300 p-[6px] rounded-full text-gray-600 cursor-pointer"
          onClick={() => {
            setShow((el) => !el);
            setShowOtp((el) => !el);
          }}
        />
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Verify your Email
          </h2>
          <p className="text-center mb-4 text-[13px] text-gray-600">
            An OTP has been sent to your email: <strong>{userEmail}</strong>.
            Please check your inbox (or spam folder) and enter the 6-digit code
            below to complete your registration.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 relative">
              <div className="grid grid-cols-6 gap-2">
                {otp.map((value, index) => (
                  <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    ref={(el) => {
                      if (el) {
                        inputRef.current[index] = el as HTMLInputElement;
                      }
                    }}
                    className="border border-gray-300 text-center w-full p-2 text-lg focus:ring focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-center justify-center">
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-150"
              >
                {isLoading === false ? "Verify Email" : loader}
              </Button>
              <Card
                className="rounded-md cursor-pointer text-card tex-sm flex items-center justify-center px-2 py-2 w-full bg-orange-500 hover:bg-orange-600 transition-all duration-150"
                onClick={() => {
                  setShow((el) => !el);
                  setShowOtp((el) => !el);
                }}
              >
                Cancel
              </Card>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
