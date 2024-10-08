"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, X } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "@/components/ui/card";
import ForgotPasswordForm from "../components/user/ForgotPassword";
import EmailOtpVerificationForm from "./EmailOtpVerificationForm";

interface SignUpFormInputs {
  email: string;
  password: string;
  name: string;
}

export default function EmailVerification() {
  const [newUser, setNewUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasModal, setShowForgotPasModal] = useState(false);
  const [show, setShow] = useState(false);

  const [showOtp, setShowOtp] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  ///===/verifyOtp

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

  const onSubmits: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const url = newUser
        ? "https://real-estate-api-azure.vercel.app/api/auth/login"
        : "http://127.0.0.1:3008/api/auth/verifyOtp";

      const otpData = { email: data.email, password: data.password };

      const formData = newUser ? data : otpData;

      setIsLoading(true);

      const res = await axios.post(url, formData);
      toast.success(newUser ? "Login successful" : "OTP Sent successful");

      if (newUser) {
        const token = res.data.token;
        document.cookie = `token=${token}; path=/`;
        reset();
        setShow((el) => !el);
        router.refresh();
        setIsLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setShowOtp(true);
        setUserPassword(data.password);
        setUserEmail(data.email);
        setUserName(data.name);
      }
    } catch (err) {
      toast.error("Failed to register. Please try again.");
      console.log("Error", err);
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const url = newUser
        ? "https://real-estate-api-azure.vercel.app/api/auth/login"
        : "http://127.0.0.1:3008/api/auth/verifyOtp";

      const formData = newUser
        ? data
        : { email: data.email, password: data.password };

      setIsLoading(true);
      const res = await axios.post(url, formData);

      if (newUser) {
        toast.success("Login successful");
        setIsLoading(false);
        // Do login logic, refresh token, etc.
        const token = res.data.token;
        document.cookie = `token=${token}; path=/`;
        reset();
        setShow((el) => !el);
        router.refresh();
        setIsLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        toast.success("OTP Sent successfully");
        setShowOtp(true);
        setUserEmail(data.email);
        setUserPassword(data.password);
        setUserName(data.name);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Failed to send OTP. Please try again.");
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
    <div className="pb-14 pt-28 px-8">
      {showOtp === true ? (
        <EmailOtpVerificationForm
          userName={userName}
          userEmail={userEmail}
          userPassword={userPassword}
        />
      ) : (
        <div className="">
          {showForgotPasModal === true && (
            <ForgotPasswordForm
              setShow={setShow}
              setShowForgotPasModal={setShowForgotPasModal}
            />
          )}

          {/* {show === true && ( */}
          <div className="flex absolute top-0 right-0 bg-black/40 backdrop-blur-[2px]  justify-center items-center h-svh w-svw z-50">
            <div className="flex items-center justify-center sm:w-[80svw] md:w-[60svw] h-full rounded-r-md">
              <Card className="px-8  py-5 pt-6  rounded-sm border-b-0  shadow-none w-full relative h-[80svh] max-w-sm">
                <X
                  className="w-8 h-8 absolute top-4 right-4 hover:bg-slate-300 p-[6px] rounded-full text-gray-600 cursor-pointer"
                  onClick={() => {
                    setShow((el) => !el);
                  }}
                />

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
                          placeholder={
                            errors.name ? errors.name.message : "User Name"
                          }
                          type="name"
                          {...register("name", {
                            required: "Name is required",
                          })}
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
                        placeholder={
                          errors.email ? errors.email.message : "User Email"
                        }
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                    </div>
                    <div className="mb-4 relative">
                      <Input
                        className={`${
                          errors.password
                            ? " placeholder:text-red-500 placeholder:text-[13px]"
                            : ""
                        }`}
                        placeholder={
                          errors.password ? errors.password.message : "Password"
                        }
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                          required: "Password is required",
                        })}
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
                      {isLoading === false ? "Sign Up with Email" : loader}
                    </Button>
                  </form>
                  <div className=" flex justify-center pt-5 gap-5 items-center">
                    <div className=" w-full h-[2px] bg-gray-200 rounded-sm" />
                    <p>or</p>
                    <div className=" w-full h-[2px] bg-gray-200 rounded-sm" />
                  </div>
                  <Button className="text-center mt-4 w-full hover:bg-gray-300 bg-gray-200 rounded-md cursor-not-allowed py-2 px-7 flex items-center gap-2 justify-center">
                    <FcGoogle className=" w-6 h-6" />
                    <p className="font-medium text-gray-700 text-[15px]">
                      Sign Up with Google
                    </p>
                  </Button>
                  <div className=" flex justify-between items-center pt-5">
                    {newUser && (
                      <div className="flex items-center gap-1">
                        <p className="text-[13px] text-gray-500 font-medium">
                          New here:
                        </p>
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
                    <div
                      className={`${
                        !newUser ? " hidden" : ""
                      } text-[13px] cursor-pointer hover:text-orange-500 text-blue-500 font-medium`}
                      onClick={() => {
                        setShow((el) => !el);
                        setShowForgotPasModal((el) => !el);
                      }}
                    >
                      Forgot Password
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
}
