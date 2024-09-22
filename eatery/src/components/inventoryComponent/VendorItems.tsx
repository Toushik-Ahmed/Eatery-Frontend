'use client';
import { getAllVendorItems } from '@/app/services/inventoryServices';
import Pagination from '@/shared/components/Pagination/pagination';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { IoBagAddOutline } from 'react-icons/io5';
import { CartData, DrawerExample } from '../customComponents/Cart';

export interface Items {
  itemName: string;
  price: number;
}
type vendorItems = {
  ingredient: Items[];
  totalData: number;
};

type Props = {
  handleClick: () => void;
};

const VendorItems = ({ handleClick }: Props) => {
  const [selectedItems, setSelectedItems] = useState<Items[]>([]);
  const [clickedItems, setClickedItems] = useState<number[]>([]);
  const [vendorItems, setVendorItems] = useState<vendorItems>({
    ingredient: [],
    totalData: 0,
  });
  const [cartData, setCartData] = useState<CartData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [ingredients, setIngredients] = useState<Items[]>([]);

  const handleSelectItems = (newItem: Items, index: number) => {
    if (clickedItems.includes(index)) {
      // Deselect if already selected
      setSelectedItems((prev) => prev.filter((item) => item !== newItem));
      setClickedItems((prev) => prev.filter((i) => i !== index));
      setCartData((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Select if not already selected
      setSelectedItems((prev) => [...prev, newItem]);
      setClickedItems((prev) => [...prev, index]);
      setCartData((prev) => [
        ...prev,
        {
          ingredient: newItem.itemName,
          unit: '',
          quantity: 0,
          price: newItem.price,
          deliveryDate: '',
        },
      ]);
    }
  };

  const removeItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((item, id) => id !== index));
    setClickedItems((prev) => prev.filter((_, i) => i !== index)); // Unmark the item
    setCartData((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all selections and reset button state
  const clearSelections = () => {
    setSelectedItems([]);
    setClickedItems([]);
  };

  // Simulate closing the cart or checking out
  const handleCheckoutOrClose = () => {
    clearSelections();
    handleClick(); //
  };

  useEffect(() => {
    const getVendorBudgets = async () => {
      const response = await getAllVendorItems({ pageNumber, pageSize });
      setVendorItems(response);
      setTotalData(response.totalData);
      setIngredients(response.ingredient);
    };
    getVendorBudgets();
  }, []);
  console.log(vendorItems.ingredient);
  useEffect(() => {
    console.log('Selected items updated:', selectedItems);
  }, [selectedItems]);

  const th = ['Name', 'Cost($)', 'Add to Cart'];

  const handleSetCartData = () => {};
  const handleSearch = () => {
    const searchedIngredients = vendorItems.ingredient.filter((item) =>
      item.itemName?.toLowerCase().includes(search.toLowerCase())
    );
    setIngredients(searchedIngredients);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <div>
          <Button
            p={0}
            w="auto"
            h="auto"
            minW="auto"
            minH="auto"
            bg="white"
            _hover={{ bg: '#ff5841' }}
            onClick={handleCheckoutOrClose}
          >
            <FaLongArrowAltLeft />
          </Button>
        </div>
        Back
      </div>
      <div className="flex justify-between">
        <div className="text-3xl font-bold mb-10">List of Items</div>
        <div className="mr-10">
          <DrawerExample
            removeItem={removeItem}
            cartData={cartData}
            setCartData={(data) => setCartData(data)}
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {th.map((el, id) => (
                <Th key={id}>{el}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {ingredients.map((el, id) => (
              <Tr key={id}>
                <Td>{el.itemName}</Td>
                <Td>{el.price}</Td>

                <Td>
                  <Button
                    p={2}
                    w="auto"
                    h="auto"
                    minW="auto"
                    minH="auto"
                    bg={clickedItems.includes(id) ? '#6EC207' : 'white'} // Change bg based on clicked state
                    _hover={{ bg: '#ff5841' }}
                    onClick={() => handleSelectItems(el, id)}
                  >
                    <IoBagAddOutline />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-4">
        <Pagination
          totalData={totalData}
          onPageChange={({ pageNumber, pageSize }) => {
            setPageNumber(pageNumber);
            setPageSize(pageSize);
            getAllVendorItems({ pageNumber, pageSize });
          }}
        ></Pagination>
      </div>
    </div>
  );
};
export default VendorItems;
