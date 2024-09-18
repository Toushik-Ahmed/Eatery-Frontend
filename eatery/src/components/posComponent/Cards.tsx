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
// import { addOrderInfo } from "@/redux/Pos/OrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getmenuItems, MenuItem } from "@/redux/Pos/MenuItemSlice";
import { addOrderInfo } from "@/redux/Pos/OrderSlice";

type Props = {};

const Cards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [mealTime, setMealTime] = useState<string>("All Items");

  useEffect(() => {
    dispatch(getmenuItems());
  }, [dispatch]);

  
  const list = useSelector((state: RootState) => state.allItem);
  const allItems = list.allItems;
  
  console.log(allItems);

  
  const [availableItems, setAvailableItems] = useState<MenuItem[]>([]);

  
  useEffect(() => {
    if (mealTime === "All Items") {
      setAvailableItems(allItems); 
    } else {
      const filteredItems = allItems.filter((item:any) => item.mealTime.includes(mealTime));
      setAvailableItems(filteredItems);
    }
  }, [mealTime, allItems]);

  let uniqueKeyCounter = 0;


  const handleSubmit = (item: MenuItem) => {
    const uniqueKey = uniqueKeyCounter++;

    const newItem = {
      ...item,
      uniqueKey,
    };
    dispatch(addOrderInfo([newItem]));
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