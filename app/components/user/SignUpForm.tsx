"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

interface SignUpFormInputs {
  email: string;
  password: string;
  name: string;
}

interface Set {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SignUpForm({ setShow }: Set) {
  const [newUser, setNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const url = newUser
        ? "https://real-estate-api-azure.vercel.app/api/auth/login"
        : "https://real-estate-api-azure.vercel.app/api/auth/register";

      const res = await axios.post(url, data);
      toast.success(newUser ? "Login successful" : "Registration successful");
      const token = res.data.token;
      localStorage.setItem("token", token);
      setShow((el) => !el);
      reset();
      router.push("/");
      router.refresh();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      toast.error("Failed to register. Please try again.");
      console.log("Error", err);
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = "http://127.0.0.1:3008/api/auth/google";
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {!newUser && "Create an account"}
        {newUser && "Sign into your account"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!newUser && (
          <div className="mb-4">
            <Input
              className={`${
                errors.name
                  ? " placeholder:text-red-500 placeholder:text-[13px]"
                  : ""
              }`}
              placeholder={errors.name ? errors.name.message : "User Name"}
              type="name"
              {...register("name", { required: "Name is required" })}
            />
          </div>
        )}
        <div className="mb-4">
          <Input
            className={`${
              errors.email
                ? " placeholder:text-red-500 placeholder:text-[13px]"
                : ""
            }`}
            type="email"
            placeholder={errors.email ? errors.email.message : "User Email"}
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="mb-4 relative">
          <Input
            className={`${
              errors.password
                ? " placeholder:text-red-500 placeholder:text-[13px]"
                : ""
            }`}
            placeholder={errors.password ? errors.password.message : "Password"}
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 text-gray-500 transform -translate-y-1/2"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="flex items-center space-x-2 mb-[12px]">
          <Checkbox
            className=" w-[14px] h-[14px] flex justify-center items-center text-gray-300"
            id="terms"
            required
          />
          <Label className="text-xs text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Accept terms and conditions
          </Label>
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-150"
        >
          Sign Up with Email
        </Button>
      </form>
      <div className=" flex justify-center pt-5 gap-5 items-center">
        <div className=" w-full h-[2px] bg-gray-200 rounded-sm" />
        <p>or</p>
        <div className=" w-full h-[2px] bg-gray-200 rounded-sm" />
      </div>
      <Button
        className="text-center mt-4 w-full hover:bg-gray-300 bg-gray-200 rounded-md cursor-not-allowed py-2 px-7 flex items-center gap-2 justify-center"
        // onClick={handleGoogleSignUp}
      >
        <FcGoogle className=" w-6 h-6" />
        <p className="font-medium text-gray-700 text-[15px]">
          Sign Up with Google
        </p>
      </Button>
      <div className=" flex justify-between items-center pt-5">
        {newUser && (
          <div className="flex items-center gap-1">
            <p className="text-[13px] text-gray-500 font-medium">New here:</p>
            <p
              className="text-[13px] text-orange-500 hover:text-orange-400 cursor-pointer font-medium"
              onClick={() => {
                setNewUser((el) => !el);
              }}
            >
              Sign Up
            </p>
          </div>
        )}
        {!newUser && (
          <div className="flex items-center gap-1">
            <p className="text-[13px] text-gray-500 font-medium">
              Have Account:
            </p>
            <p
              className="text-[13px] text-orange-500 hover:text-orange-400 cursor-pointer font-medium"
              onClick={() => {
                setNewUser((el) => !el);
              }}
            >
              Sign In
            </p>
          </div>
        )}
        <div className=" text-[13px] cursor-pointer hover:text-orange-500 text-blue-500 font-medium">
          Forgot Password
        </div>
      </div>
    </div>
  );
}
