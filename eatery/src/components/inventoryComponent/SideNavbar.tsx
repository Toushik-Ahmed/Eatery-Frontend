import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import { IoIosAddCircleOutline, IoMdBook } from 'react-icons/io';
import { LuTrash } from 'react-icons/lu';
import DropDown from '../customComponents/DropDown';
type Props = {};

const SideNavbar = (props: Props) => {
  const items = ['Logout'];
  return (
    <nav className="bg-[#FF5841] h-[100vh] w-fit">
      <div className="p-2 flex gap-8">
        <div className="bg-[white] w-fit px-1 py-1 rounded-2xl font-bold text-xl">
          A
        </div>

        <div className="flex gap-4  items-center">
          <div className="text-white">User Name</div>

          <DropDown items={items} />
        </div>
      </div>
      <div>
        <div className="font-bold text-xl mt-4 p-2">Inventory</div>
        <hr />
        <ul className="flex flex-col gap-4 text-white mt-10 p-2 text-lg">
          <Link href="Inventory">
            <li className="flex items-center gap-1 p-2 rounded-lg   hover:bg-[#1D1842] ">
              <IoMdBook />
              Ingredient
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center gap-1 p-2 rounded-lg   hover:bg-[#1D1842]">
              <IoIosAddCircleOutline />
              Add
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center gap-1 p-2 rounded-lg   hover:bg-[#1D1842]">
              <BsCart /> Order
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center gap-1 p-2 rounded-lg   hover:bg-[#1D1842]">
              <LuTrash /> Wastage
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default SideNavbar;
