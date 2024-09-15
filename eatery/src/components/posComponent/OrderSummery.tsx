import { addPlaceOrderInfo } from "@/redux/Pos/PlaceOrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {
  Button,
  Box,
  Flex,
  HStack,
  Spacer,
  Select,
  Text,
  Center,
  Checkbox,
  VStack,
  Icon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromOrder } from "@/redux/Pos/OrderSlice";

type Props = {};

interface OrderDetails {
  table_no: number;
  menu_items: {
    itemName: string;
    quantity: number;
    selectedSize: string;
    itemPrice: number;
    ingredients: {
      name: string;
      properties: {
        quantity: number;
        unit: string;
      };
    }[];
    addOns: {
      name: string;
      quantity: number;
      unit: string;
      addonPrice: number;
    }[];
  }[];
  preparationTime: number;
  totalPrice: number;
}

const OrderSummery = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedSizes, setSelectedSizes] = useState<{
    [key: string]: string;
  }>({});
  const [selectedAddons, setSelectedAddons] = useState<{
    [key: string]: string[];
  }>({});
  const [quantities, setQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [totalPrices, setTotalPrices] = useState<{
    [key: string]: number;
  }>({});
  const [preparationTime, setPreparationTime] = useState<{
    [key: string]: number;
  }>({});

  const listOfItems = useSelector((state: RootState) => state.orderInfo);
  const placeOrder = useSelector((state: RootState) => state.placeOrder);
  console.log(placeOrder);

  const calculateTotalPrice = () => {
    const newTotalPrices: { [key: string]: number } = {};

    listOfItems.orderedItems.forEach((item, index) => {
      const uniqueKey = `${item.id}-${index}`;

      const selectedSize = item.size.find(
        (s) => s.sizeName === selectedSizes[uniqueKey]
      );
      const sizePrice = selectedSize ? selectedSize.sellingPrice : 0;

      const addonPrices =
        selectedAddons[uniqueKey]?.reduce((acc, addonName) => {
          const addonPrice =
            selectedSize?.addOns.find((addon) => addon.name === addonName)
              ?.addonPrice || 0;
          return acc + addonPrice;
        }, 0) || 0;

      const quantity = quantities[uniqueKey] || 1;
      const totalPrice = (sizePrice + addonPrices) * quantity;

      newTotalPrices[uniqueKey] = totalPrice;
    });

    setTotalPrices(newTotalPrices);
  };

  const calculatePreparationTime = () => {
    let maxPreparationTime = 0;

    listOfItems.orderedItems.forEach((item, index) => {
      const uniqueKey = `${item.id}-${index}`;
      const selectedSize = item.size.find(
        (s) => s.sizeName === selectedSizes[uniqueKey]
      );

      if (selectedSize) {
        maxPreparationTime = Math.max(
          maxPreparationTime,
          selectedSize.preparationTime
        );
      }
    });

    setPreparationTime({ maxPreparationTime });
  };

  const handleSizeChange = (
    itemId: number,
    index: number,
    sizeName: string
  ) => {
    const uniqueKey = `${itemId}-${index}`;
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [uniqueKey]: sizeName,
    }));
  };

  const handleAddonChange = (
    itemId: number,
    index: number,
    addonName: string,
    isChecked: boolean
  ) => {
    const uniqueKey = `${itemId}-${index}`;
    setSelectedAddons((prevAddons) => {
      const currentAddons = prevAddons[uniqueKey] || [];
      let newAddons = isChecked
        ? [...currentAddons, addonName]
        : currentAddons.filter((addon) => addon !== addonName);

      return {
        ...prevAddons,
        [uniqueKey]: newAddons,
      };
    });
  };

  const handleQuantityChange = (
    itemId: number,
    index: number,
    action: "increment" | "decrement"
  ) => {
    const uniqueKey = `${itemId}-${index}`;
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[uniqueKey] || 1;
      const newQuantity =
        action === "increment"
          ? currentQuantity + 1
          : Math.max(1, currentQuantity - 1);

      return {
        ...prevQuantities,
        [uniqueKey]: newQuantity,
      };
    });
  };

  const handleDeleteItem = (itemId: number, index: number) => {
    dispatch(removeItemFromOrder({ itemId, index }));
  };

  useEffect(() => {
    calculateTotalPrice();
    calculatePreparationTime();
  }, [selectedSizes, selectedAddons, quantities]);

  const handleSendOrder = () => {
    const orderDetails: OrderDetails = {
      table_no: 5,
      menu_items: listOfItems.orderedItems.map((item, index) => ({
        itemName: item.name,
        quantity: quantities[`${item.id}-${index}`] || 1,
        selectedSize: selectedSizes[`${item.id}-${index}`],
        itemPrice: totalPrices[`${item.id}-${index}`] || 0,
        ingredients:
          item.size.find(
            (s) => s.sizeName === selectedSizes[`${item.id}-${index}`]
          )?.ingredients || [],
        addOns:
          selectedAddons[`${item.id}-${index}`]?.map((addonName) => {
            const selectedSize = item.size.find(
              (s) => s.sizeName === selectedSizes[`${item.id}-${index}`]
            );
            const addon = selectedSize?.addOns.find(
              (addon) => addon.name === addonName
            );
            return {
              name: addon?.name || "",
              quantity: addon?.quantity || 0,
              unit: addon?.unit || "",
              addonPrice: addon?.addonPrice || 0,
            };
          }) || [],
      })),
      preparationTime: preparationTime.maxPreparationTime,
      totalPrice: Object.values(totalPrices).reduce(
        (acc, curr) => acc + curr,
        0
      ),
    };

    dispatch(addPlaceOrderInfo([orderDetails]));
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      bg={"#FFFFF6"}
      w={["90vw", "70vw", "40vw", "20vw"]}
      h={["70vh", "80vh", "85vh", "90vh"]}
    >
      <Box
        h={["60vh", "70vh", "75vh", "80vh"]}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        overflowY={"auto"}
      >
        <Text py={"4"} fontWeight={"bold"}>
          Order Summary
        </Text>
        {listOfItems.orderedItems.map((item, index) => (
          <Box
            key={`${item.id}-${index}`}
            w={["85vw", "65vw", "45vw", "19vw"]}
            p={["2", "3", "4"]}
            borderWidth="1px"
            borderRadius="md"
            borderColor={"gray-200"}
            rounded={"md"}
          >
            <Flex>
              <Box>
                <Text fontWeight={"bold"}>{item.name}</Text>
              </Box>
              <Spacer />
              <Text fontWeight={"bold"}>
                ${totalPrices[`${item.id}-${index}`]?.toFixed(2) || "0.00"}
              </Text>
            </Flex>

            <Flex>
              <Box>
                <Select
                  placeholder="Size"
                  size={"sm"}
                  mt={"2"}
                  onChange={(e) =>
                    handleSizeChange(item.id, index, e.target.value)
                  }
                  value={selectedSizes[`${item.id}-${index}`] || ""}
                >
                  {item.size.map((s) => (
                    <option value={s.sizeName} key={s.sizeName}>
                      {s.sizeName}
                    </option>
                  ))}
                </Select>

                {selectedSizes[`${item.id}-${index}`] && (
                  <Box mt={"2"}>
                    <Text fontSize="sm" color="gray.900">
                      Size: {selectedSizes[`${item.id}-${index}`]}
                    </Text>
                  </Box>
                )}

                {selectedSizes[`${item.id}-${index}`] && (
                  <VStack align={"start"} mt={"2"}>
                    <Text fontSize="sm" color="gray.900">
                      Add-ons:
                    </Text>
                    {item.size
                      .find(
                        (s) =>
                          s.sizeName === selectedSizes[`${item.id}-${index}`]
                      )
                      ?.addOns.map((addon) => (
                        <Checkbox
                          key={addon.name}
                          isChecked={selectedAddons[
                            `${item.id}-${index}`
                          ]?.includes(addon.name)}
                          onChange={(e) =>
                            handleAddonChange(
                              item.id,
                              index,
                              addon.name,
                              e.target.checked
                            )
                          }
                        >
                          {addon.name}
                        </Checkbox>
                      ))}
                  </VStack>
                )}
              </Box>

              <Spacer />
              <Box mt={"2"}>
                <Flex alignItems={"center"}>
                  <Button
                    size={"sm"}
                    bg={"none"}
                    textColor={"#ff5841"}
                    _hover={{ background: "red", textColor: "white" }}
                    borderWidth={"1px"}
                    borderRadius={"6px"}
                    borderColor={"#ff5841"}
                    onClick={() =>
                      handleQuantityChange(item.id, index, "decrement")
                    }
                  >
                    -
                  </Button>

                  <Center w={"8"}>
                    <Text>{quantities[`${item.id}-${index}`] || 1}</Text>
                  </Center>

                  <Button
                    size={"sm"}
                    bg={"none"}
                    textColor={"#ff5841"}
                    _hover={{ background: "green", textColor: "white" }}
                    borderWidth={"1px"}
                    borderRadius={"6px"}
                    borderColor={"#ff5841"}
                    onClick={() =>
                      handleQuantityChange(item.id, index, "increment")
                    }
                  >
                    +
                  </Button>
                </Flex>
              </Box>
            </Flex>
            <Box
              as="button"
              borderRadius="md"
              bg="white"
              color="#ff5841"
              mt={"2"}
              onClick={() => handleDeleteItem(item.id, index)}
            >
              <Icon as={RiDeleteBin6Fill} />
            </Box>
          </Box>
        ))}
      </Box>
      <Box p={"2"} borderTop={"1px"}>
        <HStack spacing="1">
          <Box>
            <Box>
              <Icon as={MdOutlineAccessTime} /> :{" "}
              {preparationTime.maxPreparationTime || 0} mins
            </Box>
            <Box fontWeight={"bold"} w={"fit-content"}>
              Total: $
              {Object.values(totalPrices)
                .reduce((acc, curr) => acc + curr, 0)
                .toFixed(2)}
            </Box>
          </Box>
          <Spacer />
          <Box
            as="button"
            borderRadius="md"
            bg="#ff5841"
            color="white"
            p={"2"}
            onClick={handleSendOrder}
          >
            Send Order
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderSummery;
