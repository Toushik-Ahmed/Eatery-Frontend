"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../customComponents/CustomCardForm";
import ItemDrawer from "../customComponents/ItemDrawer"; // Import the drawer

import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getmenuItems, MenuItem } from "@/redux/MenuBuilder/MenuCardSlice";

interface MealTime {
  mealtime: string;
}

type Props = {};

const Cards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [mealTime, setMealTime] = useState<string>("All Items");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<number>(0);

  useEffect(() => {
    dispatch(getmenuItems());
  }, [dispatch]);

  const list = useSelector((state: RootState) => state.cardItem);
  const allItems = list.allItems;

  const [availableItems, setAvailableItems] = useState<MenuItem[]>([]);
  console.log("B=====", availableItems);
  useEffect(() => {
    if (mealTime === "All Items") {
      setAvailableItems(allItems);
    } else {
      const filteredItems = allItems.filter((item: any) =>
        item.mealTime.some((m: MealTime) => m.mealtime === mealTime)
      );
      setAvailableItems(filteredItems);
    }
  }, [mealTime, allItems]);
  console.log("B=====", availableItems);

  const handleOpenDrawer = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedSize(0);
    setIsDrawerOpen(true);
  };

  const handleDelete = () => {
    console.log("Item deleted");
    setIsDrawerOpen(false);
  };

  const categories = Array.from(
    new Set(allItems.map((item: any) => item.category))
  );

  return (
    <Box mx={{ base: "2", md: "6", lg: "10" }}>
      <Text
        py={{ base: "4", md: "6" }}
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight={"semibold"}
      >
        Order Management
      </Text>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box
          borderWidth="1px"
          borderRadius="md"
          bg={"#f4f4f6"}
          w={{ base: "100vw", md: "75vw" }}
          h={{ base: "auto", md: "90vh" }}
          overflow={"auto"}
        >
          <Flex justifyContent={"center"}>
            <Box
              mt={"6"}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight={"semibold"}
            >
              <HStack spacing={{ base: 3, md: 6 }}>
                {["All Items", "All Day", "Breakfast", "Lunch", "Dinner"].map(
                  (time) => (
                    <Button
                      key={time}
                      bg={mealTime === time ? "#d91a40" : "white"}
                      textColor={mealTime === time ? "white" : "black"}
                      onClick={() => setMealTime(time)}
                      _hover={{ background: "#d91a40", textColor: "white" }}
                    >
                      {time}
                    </Button>
                  )
                )}
              </HStack>
            </Box>
          </Flex>
          <Box>
            {categories.map((category, index) => (
              <Box
                mx={{ base: "4", md: "8" }}
                mt={{ base: "4", md: "6" }}
                key={index}
              >
                <Stack spacing={{ base: "4", md: "6" }}>
                  <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight={"semiBold"}
                    w={"fit"}
                    textColor={"#d91a40"}
                  >
                    {category}
                  </Text>
                  <Flex gap={15} overflowX="auto" py={2}>
                    {availableItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <Box height="auto">
                          <CustomCard
                            key={item._id}
                            name={item.itemName}
                            size={item.size}
                            image={item.image}
                            onClick={() => handleOpenDrawer(item)} // Open the drawer on card click
                          />
                        </Box>
                      ))}
                  </Flex>
                  {/* </Grid> */}
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
        <Spacer />
      </Flex>

      {/* Drawer for Item Details */}
      {selectedItem && (
        <ItemDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          selectedItem={{
            ...selectedItem,
            mealTime: selectedItem.mealTime.map((m) => m.mealtime),
          }}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onDelete={handleDelete}
        />
      )}
    </Box>
  );
};
export default Cards;
