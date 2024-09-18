import { postOrder } from '@/redux/inventory/AddIngredientsSlice';
import { AppDispatch, RootState } from '@/redux/store';
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
import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Items } from '../inventoryComponent/VendorItems';

type DrawerProps = {
  selectedItems: Items[];
  removeItem: (index: number) => void;
  setSelectedItems: React.Dispatch<React.SetStateAction<Items[]>>;
};

export interface CartData {
  ingredient: string;
  unit: string;
  quantity: number;
  deliveryDate: string;
}
export interface OrderHistory {
  ingredients: CartData[];
  cost: number;
}

export function DrawerExample({
  selectedItems,
  removeItem,
  setSelectedItems,
}: DrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [units, setUnits] = useState<string[]>([]);
  const [deliveryDates, setDeliveryDates] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [checkoutData, setCheckoutData] = useState<CartData[]>([]);
  const [orderHistory, setOrderHistory] = useState<OrderHistory | undefined>();
  const dispatch = useDispatch<AppDispatch>();
  const oderedData = useSelector(
    (state: RootState) => state.addIngredients.ingredients
  );

  // Update state arrays when selectedItems changes
  useEffect(() => {
    setUnits(selectedItems.map(() => ''));
    setQuantities(selectedItems.map(() => 0));
    setDeliveryDates(selectedItems.map(() => ''));
  }, [selectedItems]);

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

  // Calculate total cost of all items
  const calculateTotalCost = () => {
    return selectedItems.reduce(
      (acc, item, index) => acc + (item.price || 0) * (quantities[index] || 1),
      0
    );
  };

  // Checkout function
  const handleCheckout = () => {
    const cartData = selectedItems.map((item, index) => ({
      ingredient: item.itemName,
      unit: units[index],
      quantity: quantities[index],
      deliveryDate: deliveryDates[index],
    }));

    const totalCost = calculateTotalCost();

    const newOrderHistory: OrderHistory = {
      ingredients: cartData,
      cost: totalCost,
    };

    setOrderHistory(newOrderHistory);
    dispatch(postOrder(newOrderHistory));
    setCheckoutData(cartData);

    console.log('Checkout data:', cartData);
    console.log('Order history:', newOrderHistory);

    toast({
      title: 'Order placed.',
      description: `Total cost: ${totalCost} Taka`,
      status: 'success',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });

    setSelectedItems([]);
    setCheckoutData([]);
    setUnits([]);
    setQuantities([]);
    setDeliveryDates([]);
  };

  // Clear cart on cancel
  const handleCancel = () => {
    setSelectedItems([]);
    onClose();
  };

  // Handle remove item
  const handleRemoveItem = (index: number) => {
    removeItem(index);

    // Update the state arrays
    const newUnits = [...units];
    newUnits.splice(index, 1);
    setUnits(newUnits);

    const newQuantities = [...quantities];
    newQuantities.splice(index, 1);
    setQuantities(newQuantities);

    const newDates = [...deliveryDates];
    newDates.splice(index, 1);
    setDeliveryDates(newDates);
  };

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
                    <strong>Name:</strong> {item.itemName}
                  </p>
                  <p>
                    <strong>Cost (p/u):</strong> {item.price} Taka
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

                      value={quantities[index] }
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
                      value={deliveryDates[index] || ''}
                      onChange={(e) =>
                        handleDeliveryDateChange(index, e.target.value)
                      }
                    />
                  </div>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}
            {selectedItems.length > 0 && (
              <div className="mt-4 font-bold text-lg">
                <p>Total Cost: {calculateTotalCost()} Taka</p>
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
