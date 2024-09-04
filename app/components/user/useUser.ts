import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  date: Date;
  photo: string;
  role: string;
}

function useUser() {
  const [curUser, setCurUser] = useState<IUser | null>(null);
  const [allUsers, setAllUsers] = useState<IUser[] | null>(null);
  const [show, setShow] = useState(false);

  const [token, setToken] = useState<String | null>(null);

  useEffect(() => {
    const token = document.cookie.split("=")[1];

    if (token) {
      getCurrentUser(token);

      setToken(token);
    } else {
      setCurUser(null);
    }
  }, []);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const res = await axios.get(
          "https://real-estate-api-azure.vercel.app/api/users"
        );

        setAllUsers(res.data.users);
      } catch (err) {
        console.log("ERROR", err);
      }
    }
    getAllUsers();
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
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    document.cookie = `token=; path=/`;
    setCurUser(null);
  };

  const agent = allUsers?.filter((el) => el.role === "agent");

  return {
    allUsers,
    agent,
    curUser,
    token,
    logOut,
    show,
    setShow,
  };
}

export default useUser;
