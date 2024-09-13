import { RootState } from "@/redux/store";
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
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

const OrderSummery = (props: Props) => {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>(
    {}
  );
  const [selectedAddons, setSelectedAddons] = useState<{
    [key: number]: string[];
  }>({});
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [totalPrices, setTotalPrices] = useState<{ [key: number]: number }>({});

  const listOfItems = useSelector((state: RootState) => state.orderInfo);

 
  const calculateTotalPrice = () => {
    const newTotalPrices: { [key: number]: number } = {};

    listOfItems.orderedItems.forEach((item) => {
      const selectedSize = item.size.find(
        (s) => s.sizeName === selectedSizes[item.id]
      );
      const sizePrice = selectedSize ? selectedSize.sellingPrice : 0;

      const addonPrices =
        selectedAddons[item.id]?.reduce((acc, addonName) => {
          const addonPrice =
            selectedSize?.addOns.find((addon) => addon.name === addonName)
              ?.addonPrice || 0;
          return acc + addonPrice;
        }, 0) || 0;

      const quantity = quantities[item.id] || 1;
      const totalPrice = (sizePrice + addonPrices) * quantity;

      newTotalPrices[item.id] = totalPrice;
    });

    setTotalPrices(newTotalPrices);
  };

  const handleSizeChange = (itemId: number, sizeName: string) => {
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [itemId]: sizeName,
    }));
  };


  const handleAddonChange = (
    itemId: number,
    addonName: string,
    isChecked: boolean
  ) => {
    setSelectedAddons((prevAddons) => {
      const currentAddons = prevAddons[itemId] || [];
      let newAddons = isChecked
        ? [...currentAddons, addonName]
        : currentAddons.filter((addon) => addon !== addonName);

      return {
        ...prevAddons,
        [itemId]: newAddons,
      };
    });
  };

  
  const handleQuantityChange = (
    itemId: number,
    action: "increment" | "decrement"
  ) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[itemId] || 1;
      const newQuantity =
        action === "increment"
          ? currentQuantity + 1
          : Math.max(1, currentQuantity - 1);

      return {
        ...prevQuantities,
        [itemId]: newQuantity,
      };
    });
  };


  useEffect(() => {
    calculateTotalPrice();
  }, [selectedSizes, selectedAddons, quantities]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      bg={"#FFFFF6"}
      w={"20vw"}
      h={"90vh"}
    >
      <Box
        h={"80vh"}
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
            key={item.id}
            w={"19vw"}
            p={"4"}
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
                ${totalPrices[item.id]?.toFixed(2) || "0.00"}
              </Text>
            </Flex>

            <Flex>
              <Box>
                <Select
                  placeholder="Size"
                  size={"sm"}
                  mt={"2"}
                  onChange={(e) => handleSizeChange(item.id, e.target.value)}
                  value={selectedSizes[item.id] || ""}
                >
                  {item.size.map((s) => (
                    <option value={s.sizeName} key={s.sizeName}>
                      {s.sizeName}
                    </option>
                  ))}
                </Select>

                {selectedSizes[item.id] && (
                  <Box mt={"2"}>
                    <Text fontSize="sm" color="gray.900">
                      Size: {selectedSizes[item.id]}
                    </Text>
                  </Box>
                )}

                {selectedSizes[item.id] && (
                  <VStack align={"start"} mt={"2"}>
                    <Text fontSize="sm" color="gray.900">
                      Add-ons:
                    </Text>
                    {item.size
                      .find((s) => s.sizeName === selectedSizes[item.id])
                      ?.addOns.map((addon) => (
                        <Checkbox
                          key={addon.name}
                          isChecked={selectedAddons[item.id]?.includes(
                            addon.name
                          )}
                          onChange={(e) =>
                            handleAddonChange(
                              item.id,
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
                    onClick={() => handleQuantityChange(item.id, "decrement")}
                  >
                    -
                  </Button>

                  <Center w={"8"}>
                    <Text>{quantities[item.id] || 1}</Text>
                  </Center>

                  <Button
                    size={"sm"}
                    bg={"none"}
                    textColor={"#ff5841"}
                    _hover={{ background: "green", textColor: "white" }}
                    borderWidth={"1px"}
                    borderRadius={"6px"}
                    borderColor={"#ff5841"}
                    onClick={() => handleQuantityChange(item.id, "increment")}
                  >
                    +
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
      <Box p={"6"} borderTop={"1px"} h={"10vh"}>
        <HStack spacing="1">
          <Box fontWeight={"bold"} w={"fit-content"}>
            Total: $
            {Object.values(totalPrices)
              .reduce((acc, curr) => acc + curr, 0)
              .toFixed(2)}
          </Box>
          <Spacer />
          <Box
            as="button"
            borderRadius="md"
            bg="#ff5841"
            color="white"
            h={10}
            p={"2"}
          >
            Send Order
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderSummery;
