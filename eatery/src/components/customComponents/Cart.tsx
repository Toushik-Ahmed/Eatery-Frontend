import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Items } from '../inventoryComponent/VendorItems';

type DrawerProps = {
  selectedItems: Items[];
  removeItem: (index: number) => void;
};

export function DrawerExample({ selectedItems, removeItem }: DrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  // Quantity state for each item
  const [quantities, setQuantities] = useState<number[]>(
    Array(selectedItems.length).fill(1)
  );

  // Handle quantity change
  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  // Calculate total cost of all items
  const totalCost = selectedItems.reduce(
    (acc, item, index) => acc + item.Cost * quantities[index],
    0
  );

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} _hover={{ bg: '#ff5841' }}>
        <FiShoppingCart />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>

          <DrawerBody>
            {selectedItems.length === 0 ? (
              <p>No items in the cart</p>
            ) : (
              selectedItems.map((item, index) => (
                <div key={index} className="mb-4 border-b pb-2">
                  <p>
                    <strong>Name:</strong> {item.Name}
                  </p>
                  <p>
                    <strong>Cost(p/u):</strong> {item.Cost} Taka
                  </p>

                  <div className="my-2">
                    <label>Unit: </label>
                    <Select placeholder="Select unit" size="sm">
                      <option value="kg">K.G</option>
                      <option value="liter">Liter</option>
                    </Select>
                  </div>

                  <div className="my-2">
                    <label>Quantity: </label>
                    <Input
                      type="number"
                      size="sm"
                      min={1}
                      value={quantities[index]}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                    />
                  </div>

                  <div className="my-2">
                    <label>Delivery Date: </label>
                    <Input
                      type="date"
                      size="sm"
                      min={format(new Date(), 'yyyy-MM-dd')} // Using date-fns to format the date
                    />
                  </div>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}

            {/* Total Cost Section */}
            {selectedItems.length > 0 && (
              <div className="mt-4 font-bold text-lg">
                <p>Total Cost: {totalCost} Taka</p>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue">Checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
