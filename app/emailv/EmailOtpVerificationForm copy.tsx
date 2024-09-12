"use client";

import React, { LegacyRef, useRef, useState } from "react";
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
}

export default function EmailOtpVerificationForm({
  userName,
  userEmail,
  userPassword,
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
      const url = "http://127.0.0.1:3008/api/auth/register";
      const deleteOtpUrl = "http://127.0.0.1:3008/api/auth/deleteOtp";

      const res = await axios.post(url, formData);

      toast.success("Registration successful");
      const token = res.data.token;
      document.cookie = `token=${token}; path=/`;
      setIsLoading(false);
      reset();

      await axios.delete(deleteOtpUrl, { params: { email: formData.email } });

      router.push("/");
      router.refresh();
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
      <Card className="px-8 py-5 pt-6 rounded-sm shadow-none w-full relative h-[50svh] max-w-sm">
        <X
          className="w-8 h-8 absolute top-4 right-4 hover:bg-slate-300 p-[6px] rounded-full text-gray-600 cursor-pointer"
          onClick={() => setIsLoading(false)}
        />
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Verify your Email
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input value={userEmail} type="email" readOnly />
            </div>
            <div className="mb-4 relative">
              <Input value={userPassword} type="password" readOnly />
            </div>

            <div className="mb-4 relative">
              <div className="grid grid-cols-6 gap-2">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    // ref={(el) =>
                    //   (inputRef.current[index] = el as HTMLInputElement)
                    // }
                    // ref={(el) => {
                    //   if (el) {
                    //     inputRef.current[index] = el;
                    //   }
                    // }}

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

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-150"
            >
              {isLoading === false ? "Verify Email" : loader}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
