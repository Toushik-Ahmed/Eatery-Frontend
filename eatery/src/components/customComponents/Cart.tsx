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
  useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Items } from '../inventoryComponent/VendorItems';

type DrawerProps = {
  selectedItems: Items[];
  removeItem: (index: number) => void;
  setSelectedItems: React.Dispatch<React.SetStateAction<Items[]>>;
};

export interface CartData {
  Name: string;
  Unit: string;
  Quantity: number;
  DeliveryDate: string;
}

export function DrawerExample({
  selectedItems,
  removeItem,
  setSelectedItems,
}: DrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [units, setUnits] = useState<string[]>(
    Array(selectedItems.length).fill('')
  );
  const [deliveryDates, setDeliveryDates] = useState<string[]>(
    Array(selectedItems.length).fill(format(new Date(), 'yyyy-MM-dd'))
  );
  const [quantities, setQuantities] = useState<number[]>(
    Array(selectedItems.length).fill(1)
  );
  const [checkoutData, setCheckoutData] = useState<CartData[]>([]);

  // Handle quantity change
  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  // Handle unit change
  const handleUnitChange = (index: number, value: string) => {
    const newUnits = [...units];
    newUnits[index] = value;
    setUnits(newUnits);
  };

  // Handle delivery date change
  const handleDeliveryDateChange = (index: number, value: string) => {
    const newDates = [...deliveryDates];
    newDates[index] = value;
    setDeliveryDates(newDates);
  };

  // Checkout function
  const handleCheckout = () => {
    const cartData = selectedItems.map((item, index) => ({
      Name: item.Name,
      Unit: units[index],
      Quantity: quantities[index],
      DeliveryDate: deliveryDates[index],
    }));

    setCheckoutData(cartData);
    console.log('Checkout data:', cartData);

    // Display toast message
    toast({
      title: 'Order placed.',
      status: 'success',
      position: 'top-right',
      duration: 3000, // 3 seconds
      isClosable: true,
    });

    // Clear the cart after checkout
    setSelectedItems([]);

    // Clear all input fields
    setCheckoutData([]);
    setUnits(Array(selectedItems.length).fill(''));
    setQuantities(Array(selectedItems.length).fill(1));
    setDeliveryDates(
      Array(selectedItems.length).fill(format(new Date(), 'yyyy-MM-dd'))
    );
  };

  // Clear cart on cancel
  const handleCancel = () => {
    setSelectedItems([]);
    onClose();
  };

  // Calculate total cost of all items
  const totalCost = selectedItems.reduce(
    (acc, item, index) => acc + item.Cost * (quantities[index] || 1),
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
                    <strong>Cost (p/u):</strong> {item.Cost} Taka
                  </p>

                  <div className="my-2">
                    <label>Unit: </label>
                    <Select
                      placeholder="Select unit"
                      size="sm"
                      value={units[index] || ''}
                      onChange={(e) => handleUnitChange(index, e.target.value)}
                    >
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
                      defaultValue={1}
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
                      min={format(new Date(), 'yyyy-MM-dd')}
                      value={deliveryDates[index]}
                      onChange={(e) =>
                        handleDeliveryDateChange(index, e.target.value)
                      }
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
            {selectedItems.length > 0 && (
              <div className="mt-4 font-bold text-lg">
                <p>Total Cost: {totalCost} Taka</p>
              </div>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleCancel}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCheckout}>
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
