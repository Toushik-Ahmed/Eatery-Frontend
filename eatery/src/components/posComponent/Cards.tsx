"use client";
import React, { useEffect, useRef, useState } from "react";
import CustomCard from "../customComponents/Custom";
import OrderSummery from "./OrderSummery";
import { v4 as uuidv4 } from "uuid";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { ImHome } from "react-icons/im";
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderInfo } from "@/redux/Pos/OrderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getmenuItems,
  getTopSellingItems,
  MealTime,
  MenuItem,
} from "@/redux/Pos/MenuItemSlice";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { LoggedInuser, loggedInuser } from "@/services/apiservice";

type Props = {};

const Cards = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [meal, setMealTime] = useState<string>("All Items");
  const [user, setUserInfo] = useState<LoggedInuser | undefined>();
  const [label, setLabel] = useState("User Name");
  const [userType, setUserType] = useState("");
  const router = useRouter();

  useEffect(() => {
    dispatch(getmenuItems());
    dispatch(getTopSellingItems());
  }, [dispatch]);

  const list = useSelector((state: RootState) => state.allItem);
  const allItems = list.allItems;
  console.log(allItems);
  const top = useSelector((state: RootState) => state.allItem);
  const topSelling = top.topSellingItems;

  const [availableItems, setAvailableItems] = useState<MenuItem[]>([]);
  const [currentIndices, setCurrentIndices] = useState<{
    [key: string]: number;
  }>({});
  const [newItems, setNewItems] = useState<MenuItem[]>([]);

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

  const itemsPerView = 6;
  const handleNext = (category: string) => {
    const filteredItems = availableItems.filter(
      (item) => item.category === category
    );
    const maxIndex = Math.ceil(filteredItems.length / itemsPerView) - 1;

    setCurrentIndices((prev) => {
      const newIndex = Math.min((prev[category] || 0) + 1, maxIndex);
      return { ...prev, [category]: newIndex };
    });
  };

  const handlePrev = (category: string) => {
    setCurrentIndices((prev) => {
      const newIndex = Math.max((prev[category] || 0) - 1, 0);
      return { ...prev, [category]: newIndex };
    });
  };

  useEffect(() => {
    if (availableItems.length && topSelling.length) {
      const topSellingArray = topSelling.map((item) => item.itemName);

      const bestItem = topSellingArray
        .map((itemName) => {
          const matches = availableItems.filter(
            (availableItem) => availableItem.itemName === itemName
          );
          return matches[0] || null;
        })
        .filter((item) => item !== null);

      const averageItem = availableItems.filter(
        (availableItem) => !topSellingArray.includes(availableItem.itemName)
      );
      setNewItems([...bestItem, ...averageItem]);
    } else {
      setNewItems(availableItems);
    }
  }, [availableItems, topSelling]);

  const handleHomePage = () => {
    router.push("/dashboard");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await loggedInuser();
        setUserInfo(userData);
        setLabel(userData.user.firstName);
        setUserType(userData.user.userType);
        console.log(userData.user);
        console.log(userData.user.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Box mx={{ base: "2", md: "6", lg: "10" }}>
      <Box display={"flex"} gap={"2"} my={{ base: "4", md: "4" }}>
        <Text fontSize={{ base: "xl", md: "xl" }} fontWeight={"bold"}>
          Order Management
        </Text>
        {userType === "Admin" && (
          <Button onClick={handleHomePage} size={"sm"} gap={"2"}>
            <ImHome color="#d91a40" /> Home
          </Button>
        )}
      </Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "2", md: "2" }}
      >
        <Box
          borderWidth="1px"
          borderRadius="md"
          bg={"#f4f4f6"}
          w={{ base: "100vw", md: "75vw" }}
          h={{ base: "auto", md: "92vh" }}
        >
          <Flex justifyContent={"center"}>
            <Box py={{ base: "4", md: "4" }}>
              <HStack spacing={{ base: 3, md: 6 }}>
                <Button
                  bg={meal === "All Items" ? "#d91a40" : "white"}
                  textColor={meal === "All Items" ? "white" : "black"}
                  onClick={() => setMealTime("All Items")}
                  _hover={{ background: "#d91a40", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  All Items
                </Button>
                <Button
                  bg={meal === "All Day" ? "#d91a40" : "white"}
                  textColor={meal === "All Day" ? "white" : "black"}
                  onClick={() => setMealTime("All Day")}
                  _hover={{ background: "#d91a40", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  All Day
                </Button>
                <Button
                  bg={meal === "Breakfast" ? "#d91a40" : "white"}
                  textColor={meal === "Breakfast" ? "white" : "black"}
                  onClick={() => setMealTime("Breakfast")}
                  _hover={{ background: "#d91a40", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  Breakfast
                </Button>
                <Button
                  bg={meal === "Lunch" ? "#d91a40" : "white"}
                  textColor={meal === "Lunch" ? "white" : "black"}
                  onClick={() => setMealTime("Lunch")}
                  _hover={{ background: "#d91a40", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  Lunch
                </Button>
                <Button
                  bg={meal === "Dinner" ? "#d91a40" : "white"}
                  textColor={meal === "Dinner" ? "white" : "black"}
                  onClick={() => setMealTime("Dinner")}
                  _hover={{ background: "#d91a40", textColor: "white" }}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight={"bold"}
                >
                  Dinner
                </Button>
              </HStack>
            </Box>
          </Flex>
          <Box maxHeight={{ base: "50vh", md: "84vh" }} overflowY="auto">
            <Stack spacing={{ base: "4", md: "4" }}>
              {categories.map((category, index) => (
                <Box
                  mx={{ base: "4", md: "4" }}
                  key={index}
                  h={{ base: "36vh", md: "36vh", lg: "26vh" }}
                >
                  <Flex gap="2">
                    <Box p={"2"}>
                      <Button
                        bg={"#d91a40"}
                        textColor={"white"}
                        _hover={{ background: "#d91a40", textColor: "white" }}
                        borderBottomLeftRadius={"full"}
                        borderTopRightRadius={"full"}
                        w={{ base: "6vw", md: "6vw" }}
                        onClick={() => setSelectedCategory(category)}
                        fontSize={{ base: "md", md: "md" }}
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
                          bg={"gray.200"}
                          color={"#008dda"}
                          _hover={{
                            background: "gray.200",
                            textColor: "#008dda",
                          }}
                          fontSize={"lg"}
                        >
                          <FaChevronLeft />
                        </Button>
                      )}
                      <Flex
                        gap={"5"}
                        transform={`translateX(-${
                          (currentIndices[category] || 0) * 100
                        }%)`}
                        transition="transform 0.5s ease-in-out"
                        width="100%"
                      >
                        {newItems
                          .filter((item) => item.category === category)
                          .map((item) => (
                            <Box
                              border={"none"}
                              borderRadius={"xl"}
                              key={item.id}
                              flexShrink={0}
                              w={"fit-content"}
                              as={motion.div}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <CustomCard
                                key={item.id}
                                name={item.itemName}
                                size={item.size}
                                image={item.image}
                                onClick={() => handleSubmit(item)}
                              />
                            </Box>
                          ))}
                      </Flex>
                      {(currentIndices[category] || 0) <
                        Math.ceil(
                          newItems.filter((item) => item.category === category)
                            .length / itemsPerView
                        ) -
                          1 && (
                        <Button
                          onClick={() => handleNext(category)}
                          position="absolute"
                          right="10px"
                          top="50%"
                          transform="translateY(-50%)"
                          zIndex={2}
                          bg={"gray.200"}
                          color={"#008dda"}
                          _hover={{
                            background: "gray.200",
                            textColor: "#008dda",
                          }}
                          fontSize={"lg"}
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
