import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaListUl } from "react-icons/fa";
import useUser from "../components/user/useUser";

const lists = [
  { label: "Home", id: "home" },
  { label: "Properties", id: "properties" },
  { label: "Services", id: "services" },
  { label: "Agents", id: "agents" },
  { label: "Contact Us", id: "contact" },
];

export default function NavbarSheet() {
  const router = useRouter();
  const path = usePathname();
  const { token } = useUser();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className=" md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <div className="ml-3 hover:bg-slate-200 cursor-pointer flex items-center justify-center rounded-full w-11 h-11">
            <FaListUl className="w-8 h-8 text-gray-800" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <div className="flex gap-12 px-10 mt-12 flex-col">
            {lists.map((el) => (
              <div
                className=" bg-orange-300 hover:bg-orange-200 rounded-md flex py-2 items-center justify-center"
                key={el.label}
              >
                <span
                  onClick={() => handleScroll(el.id)}
                  className="font-semibold text-sm text-gray-800 cursor-pointer hover:text-orange-600 transition-all duration-150"
                >
                  {el.label}
                </span>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
