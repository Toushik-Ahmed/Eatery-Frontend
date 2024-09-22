"use client";

import React, { useEffect, useRef, useState } from "react";
import CustomCard from "../customComponents/CustomCard";
import OrderSummery from "./OrderSummery";
import { v4 as uuidv4 } from "uuid";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Slide,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderInfo } from "@/redux/Pos/OrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getmenuItems, MealTime, MenuItem } from "@/redux/Pos/MenuItemSlice";
import { motion } from "framer-motion";

type Props = {};

const Cards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [meal, setMealTime] = useState<string>("All Items");

  useEffect(() => {
    dispatch(getmenuItems());
  }, [dispatch]);

  const list = useSelector((state: RootState) => state.allItem);
  const allItems = list.allItems;

  const [availableItems, setAvailableItems] = useState<MenuItem[]>([]);
  const [currentIndices, setCurrentIndices] = useState<{
    [key: string]: number;
  }>({});
  const [xOffset, setXOffset] = useState<{ [key: string]: number }>({});
  const [slideDirection, setSlideDirection] = useState<string>("");

  useEffect(() => {
    if (meal === "All Items") {
      setAvailableItems(allItems);
    } else {
      const filteredItems = allItems.filter((item: MenuItem) =>
        item.mealTime.some((m: MealTime) => m.mealtime === meal)
      );
      setAvailableItems(filteredItems);
    }
  }, [meal, allItems]);

  const handleSubmit = (item: MenuItem) => {
    const uniqueKey = uuidv4();

    const newItem = {
      ...item,
      uniqueKey,
    };
    dispatch(addOrderInfo([newItem]));
  };

  const categories = Array.from(
    new Set(allItems.map((item: MenuItem) => item.category))
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const itemsPerView = 3;

  const handleNext = (category: string) => {
    const filteredItems = availableItems.filter(
      (item) => item.category === category
    );
    const maxIndex = Math.ceil(filteredItems.length / itemsPerView) - 1;

    setCurrentIndices((prev) => {
      const newIndex = Math.min((prev[category] || 0) + 1, maxIndex);
      setXOffset((prevOffset) => ({
        ...prevOffset,
        [category]: -newIndex,
      }));
      return { ...prev, [category]: newIndex };
    });
  };

  const handlePrev = (category: string) => {
    setCurrentIndices((prev) => {
      const newIndex = Math.max((prev[category] || 0) - 1, 0);
      setXOffset((prevOffset) => ({
        ...prevOffset,
        [category]: -newIndex,
      }));
      return { ...prev, [category]: newIndex };
    });
  };
  return (
    <Box mx={{ base: "2", md: "6", lg: "10" }}>
      <Text
        py={{ base: "4", md: "4" }}
        fontSize={{ base: "xl", md: "xl" }}
        fontWeight={"bold"}
      >
        Order Management
      </Text>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box
          borderWidth="1px"
          borderRadius="md"
          bg={"#f4f4f6"}
          w={{ base: "100vw", md: "75vw" }}
          h={{ base: "auto", md: "92vh" }}
          overflowY={"auto"}
        >
          <Flex justifyContent={"center"}>
            <Box mt={"4"} mb={{ base: "4", md: "5" }}>
              <HStack spacing={{ base: 3, md: 6 }}>
                <Button
                  bg={meal === "All Items" ? "#f53e62" : "white"}
                  textColor={meal === "All Items" ? "white" : "black"}
                  onClick={() => setMealTime("All Items")}
                  _hover={{ background: "#f53e62", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  All Items
                </Button>

                <Button
                  bg={meal === "All Day" ? "#f53e62" : "white"}
                  textColor={meal === "All Day" ? "white" : "black"}
                  onClick={() => setMealTime("All Day")}
                  _hover={{ background: "#f53e62", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  All Day
                </Button>

                <Button
                  bg={meal === "Breakfast" ? "#f53e62" : "white"}
                  textColor={meal === "Breakfast" ? "white" : "black"}
                  onClick={() => setMealTime("Breakfast")}
                  _hover={{ background: "#f53e62", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  Breakfast
                </Button>

                <Button
                  bg={meal === "Lunch" ? "#f53e62" : "white"}
                  textColor={meal === "Lunch" ? "white" : "black"}
                  onClick={() => setMealTime("Lunch")}
                  _hover={{ background: "#f53e62", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  Lunch
                </Button>

                <Button
                  bg={meal === "Dinner" ? "#f53e62" : "white"}
                  textColor={meal === "Dinner" ? "white" : "black"}
                  onClick={() => setMealTime("Dinner")}
                  _hover={{ background: "#f53e62", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  Dinner
                </Button>
              </HStack>
            </Box>
          </Flex>

          {/* <Box
              p={"4"}
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight={"semiBold"}
            >
              <Stack spacing={{ base: 3, md: 16 }}>
                {categories.map((category, index) => (
                  <Button
                    bg={category === selectedCategory ? "#f53e62" : "white"}
                    textColor={
                      category === selectedCategory ? "white" : "black"
                    }
                    _hover={{ background: "#f53e62", textColor: "white" }}
                    borderBottomLeftRadius={"full"}
                    borderTopRightRadius={"full"}
                    w={"fit"}
                    onClick={() => setSelectedCategory(category)}
                    key={index}
                  >
                    {category}
                  </Button>
                ))}
              </Stack>
            </Box> */}

          <Box>
            <Stack spacing={{ base: "4", md: "4" }}>
              {categories.map((category, index) => (
                <Box mx={{ base: "4", md: "4" }} key={index}>
                  <Flex gap="2">
                    <Box p={"2"}>
                      <Button
                        bg={"#f53e62"}
                        textColor={"white"}
                        _hover={{ background: "#f53e62", textColor: "white" }}
                        borderBottomLeftRadius={"full"}
                        borderTopRightRadius={"full"}
                        w={"6vw"}
                        onClick={() => setSelectedCategory(category)}
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight={"bold"}
                      >
                        {category}
                      </Button>
                    </Box>

                    <Box position="relative" w="100%" overflow={"hidden"}>
                      {(currentIndices[category] || 0) > 0 && (
                        <Button
                          onClick={() => handlePrev(category)}
                          position="absolute"
                          left="10px"
                          top="50%"
                          transform="translateY(-50%)"
                          zIndex={2}
                        >
                          <FaChevronLeft />
                        </Button>
                      )}

                      <Flex
                        gap={"8"}
                        as={motion.div}
                        animate={{
                          x: `-${currentIndices[category] || 0}%`,
                        }}
                        transition={{
                          x: "6.5 easeInOut",
                        }}
                      >
                        {availableItems
                          .filter((item) => item.category === category)
                          .slice(
                            (currentIndices[category] || 0) * itemsPerView,
                            ((currentIndices[category] || 0) + 1) * itemsPerView
                          )
                          .map((item) => (
                            <Box
                              borderRadius="lg"
                              key={item.id}
                              flexShrink={0}
                              as={motion.div}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <CustomCard
                                key={item.id}
                                name={item.name}
                                size={item.size}
                                image={item.image}
                                onClick={() => handleSubmit(item)}
                              />
                            </Box>
                          ))}
                      </Flex>

                      {(currentIndices[category] || 0) <
                        Math.ceil(
                          availableItems.filter(
                            (item) => item.category === category
                          ).length / itemsPerView
                        ) -
                          1 && (
                        <Button
                          onClick={() => handleNext(category)}
                          position="absolute"
                          right="10px"
                          top="50%"
                          transform="translateY(-50%)"
                          zIndex={2}
                        >
                          <FaChevronRight />
                        </Button>
                      )}
                    </Box>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
        <Spacer />
        <OrderSummery />
      </Flex>
    </Box>
  );
};

export default Cards;
