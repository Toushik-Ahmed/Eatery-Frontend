"use client";
import { placeOrder } from "@/redux/Pos/PlaceOrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { MdOutlineAccessTime } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

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
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const listOfItems = useSelector((state: RootState) => state.orderInfo);

  const calculateUnitPrice = () => {
    listOfItems.orderedItems.forEach((item) => {
      const itemId = item.uniqueKey;
      const selectedSize = item.size.find(
        (s) => s.sizeName === selectedSizes[itemId]
      );
      const sizePrice = selectedSize ? selectedSize.sellingPrice : 0;
      setUnitPrice(sizePrice);
    });
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
      tableNo: 7,
      tableStatus: "Occupied",
      menuItems: listOfItems.orderedItems.map((item) => ({
        itemName: item.name || "",
        quantity: quantities[item.uniqueKey] || 1,
        selectedSize: selectedSizes[item.uniqueKey],
        unitPrice: unitPrice,
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
        h={["60vh", "70vh", "75vh", "80vh"]}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        overflowY={"auto"}
        
      >
        <Text py={"4"} fontWeight={"bold"}>
          Order Summary
        </Text>
        {listOfItems.orderedItems.map((item) => (
          <Box
            key={`${item.uniqueKey}`}
            w={["85vw", "65vw", "45vw", "19vw"]}
            p={["2", "3", "4"]}
            borderWidth="1px"
            borderRadius="md"
            borderColor={"gray-200"}
            rounded={"md"}
            mb={"1vh"}
          >
            <Flex>
              <Box>
                <Text fontWeight={"bold"}>{item.name}</Text>
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
                    textColor={"#ff5841"}
                    _hover={{ background: "red.500", textColor: "white" }}
                    borderWidth={"1px"}
                    borderRadius={"6px"}
                    borderColor={"#ff5841"}
                    onClick={() =>
                      handleQuantityChange(item.uniqueKey, "decrement")
                    }
                  >
                    <FiMinus/>
                  </Button>
                  <Center w={"8"}>
                    <Text>{quantities[`${item.uniqueKey}`] || 1}</Text>
                  </Center>

                  <Button
                    size={"sm"}
                    bg={"none"}
                    textColor={"#ff5841"}
                    _hover={{ background: "green.500", textColor: "white" }}
                    borderWidth={"1px"}
                    borderRadius={"6px"}
                    borderColor={"#ff5841"}
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
                color="#ff5841"
                mt={"2"}
                onClick={() => handleDeleteItem(item.uniqueKey)}
              >
                <Icon as={RiDeleteBin6Fill} />
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
            bg="#f53e62"
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
