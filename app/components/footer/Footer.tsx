import React from "react";

export default function Footer() {
  return (
    <div className=" bg-orange-500 py-5 px-5 text-slate-50 flex items-center justify-between">
      <p>Copyright WP Estate. All Rights Reserved.</p>
      <div className="flex gap-3">
        <h1 className="cursor-pointer hover:border border-white px-2 py-1 rounded-sm transition-all duration-200">
          Terms Use
        </h1>
        <h1 className="cursor-pointer hover:border border-white px-2 py-1 rounded-sm transition-all duration-200">
          Privacy Policy
        </h1>
      </div>
    </div>
  );
}
