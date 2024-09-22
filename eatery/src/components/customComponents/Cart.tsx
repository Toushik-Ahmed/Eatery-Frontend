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
  Grid,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Spacer,
  Text,
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

      status: 'success',
      position: 'top-right',
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box color="white" p={3} bg='#f53e62' >
          <Box> Order placed successfully</Box>
          Total cost: ${totalCost}
        </Box>
      ),
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
        <Flex gap={4}>
          <InputGroup w={'10vw'} borderRadius="28px" boxShadow="md">
            <Input
              placeholder="Search items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              borderRadius="full"
              _placeholder={{ color: 'gray.400' }}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search database"
                icon={<IoIosSearch />}
                size="sm"
                bg="#f53e62"
                color="white"
                borderRadius="full"
                _hover={{ bg: '#f53e62' }}
                onClick={handleSearch}
              />
            </InputRightElement>
          </InputGroup>
          <Spacer />
          <Button
            ref={btnRef}
            onClick={onOpen}
            bg="white"
            color="black"
            _hover={{ color: 'black', bg: '#f53e62' }}
            borderRadius="full"
            boxShadow="md"
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
          size={'xl'}
        >
          <DrawerOverlay />
          <DrawerContent bg="gray.50">
            <DrawerCloseButton />
            <DrawerHeader>Your Cart</DrawerHeader>
            <DrawerBody>
              <Box>
                {cartData.length === 0 ? (
                  <Text fontSize="lg" color="gray.500">
                    No items in the cart
                  </Text>
                ) : (
                  <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    {cartData.map((item, index) => (
                      <Box
                        key={index}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        bg="white"
                        boxShadow="sm"
                        transition="transform 0.2s"
                        _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                      >
                        <Text fontWeight="bold">{item.ingredient}</Text>
                        <Text color="gray.600">
                          Cost (p/u): {item.price} Taka
                        </Text>
                        <Box mt={2}>
                          <label className="font-bold">Unit: </label>
                          <Select
                            placeholder="Select unit"
                            size="sm"
                            value={item.unit || ''}
                            onChange={(e) =>
                              handleUnitChange(index, e.target.value)
                            }
                            bg="gray.100"
                            _hover={{ bg: 'gray.200' }}
                          >
                            <option value="K.G">K.G</option>
                            <option value="Liter">Liter</option>
                            <option value="Gram">Gram</option>
                            <option value="Piece">Pieces</option>
                          </Select>
                        </Box>
                        <Box mt={2}>
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
                            bg="gray.100"
                            _hover={{ bg: 'gray.200' }}
                          />
                        </Box>
                        <Box mt={2}>
                          <label className="font-bold">Delivery Date: </label>
                          <Input
                            type="date"
                            size="sm"
                            min={format(new Date(), 'yyyy-MM-dd')}
                            value={item.deliveryDate || ''}
                            onChange={(e) =>
                              handleDeliveryDateChange(index, e.target.value)
                            }
                            bg="gray.100"
                            _hover={{ bg: 'gray.200' }}
                          />
                        </Box>
                        <Button
                          mt={4}
                          w={'fit-content'}
                          border="none"
                          variant="solid"
                          size="xs"
                          colorScheme="red"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <MdDeleteForever />
                        </Button>
                      </Box>
                    ))}
                  </Grid>
                )}
              </Box>
              {cartData.length > 0 && (
                <Box mt={6} fontWeight="bold" fontSize="lg">
                  <Text>Total Cost: {calculateTotalCost()} $</Text>
                </Box>
              )}
            </DrawerBody>
            <DrawerFooter justifyContent={'space-between'}>
              <Button
                variant="outline"
                borderColor="red.500"
                color="red.500"
                mr={3}
                _hover={{ bg: 'red.100' }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                bg="#f53e62"
                color="white"
                _hover={{ color: 'black' }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}
