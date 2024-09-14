import Link from 'next/link';
import { BsCart } from 'react-icons/bs';
import { IoIosAddCircleOutline, IoMdBook } from 'react-icons/io';
import { LuTrash } from 'react-icons/lu';
import DropDown from '../customComponents/DropDown';

const SideNavbar = () => {
  const items = ['Logout'];
  return (
    <nav className="bg-[#FF5841] min-h-screen max-h-full w-fit sticky top-0">
      <div className="p-2 flex gap-8">
        <div className="bg-[white] px-1 py-1 h-10 w-10 font-bold text-xl rounded-full flex items-center justify-center">
          A
        </div>

        <div className="flex gap-4 items-center">
          <DropDown selectLabel="User Name" items={items} />
        </div>
      </div>

      <div>
        <div className="font-bold text-xl mt-4 p-2">Inventory</div>
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
          <Link href="#">
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
