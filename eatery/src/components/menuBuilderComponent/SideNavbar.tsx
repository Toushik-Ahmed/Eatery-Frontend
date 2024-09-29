"use client";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { IoIosAddCircleOutline, IoMdBook } from "react-icons/io";
import { LuTrash } from "react-icons/lu";
import DropDown from "../customComponents/DropDown";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoggedInuser, loggedInuser } from "@/services/apiservice";
import { removeToken } from "@/services/tokenServices";
import BackToAdmin from "@/shared/components/BackToAdmin";

const SideNavbar = () => {
  const items = ["Logout"];
  const [user, setUserInfo] = useState<LoggedInuser>();
  const [label, setLabel] = useState("User Name");
  const [userType, setUserType] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await loggedInuser();
        setUserInfo(userData);
        setLabel(userData.user.firstName);
        setUserType(userData.user.userType);
        console.log(userData.user);
        console.log(userData.user.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogOut = () => {
    removeToken();
    router.push("/login");
  };

  return (
    // <nav className="bg-[#f53e62] min-h-screen max-h-full w-[12vw] sticky top-0">
    <nav className="bg-[#d91a40] min-h-screen max-h-full w-[12vw] sticky top-0">

    <div className="p-2 flex gap-8 justify-center">
      <div className="flex gap-4 items-center ">
        <DropDown selectLabel={label} items={items} onSelect={handleLogOut} />
      </div>
    </div>

    <div>
      <div className="font-bold text-xl mt-8 p-2 flex justify-between">
        Food Menu
        <div>
          <BackToAdmin />
        </div>
      </div>
      <hr />
        <ul className="flex flex-col gap-4 text-black mt-10 p-2 text-lg">
          <Link href="/menubuilder/menuCard">
            <li className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#1D1842] text-[white]">
              <IoMdBook />
              Menus
            </li>
          </Link>
          <Link href="/menubuilder/menuForm">
            <li className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#1D1842] text-[white]">
              <IoIosAddCircleOutline />
              Add Menu
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
