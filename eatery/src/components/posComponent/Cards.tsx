"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../customComponents/CustomCard";
import OrderSummery from "./OrderSummery";
import items from "../../data";

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
import { useDispatch } from "react-redux";
import { addOrderInfo } from "@/redux/Pos/OrderSlice";
import { AppDispatch } from "@/redux/store";

type Props = {};
interface Items {
  id: number;
  name: string;
  category: string;
  tastyTag: string;
  mealTime: string[];
  description: string;
  image: string;
  size: {
    sizeName: string;
    ingredients: {
      name: string;
      properties: {
        quantity: number;
        unit: string;
      };
    }[];
    preparationTime: number;
    sellingPrice: number;
    addOns: {
      name: string;
      quantity: number;
      unit: string;
      addonPrice: number;
    }[];
  }[];
}
const Cards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const [mealTime, setMealTime] = useState<string>("All Items");

  const [availableItems, setAvailableItems] = useState<Items[]>(items);

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.mealTime.includes(mealTime)
    );
    setAvailableItems(filteredItems);
  }, [mealTime]);

  const handleSubmit = (item: Items) => {
    dispatch(addOrderInfo([item]));
  };

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
                <Button
                  bg={mealTime === "All Items" ? "#ff5841" : "white"}
                  textColor={mealTime === "All Items" ? "white" : "black"}
                  onClick={() => setMealTime("All Items")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  All Items
                </Button>

                <Button
                  bg={mealTime === "All Day" ? "#ff5841" : "white"}
                  textColor={mealTime === "All Day" ? "white" : "black"}
                  onClick={() => setMealTime("All Day")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  All Day
                </Button>

                <Button
                  bg={mealTime === "Breakfast" ? "#ff5841" : "white"}
                  textColor={mealTime === "Breakfast" ? "white" : "black"}
                  onClick={() => setMealTime("Breakfast")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Breakfast
                </Button>

                <Button
                  bg={mealTime === "Lunch" ? "#ff5841" : "white"}
                  textColor={mealTime === "Lunch" ? "white" : "black"}
                  onClick={() => setMealTime("Lunch")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Lunch
                </Button>

                <Button
                  bg={mealTime === "Dinner" ? "#ff5841" : "white"}
                  textColor={mealTime === "Dinner" ? "white" : "black"}
                  onClick={() => setMealTime("Dinner")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Dinner
                </Button>
              </HStack>
            </Box>
          </Flex>
          <Box>
            {categories.map((category) => (
              <Box mx={{ base: "4", md: "8" }} mt={{ base: "4", md: "6" }}>
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
                    gap={4}
                  >
                    {availableItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <CustomCard
                          key={`${item.id}`}
                          name={item.name}
                          size={item.size}
                          image={item.image}
                          onClick={() => handleSubmit(item)}
                        />
                      ))}
                  </Grid>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
        <Spacer />
        <OrderSummery />
      </Flex>
    </Box>
  );
};

export default Cards;
