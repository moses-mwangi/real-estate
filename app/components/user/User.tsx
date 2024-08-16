"use client";

import React, { useEffect, useState } from "react";
import SignUpForm from "./SignUpForm";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export default function UserPage() {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tok = localStorage.getItem("token");
    if (tok) {
      setToken(tok);
    }
  }, [token]);

  return (
    <div>
      {show === false && (
        <Card
          className=" bg-slate-100 cursor-pointer font-semibold text-sm py-2 px-3 rounded-md"
          onClick={() => {
            setShow((el) => !el);
          }}
        >
          Sign Up
        </Card>
      )}
      {show === true && (
        <div className="flex absolute top-0 right-0 bg-black/40 backdrop-blur-[2px]  justify-center items-center h-svh w-svw z-50">
          <div className="bg-sign rounded-l-md relative h-full w-full max-h-[85.3svh] max-w-[300px]">
            <div className="text-[24px] absolute top-1/2 px-6 pb-7  text-white font-semibold">
              Welcome to
              <br /> Dubai Real Estate
            </div>
          </div>
          <div className="bg-card h-full max-h-[85.3svh] rounded-r-md">
            <Card className="px-8 py-12 rounded-l-none border-b-0  shadow-none w-full relative max-w-sm">
              <X
                className="w-8 h-8 absolute top-5 right-5 hover:bg-slate-100 p-[6px] rounded-full text-gray-600 cursor-pointer"
                onClick={() => {
                  setShow((el) => !el);
                }}
              />
              <SignUpForm setShow={setShow} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// app.use(
//   session({
//     // secret: config.get<string>("sessionSecret"),
//     secret: "XFh//pPG4zrBeLBIWgv73NwaypFz4NJJFeOclYf3OEE=",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["cyberwolves"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
