"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../customComponents/CustomCardP";
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
  const items = [
    {
      id: 1,
      name: "Classic Burger",
      category: "Fast Food",
      tastyTag: "Delicious",
      mealTime: ["All Items", "Lunch", "Dinner"],
      description: "A classic burger with fresh ingredients",
      image:
        "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
      size: [
        {
          sizeName: "Large",
          ingredients: [
            { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
            { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
            { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
            { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
            { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
            { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
            { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
            { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
            { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
          ],
          preparationTime: 15,
          sellingPrice: 9.99,
          addOns: [
            {
              name: "Extra Cheese",
              quantity: 1,
              unit: "slice",
              addonPrice: 3.0,
            },
            { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
          ],
        },
        {
          sizeName: "Medium",
          ingredients: [
            { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
            { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
            { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
            { name: "Onion", properties: { quantity: 1, unit: "slice" } },
            { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
            { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
          ],
          preparationTime: 12,
          sellingPrice: 7.99,
          addOns: [
            {
              name: "Extra Cheese",
              quantity: 1,
              unit: "slice",
              addonPrice: 3.0,
            },
          ],
        },
        {
          sizeName: "Small",
          ingredients: [
            { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
            { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
            { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          ],
          preparationTime: 10,
          sellingPrice: 5.99,
          addOns: [
            {
              name: "Extra Lettuce",
              quantity: 1,
              unit: "leaf",
              addonPrice: 3.0,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Pizza",
      category: "Fast Food",
      tastyTag: "Delicious",
      mealTime: ["All Items", "All Day", "Lunch"],
      description: "A classic burger with fresh ingredients",
      image:
        "https://static.vecteezy.com/system/resources/previews/022/994/042/non_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg",
      size: [
        {
          sizeName: "Large",
          ingredients: [
            { name: "Beef Patty", properties: { quantity: 2, unit: "pcs" } },
            { name: "Lettuce", properties: { quantity: 3, unit: "pcs" } },
            { name: "Tomato", properties: { quantity: 1, unit: "pcs" } },
            { name: "Onion", properties: { quantity: 1, unit: "pcs" } },
            { name: "Cheese", properties: { quantity: 2, unit: "pcs" } },
            { name: "Pickles", properties: { quantity: 3, unit: "pcs" } },
            { name: "Ketchup", properties: { quantity: 20, unit: "ml" } },
            { name: "Mustard", properties: { quantity: 15, unit: "ml" } },
            { name: "Bun", properties: { quantity: 1, unit: "pcs" } },
          ],
          preparationTime: 15,
          sellingPrice: 9.99,
          addOns: [
            {
              name: "Extra Cheese",
              quantity: 1,
              unit: "slice",
              addonPrice: 3.0,
            },
            { name: "Bacon", quantity: 2, unit: "strips", addonPrice: 3.0 },
          ],
        },
        {
          sizeName: "Medium",
          ingredients: [
            { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
            { name: "Lettuce", properties: { quantity: 2, unit: "leaves" } },
            { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
            { name: "Onion", properties: { quantity: 1, unit: "slice" } },
            { name: "Cheese", properties: { quantity: 1, unit: "slice" } },
            { name: "Pickles", properties: { quantity: 2, unit: "slices" } },
          ],
          preparationTime: 12,
          sellingPrice: 7.99,
          addOns: [
            {
              name: "Extra Cheese",
              quantity: 1,
              unit: "slice",
              addonPrice: 3.0,
            },
          ],
        },
        {
          sizeName: "Small",
          ingredients: [
            { name: "Beef Patty", properties: { quantity: 1, unit: "pcs" } },
            { name: "Lettuce", properties: { quantity: 1, unit: "leaf" } },
            { name: "Tomato", properties: { quantity: 1, unit: "slice" } },
          ],
          preparationTime: 10,
          sellingPrice: 5.99,
          addOns: [
            {
              name: "Extra Lettuce",
              quantity: 1,
              unit: "leaf",
              addonPrice: 3.0,
            },
          ],
        },
      ],
    },
  ];

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
    <Box mx={"10"}>
      <Text py={"6"} fontSize={"2xl"} fontWeight={"semibold"}>
        Order Management
      </Text>
      <Flex>
        <Box
          borderWidth="1px"
          borderRadius="md"
          bg={"#f4f4f6"}
          w={"75vw"}
          h={"90vh"}
          overflow={"auto"}
        >
          <Flex justifyContent={"center"}>
            <Box mt={"6"} fontSize={"xl"} fontWeight={"semibold"}>
              <HStack spacing={6}>
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
              <Box mx={"8"} mt={"6"}>
                <Stack spacing={"6"}>
                  <Text
                    fontSize={"2xl"}
                    fontWeight={"semiBold"}
                    w={"fit"}
                    textColor={"#ff5841"}
                  >
                    {category}
                  </Text>

                  <Grid templateColumns="repeat(6, 0fr)" gap={6}>
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
