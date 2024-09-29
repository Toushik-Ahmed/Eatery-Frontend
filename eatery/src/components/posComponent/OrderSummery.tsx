"use client";
import { placeOrder } from "@/redux/Pos/PlaceOrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";

import {
  Button,
  Box,
  Flex,
  HStack,
  Spacer,
  Text,
  Center,
  Icon,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromOrder, resetOrderInfo } from "@/redux/Pos/OrderSlice";
import { useRouter } from "next/navigation";
import { OrderDetails } from "@/redux/Pos/PlaceOrderSlice";
import Size from "./Size";

import { FiMinus, FiPlus } from "react-icons/fi";
type Props = {};

const OrderSummery = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const selectedSizes = useSelector(
    (state: RootState) => state.orderInfo.selectedSizes
  );
  const selectedAddons = useSelector(
    (state: RootState) => state.orderInfo.selectedAddons
  );

  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [totalPrices, setTotalPrices] = useState<{ [key: string]: number }>({});
  const [preparationTime, setPreparationTime] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<{ [key: string]: number }>({});
  const listOfItems = useSelector((state: RootState) => state.orderInfo);

  const table = useSelector((state: RootState) => state.placeOrder);

  const calculateUnitPrice = () => {
    const newUnitPrices: { [key: string]: number } = {};

    listOfItems.orderedItems.forEach((item) => {
      const itemId = item.uniqueKey;
      const selectedSize = item.size.find(
        (s) => s.sizeName === selectedSizes[itemId]
      );
      const sizePrice = selectedSize ? selectedSize.sellingPrice : 0;

      newUnitPrices[itemId] = sizePrice;
    });

    setUnitPrice(newUnitPrices);
  };

  const calculateTotalPrice = () => {
    const newTotalPrices: { [key: string]: number } = {};

    listOfItems.orderedItems.forEach((item) => {
      const itemId = item.uniqueKey;
      const selectedSize = item.size.find(
        (s) => s.sizeName === selectedSizes[itemId]
      );
      const sizePrice = selectedSize ? selectedSize.sellingPrice : 0;
      const addonPrices =
        selectedAddons[itemId]?.reduce((acc, addonName) => {
          const addonPrice =
            selectedSize?.addOns.find((addon) => addon.name === addonName)
              ?.addonPrice || 0;
          return acc + addonPrice;
        }, 0) || 0;

      const quantity = quantities[itemId] || 1;

      const totalPrice = (sizePrice + addonPrices) * quantity;
      newTotalPrices[itemId] = totalPrice;
    });
    setTotalPrices(newTotalPrices);
  };
  const calculatePreparationTime = () => {
    let maxPreparationTime = 0;
    listOfItems.orderedItems.forEach((item) => {
      const itemId = item.uniqueKey;
      const selectedSize = item.size.find(
        (s) => s.sizeName === selectedSizes[itemId]
      );
      if (selectedSize) {
        maxPreparationTime = Math.max(
          maxPreparationTime,
          selectedSize.preparationTime
        );
      }
    });
    setPreparationTime(maxPreparationTime);
  };

  const handleQuantityChange = (
    uniqueKey: string,
    action: "increment" | "decrement"
  ) => {
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
  const handleDeleteItem = (uniqueKey: string) => {
    dispatch(removeItemFromOrder({ uniqueKey }));

    setQuantities((prev) => {
      const { [uniqueKey]: _, ...rest } = prev;
      return rest;
    });
    setTotalPrices((prev) => {
      const { [uniqueKey]: _, ...rest } = prev;
      return rest;
    });
  };
  useEffect(() => {
    calculateUnitPrice();
    calculateTotalPrice();
    calculatePreparationTime();
  }, [selectedSizes, selectedAddons, quantities, listOfItems.orderedItems]);

  const handleSendOrder = () => {
    const orderDetails: OrderDetails = {
      tableNo: table.orderDetails.tableNo,
      tableStatus: table.orderDetails.tableStatus,
      menuItems: listOfItems.orderedItems.map((item) => ({
        itemName: item.itemName || "",
        quantity: quantities[item.uniqueKey] || 1,
        selectedSize: selectedSizes[item.uniqueKey],
        unitPrice: unitPrice[item.uniqueKey],
        sellingPrice: totalPrices[item.uniqueKey] || 0,
        ingredients:
          item.size.find((s) => s.sizeName === selectedSizes[item.uniqueKey])
            ?.ingredients || [],
        addOns:
          selectedAddons[item.uniqueKey]?.map((addonName) => {
            const selectedSize = item.size.find(
              (s) => s.sizeName === selectedSizes[item.uniqueKey]
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
      preparationTime,
      totalPrice: Object.values(totalPrices).reduce(
        (acc, curr) => acc + curr,
        0
      ),
    };
    dispatch(placeOrder(orderDetails));

    router.push(`/invoice`);
    dispatch(resetOrderInfo());
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      bg={"#fffff6"}
      w={["fit", "fit", "40vw", "20vw"]}
      h={["fit", "fit", "fit", "fit"]}
    >
      <Box
        h={["60vh", "70vh", "70vh", "80vh"]}
        display={"flex"}
        flexDirection={"column"}
        overflowY={"auto"}
      >
        <Flex mx={"3"}>
          <Text fontSize={"lg"} py={"4"} fontWeight={"semibold"}>
            Current Order
          </Text>
          <Spacer />
          <Text fontSize={"md"} py={"4"} fontWeight={"semibold"}>
            Table {table.orderDetails.tableNo}
          </Text>
        </Flex>
        {listOfItems.orderedItems.map((item) => (
          <Box
            key={`${item.uniqueKey}`}
            p={["2", "3", "2"]}
            borderWidth="1px"
            borderRadius="md"
            borderColor={"gray-200"}
            rounded={"md"}
            mx={"2"}
            mb={"1vh"}
          >
            <Flex>
              <Box>
                <Text fontSize={"md"} fontWeight={"semibold"}>
                  {item.itemName}
                </Text>
              </Box>
              <Spacer />
              <Text fontWeight={"bold"}>
                ${totalPrices[`${item.uniqueKey}`]?.toFixed(2) || "0.00"}
              </Text>
            </Flex>
            <Flex>
              <Size itemId={item.uniqueKey} sizes={item.size} />
              <Spacer />
              <Box mt={"2"}>
                <Flex alignItems={"center"}>
                  <Button
                    size={"sm"}
                    bg={"none"}
                    textColor={"black"}
                    _hover={{borderColor: "#d91a40", textColor: "#d91a40" }}
                    borderWidth={"2px"}
                    borderRadius={"4px"}
                    borderColor={"gray.400"}
                    onClick={() =>
                      handleQuantityChange(item.uniqueKey, "decrement")
                    }
                  >
                    <FiMinus />
                  </Button>
                  <Center w={"8"}>
                    <Text>{quantities[`${item.uniqueKey}`] || 1}</Text>
                  </Center>

                  <Button
                    size={"sm"}
                    bg={"none"}
                    textColor={"black"}
                    _hover={{borderColor: "#38cf38", textColor: "#38cf38" }}
                    borderWidth={"2px"}
                    borderRadius={"4px"}
                    borderColor={"gray.400"}
                    onClick={() =>
                      handleQuantityChange(item.uniqueKey, "increment")
                    }
                  >
                    <FiPlus />
                  </Button>
                </Flex>
              </Box>
            </Flex>
            <Flex justifyContent={"flex-end"}>
              <Box
                as="button"
                borderRadius="md"
                bg="white"
                color="#d91a40"
                mt={"2"}
                onClick={() => handleDeleteItem(item.uniqueKey)}
                fontSize={"xl"}
              >
                <Icon as={RiDeleteBin2Fill} />
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
      <Box py={["2", "4", "4", "8"]} px={"4"} borderTop={"1px"}>
        <HStack spacing="1">
          <Box>
            <Box>
              <Icon as={MdOutlineAccessTime} /> : {preparationTime || 0} mins
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
            bg="#d91a40"
            color="white"
            p={["1", "1", "2"]}
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
