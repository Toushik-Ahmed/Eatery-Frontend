'use client';
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
import { DrawerExample } from '../customComponents/Cart';

export interface Items {
  Name: string;
  Cost: number;
  Available: number;
}

type Props = {
  handleClick: () => void;
  handleSelectItems:()=>void
};

const VendorItems = ({ handleClick }: Props) => {
  const [selectedItems, setSelectedItems] = useState<Items[]>([]);
  const [clickedItems, setClickedItems] = useState<number[]>([]);

  const handleSelectItems = (newItem: Items, index: number) => {
    if (clickedItems.includes(index)) {
      // Deselect if already selected
      setSelectedItems((prev) => prev.filter((item) => item !== newItem));
      setClickedItems((prev) => prev.filter((i) => i !== index));
    } else {
      // Select if not already selected
      setSelectedItems((prev) => [...prev, newItem]);
      setClickedItems((prev) => [...prev, index]);
    }
  };

  const removeItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
    setClickedItems((prev) => prev.filter((i) => i !== index)); // Unmark the item
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
    console.log('Selected items updated:', selectedItems);
  }, [selectedItems]);

  const th = ['Name', 'Cost(taka)', 'Available(K.G)', 'Add to Cart'];
  const dummyItems = [
    {
      Name: 'Potato',
      Cost: 60,
      Available: 100,
    },
    {
      Name: 'Green-Salad',
      Cost: 60,
      Available: 100,
    },
    {
      Name: 'Tomato',
      Cost: 60,
      Available: 100,
    },
    {
      Name: 'Broccoli',
      Cost: 60,
      Available: 100,
    },
    {
      Name: 'Onion',
      Cost: 60,
      Available: 100,
    },

  ];

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
            setSelectedItems={setSelectedItems}
            selectedItems={selectedItems}
            removeItem={removeItem}
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
            {dummyItems.map((el, id) => (
              <Tr key={id}>
                <Td>{el.Name}</Td>
                <Td>{el.Cost}</Td>
                <Td>{el.Available}</Td>
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
          totalData={100}
          onPageChange={(ev) => {
            console.log(ev);
          }}
        ></Pagination>
      </div>
    </div>
  );
};

export default VendorItems;
