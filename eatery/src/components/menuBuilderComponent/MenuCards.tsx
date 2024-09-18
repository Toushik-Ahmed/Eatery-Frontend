

"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../customComponents/CustomCard";
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
import { getmenuItems, MenuItem } from "@/redux/Pos/MenuItemSlice";

type Props = {};

const Cards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [mealTime, setMealTime] = useState<string>("All Items");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false); // Drawer state
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null); // Selected item for drawer
  const [selectedSize, setSelectedSize] = useState<number>(0); // Selected size

  useEffect(() => {
    dispatch(getmenuItems());
  }, [dispatch]);

  const list = useSelector((state: RootState) => state.allItem);
  const allItems = list.allItems;
  
  const [availableItems, setAvailableItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (mealTime === "All Items") {
      setAvailableItems(allItems); 
    } else {
      const filteredItems = allItems.filter((item:any) => item.mealTime.includes(mealTime));
      setAvailableItems(filteredItems);
    }
  }, [mealTime, allItems]);

  const handleOpenDrawer = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedSize(0); // Default to the first size
    setIsDrawerOpen(true); // Open the drawer
  };

  const handleDelete = () => {
    // Handle delete logic here if needed
    console.log("Item deleted");
    setIsDrawerOpen(false); // Close the drawer after deletion
  };

  const categories = Array.from(new Set(allItems.map((item:any) => item.category)));

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
                {/* Meal Time Buttons */}
                {["All Items", "All Day", "Breakfast", "Lunch", "Dinner"].map(
                  (time) => (
                    <Button
                      key={time}
                      bg={mealTime === time ? "#ff5841" : "white"}
                      textColor={mealTime === time ? "white" : "black"}
                      onClick={() => setMealTime(time)}
                      _hover={{ background: "#ff5841", textColor: "white" }}
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
                    textColor={"#ff5841"}
                  >
                    {category}
                  </Text>

                  <Grid
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(6, 1fr)",
                    }}
                    gap={8}
                  >
                    {availableItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <CustomCard
                          key={item.id}
                          name={item.name}
                          size={item.size}
                          image={item.image}
                          onClick={() => handleOpenDrawer(item)} // Open the drawer on card click
                        />
                      ))}
                  </Grid>
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
          selectedItem={selectedItem}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          onDelete={handleDelete} // Handle item deletion
        />
      )}
    </Box>
  );
};

export default Cards;
