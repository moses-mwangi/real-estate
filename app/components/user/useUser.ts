import axios from "axios";
import { useEffect, useState } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  userId: object;
  date: Date;
}

function useUser() {
  const [curUser, setCurUser] = useState<IUser | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCurrentUser(token);
    } else {
      setCurUser(null);
    }
  }, []);

  async function getCurrentUser(token: string) {
    try {
      const res = await axios.get(
        "https://real-estate-api-azure.vercel.app/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCurUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    setCurUser(null);
  };

  return { curUser, logOut, show, setShow };
}

export default useUser;
