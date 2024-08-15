import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  googleId: string;
  date: Date;
}

function useUser() {
  const [curUser, setCurUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    async function getCurrentUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No token found. Please log in.");
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:3008/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log(res.data);
        router.refresh();
        setCurUser(res.data.user);
        toast.success("User data fetched successfully");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong: Please try again");
      }
    }

    getCurrentUser();
  }, [router]);

  return { curUser };
}

export default useUser;
