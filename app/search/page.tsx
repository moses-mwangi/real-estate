import React, { Suspense } from "react";
import Searching from "./Searching";
import { Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";

const meriwether = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Merriweather",
});

export default function SearchedPage() {
  return (
    <div className="bg-id flex-col pt-32 pb-[20px] md:pb-[30px] px-7 sm:px-14">
      <p
        className={`${cn(
          meriwether.variable
        )} flex justify-center pb-12 text-3xl sm:text-4xl font-semibold text-gray-800`}
        style={{ fontFamily: "var(--Merriweather)" }}
      >
        Your specified filtered Properties
      </p>
      <Suspense fallback={<p>Loading....</p>}>
        <Searching />
      </Suspense>
    </div>
  );
}
