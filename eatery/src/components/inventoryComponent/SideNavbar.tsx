"use client";
import Link from "next/link";
import { BsCart } from "react-icons/bs";
import { IoIosAddCircleOutline, IoMdBook } from "react-icons/io";
import { LuTrash } from "react-icons/lu";
import DropDown from "../customComponents/DropDown";
import BackToAdmin from "@/shared/components/BackToAdmin";
import { useEffect, useState } from "react";
import { loggedInuser, LoggedInuser } from "@/services/apiservice";
import { removeToken } from "@/services/tokenServices";
import { useRouter } from "next/navigation";

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
    <nav className="bg-[#d91a40] min-h-screen max-h-full w-[12vw] sticky top-0">
      <div className="p-2 flex gap-8 justify-center ">
        <div className="flex gap-4 items-center ">
          <DropDown selectLabel={label} items={items} onSelect={handleLogOut} />
        </div>
      </div>

      <div>
        <div className="font-bold text-xl mt-8 p-2 flex justify-between">
          Inventory
          <div>
            <BackToAdmin />
          </div>
        </div>
        <hr />
        <ul className="flex flex-col gap-4 text-white mt-10 p-2 text-lg">
          <Link href="/Inventory">
            <li className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#1D1842]">
              <IoMdBook />
              Ingredient
            </li>
          </Link>
          <Link href="/Inventory/addIngredients">
            <li className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#1D1842]">
              <IoIosAddCircleOutline />
              Add
            </li>
          </Link>
          <Link href="/Inventory/order">
            <li className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#1D1842]">
              <BsCart /> Order
            </li>
          </Link>
          <Link href="/Inventory/wastage">
            <li className="flex items-center gap-1 p-2 rounded-lg hover:bg-[#1D1842]">
              <LuTrash /> Wastage
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
