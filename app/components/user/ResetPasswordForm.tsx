"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";

const loginSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

type Login = z.infer<typeof loginSchema>;

interface Reset {
  resetToken: string | undefined;
  setShowResetPasModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResetPasswordForm({
  resetToken,
  setShowResetPasModal,
  setShow,
}: Reset) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const handlePasswordReset: SubmitHandler<Login> = async (data) => {
    try {
      setIsLoading(true);

      const url = `https://real-estate-api-azure.vercel.app/api/auth/resetPassword/${resetToken}`;
      const res = await axios.patch(url, data);

      toast.success("Password reset successful");

      setIsLoading(false);
      setShowResetPasModal((el) => !el);
      setShow((el) => !el);
    } catch (err) {
      toast.error("Failed to reset password. Please try again.");
      console.log("Error", err);
      setIsLoading(false);
    }
  };

  function togglePassword() {
    setShowPassword((el) => !el);
  }

  function togglePasswordConfirm() {
    setShowPasswordConfirm((el) => !el);
  }

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
    <Card className="w-96 shadow-xl border-[1px] px-9 py-9">
      <form
        className="grid grid-cols-1"
        onSubmit={handleSubmit(handlePasswordReset)}
      >
        <div className="grid grid-cols-1 gap-2 mb-2">
          <Label className="font-medium text-gray-700">New Password</Label>
          <div className=" relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              onClick={togglePassword}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-600 text-[13px]">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 mb-2">
          <Label className="font-medium text-gray-700">
            New Password Confirm
          </Label>
          <div className="relative">
            <Input
              type={showPasswordConfirm ? "text" : "password"}
              {...register("passwordConfirm")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
              onClick={togglePasswordConfirm}
            >
              {showPasswordConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {errors.passwordConfirm && (
            <div className="text-red-600 text-[13px]">
              {errors.passwordConfirm.message}
            </div>
          )}
        </div>

        <Button
          type="submit"
          className=" w-full disabled:cursor-not-allowed bg-orange-500 hover:bg-orange-600"
          disabled={isLoading}
        >
          {isLoading === false ? "Reset Password" : loader}
        </Button>
      </form>
    </Card>
  );
}
