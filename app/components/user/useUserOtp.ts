"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export interface IUser {
  email: string;
}

function useOtpUser() {
  const [otpUser, setOtpUser] = useState<IUser[] | null>(null);

  useEffect(() => {
    async function getAllOtpUser() {
      try {
        const res = await axios.get("http://127.0.0.1:3008/api/users");

        setOtpUser(res.data.users);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
    getAllOtpUser();
  }, []);

  return { otpUser };
}

export default useOtpUser;
