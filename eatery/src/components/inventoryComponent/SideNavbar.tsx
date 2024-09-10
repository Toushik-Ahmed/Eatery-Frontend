import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import { IoIosAddCircleOutline, IoMdBook } from 'react-icons/io';
import { LuTrash } from 'react-icons/lu';
import DropDown from '../customComponents/DropDown';
import { FaArrowCircleDown } from 'react-icons/fa';
type Props = {};

const SideNavbar = (props: Props) => {


  const actions=<FaArrowCircleDown className=" text-white " />
  return (
    <nav className="bg-[#FF5841] h-[100vh] w-fit">
      <div className="p-2 flex gap-8">
        <div className="bg-[white] w-fit p-2 rounded-[65%] font-bold text-xl">
          A
        </div>
        <div className="flex gap-4  items-center">
          <div className="text-white">User Name</div>


          <DropDown  />
        </div>
      </div>
      <div>
        <div className="font-bold text-xl mt-4 p-2">Inventory</div>
        <hr />
        <ul className="flex flex-col gap-4 text-white mt-10 p-2 text-lg">
          <Link href="Inventory">
            <li className="flex items-center gap-1">
              <IoMdBook />
              Ingredient
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center gap-1">
              <IoIosAddCircleOutline />
              Add
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center gap-1">
              <BsCart /> Order
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center gap-1">
              <LuTrash /> Wastage
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
