import { postOrder } from '@/redux/inventory/AddIngredientsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
import { MdDeleteForever } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

type DrawerProps = {
  removeItem: (index: number) => void;
  cartData: CartData[];
  setCartData: React.Dispatch<React.SetStateAction<CartData[]>>;
  handleSearch: () => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export interface CartData {
  ingredient: string;
  unit: string;
  quantity: number;
  price: number;
  deliveryDate: string;
}
export interface OrderHistory {
  ingredients: CartData[];
  cost: number;
}

export function DrawerExample({
  removeItem,
  cartData,
  setCartData,
  handleSearch,
  search,
  setSearch,
}: DrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const [orderHistory, setOrderHistory] = useState<OrderHistory | undefined>();
  const dispatch = useDispatch<AppDispatch>();
  const oderedData = useSelector(
    (state: RootState) => state.addIngredients.ingredients
  );

  // Handle quantity change
  const handleQuantityChange = (index: number, value: number) => {
    setCartData((data) => {
      return data.map((el, idx) =>
        idx === index ? { ...el, quantity: value } : { ...el }
      );
    });
  };

  // Handle unit change
  const handleUnitChange = (index: number, value: string) => {
    setCartData((data) => {
      return data.map((el, idx) =>
        idx === index ? { ...el, unit: value } : { ...el }
      );
    });
  };

  // Handle delivery date change
  const handleDeliveryDateChange = (index: number, value: string) => {
    setCartData((data) => {
      return data.map((el, idx) =>
        idx === index ? { ...el, deliveryDate: value } : { ...el }
      );
    });
  };

  // Calculate total cost of all items
  const calculateTotalCost = () => {
    return cartData.reduce((acc, curr) => {
      return acc + curr.quantity * curr.price;
    }, 0);
  };

  // Checkout function
  const handleCheckout = () => {
    const checkOutData = cartData.map((item) => ({
      ingredient: item.ingredient,
      unit: item.unit,
      quantity: item.quantity,
      deliveryDate: item.deliveryDate,
      price: item.price,
    }));
    console.log('Checkout data:', cartData);
    const totalCost = calculateTotalCost();

    const newOrderHistory: OrderHistory = {
      ingredients: checkOutData,
      cost: totalCost,
    };
    setOrderHistory(newOrderHistory);
    dispatch(postOrder(newOrderHistory));
    setCartData(checkOutData);
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
    setCartData([]);
  };

  // Clear cart on cancel
  const handleCancel = () => {
    setCartData([]);
    onClose();
  };

  // Handle remove item
  const handleRemoveItem = (index: number) => {
    removeItem(index);
  };

  return (
    <>
      <Box>
        <Flex gap={2}>
          <InputGroup w={'8vw'} borderRadius="28px">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search database"
                icon={<IoIosSearch />}
                size="sm"
                onClick={handleSearch}
              />
            </InputRightElement>
          </InputGroup>
          <Spacer />

          <Button
            ref={btnRef}
            onClick={onOpen}
            _hover={{ bg: '#f53e62', color: 'white' }}
          >
            <div className="mx-2">View Cart</div>
            <FiShoppingCart />
          </Button>
        </Flex>
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
              <Box>
                {cartData.length === 0 ? (
                  <p>No items in the cart</p>
                ) : (
                  cartData.map((item, index) => (
                    <div key={index} className="mb-4 border-b pb-2 ">
                      <p>
                        <strong>Name:</strong> {item.ingredient}
                      </p>
                      <p>
                        <strong>Cost (p/u):</strong> {item.price} Taka
                      </p>

                      <div className="my-2 flex flex-col gap-2 ">
                        <label className="font-bold">Unit: </label>
                        <Select
                          placeholder="Select unit"
                          size="sm"
                          value={item.unit || ''}
                          onChange={(e) =>
                            handleUnitChange(index, e.target.value)
                          }
                        >
                          <option value="K.G">K.G</option>
                          <option value="Liter">Liter</option>
                          <option value="Gram">Gram</option>
                          <option value="Piece">Pieces</option>
                        </Select>
                      </div>

                      <div className="my-2">
                        <label className="font-bold">Quantity: </label>
                        <Input
                          type="number"
                          size="sm"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>

                      <div className="my-2">
                        <label className="font-bold">Delivery Date: </label>
                        <Input
                          type="date"
                          size="sm"
                          min={format(new Date(), 'yyyy-MM-dd')}
                          value={item.deliveryDate || ''}
                          onChange={(e) =>
                            handleDeliveryDateChange(index, e.target.value)
                          }
                        />
                      </div>
                      <Button
                        w={'fitContent'}
                        border={'none'}
                        variant="outline"
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <MdDeleteForever />
                      </Button>
                    </div>
                  ))
                )}
              </Box>
              {cartData.length > 0 && (
                <div className="mt-4 font-bold text-lg">
                  <p>Total Cost: {calculateTotalCost()} Taka</p>
                </div>
              )}
            </DrawerBody>

            <DrawerFooter justifyContent={'space-between'}>
              <Button
                variant="outline"
                colorScheme="#852e22"
                color={'#852e22'}
                mr={3}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleCheckout}>
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}
