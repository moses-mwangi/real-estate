import Link from "next/link";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footers() {
  return (
    <div className=" grid grid-cols-5 gap-3 px-6 py-8 bg-orange-500 text-slate-50">
      <div className="flex flex-col gap-9">
        <h1 className=" text-2xl font-medium">Bomac real estate</h1>
        <div className="flex items-center gap-7">
          <Link href="/">
            <FaInstagram className=" w-6 h-6" />
          </Link>
          <Link href="/">
            <FaFacebook className=" w-6 h-6" />
          </Link>
          <Link href="/">
            <BsTwitter className=" w-6 h-6" />
          </Link>
        </div>
        <p>© 2024 Bomac Ltd Company - House for sale</p>
      </div>
      <div className="flex  flex-col gap-9">
        <h1 className=" text-xl font-medium">Contacts</h1>
        <p>623 Harrison St., 2nd Floor, San Francisco, CA 941</p>
        <p>+254725672675</p>
        <p>bomac-real-estate@gmail.com</p>
      </div>
      <div>
        <h1>Accounts</h1>
      </div>
      <div>
        <h1>Company</h1>
      </div>
      <div>
        <h1>Resources</h1>
      </div>
    </div>
  );
}
