import { Button } from "@/components/ui/button";
import React from "react";

export default function Footer() {
  return (
    <div className=" bg-orange-500 py-5 px-2 sm:px-5 text-slate-50 flex flex-col sm:flex-row items-center justify-between">
      <p>© 2024 Bomac Ltd Company - House for sale</p>
      <div className="flex gap-3">
        <Button className="cursor-pointer bg-orange-500 hover:bg-orange-800 py-1 rounded-sm transition-all duration-200">
          Terms Use
        </Button>
        <Button className="cursor-pointer bg-orange-500 hover:bg-orange-800 py-1 rounded-sm transition-all duration-200">
          Privacy Policy
        </Button>
      </div>
    </div>
  );
}
