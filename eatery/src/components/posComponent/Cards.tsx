"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../customComponents/CustomCard";
import OrderSummery from "./OrderSummery";

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
import { addOrderInfo } from "@/redux/Pos/OrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getmenuItems, MenuItem } from "@/redux/Pos/MenuItemSlice";

interface MealTime {
  mealtime: string;
}

type Props = {};

const Cards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [meal, setMealTime] = useState<string>("All Items");

  useEffect(() => {
    dispatch(getmenuItems());
  }, [dispatch]);

  const list = useSelector((state: RootState) => state.allItem);
  const allItems = list.allItems;

  const [availableItems, setAvailableItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (meal === "All Items") {
      setAvailableItems(allItems);
    } else {
      const filteredItems = allItems.filter((item: any) =>
        item.mealTime.some((m: MealTime) => m.mealtime === meal)
      );
      setAvailableItems(filteredItems);
    }
  }, [meal, allItems]);

  let uniqueKeyCounter = 0;

  const handleSubmit = (item: MenuItem) => {
    const uniqueKey = uniqueKeyCounter++;

    const newItem = {
      ...item,
      uniqueKey,
    };
    dispatch(addOrderInfo([newItem]));
  };

  const categories = Array.from(
    new Set(allItems.map((item: any) => item.category))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

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
              mb={{ base: "4", md: "10" }}
            >
              <HStack spacing={{ base: 3, md: 6 }}>
                <Button
                  bg={meal === "All Items" ? "#ff5841" : "white"}
                  textColor={meal === "All Items" ? "white" : "black"}
                  onClick={() => setMealTime("All Items")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  All Items
                </Button>

                <Button
                  bg={meal === "All Day" ? "#ff5841" : "white"}
                  textColor={meal === "All Day" ? "white" : "black"}
                  onClick={() => setMealTime("All Day")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  All Day
                </Button>

                <Button
                  bg={meal === "Breakfast" ? "#ff5841" : "white"}
                  textColor={meal === "Breakfast" ? "white" : "black"}
                  onClick={() => setMealTime("Breakfast")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Breakfast
                </Button>

                <Button
                  bg={meal === "Lunch" ? "#ff5841" : "white"}
                  textColor={meal === "Lunch" ? "white" : "black"}
                  onClick={() => setMealTime("Lunch")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Lunch
                </Button>

                <Button
                  bg={meal === "Dinner" ? "#ff5841" : "white"}
                  textColor={meal === "Dinner" ? "white" : "black"}
                  onClick={() => setMealTime("Dinner")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Dinner
                </Button>
              </HStack>
            </Box>
          </Flex>
          <Flex>
            <Box
              p={"4"}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight={"semiBold"}
            >
              <Stack spacing={{ base: 3, md: 16 }}>
                {categories.map((category, index) => (
                  <Button
                    bg={category === selectedCategory ? "#ff5841" : "white"}
                    textColor={
                      category === selectedCategory ? "white" : "black"
                    }
                    _hover={{ background: "#ff5841", textColor: "white" }}
                    borderRadius={"full"}
                    w={"fit"}
                    onClick={() => setSelectedCategory(category)}
                    key={index}
                  >
                    {category}
                  </Button>
                ))}
              </Stack>
            </Box>

            <Box>
              {categories.map((category, index) => (
                <Box mx={{ base: "4", md: "4" }} key={index}>
                  <Stack spacing={{ base: "4", md: "6" }}>
                    {/* <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight={"semiBold"}
                    w={"fit"}
                    textColor={"#ff5841"}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Text> */}
                    {selectedCategory === category && (
                      <Grid
                        templateColumns={{
                          base: "repeat(1, 1fr)",
                          md: "repeat(3, 1fr)",
                          lg: "repeat(6, 1fr)",
                        }}
                        gap={5}
                      >
                        {availableItems
                          .filter((item) => item.category === category)
                          .map((item) => (
                            <CustomCard
                              key={item.id}
                              name={item.name}
                              size={item.size}
                              image={item.image}
                              onClick={() => handleSubmit(item)}
                            />
                          ))}
                      </Grid>
                    )}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <OrderSummery />
      </Flex>
    </Box>
  );
};

export default Cards;
