"use client";

import React, { useEffect, useState } from "react";
import CustomCard from "../customComponents/CustomCard";
import OrderSummery from "./OrderSummery";
import { Box, Button, Grid } from "@chakra-ui/react";

type Props = {};
interface Items {
  id: number;
  name: string;
  size: string;
  addons: string[];
  price: number;
  category: string;
  availability: string[];
  image: string;
}
const Cards = (props: Props) => {
  const items = [
    {
      id: 1,
      name: "Burger",
      size: "large",
      addons: ["salami", "cheese", "bacon"],
      price: 300,
      category: "Fastfood",
      availability: ["All Items", "Lunch", "Dinner"],
      image:
        "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
    },
    {
      id: 2,
      name: "Pizza",
      size: "large",
      addons: ["sausage", "mushroom", "black olive"],
      price: 900,
      category: "Fastfood",
      availability: ["All Items", "Lunch"],
      image:
        "https://static.vecteezy.com/system/resources/previews/022/994/042/non_2x/the-pepperoni-pizza-and-a-piece-of-streched-cheese-pizza-with-ai-generated-free-photo.jpg",
    },
    {
      id: 3,
      name: "Sub Sandwich",
      size: "medium",
      addons: ["capsicum"],
      price: 300,
      category: "Fastfood",
      availability: ["All Items", "All Day", "Dinner"],
      image:
        "https://tastytreatbd.com/images/detailed/127/Mexican_Sub_Sandwich.jpg",
    },
    {
      id: 4,
      name: "Chicken Fry",
      size: "2 pcs",
      addons: ["sauce"],
      price: 200,
      category: "Fastfood",
      availability: ["All Items", "All Day", "Dinner"],
      image:
        "https://www.banglakutir.com/app-contents/upload/1/products/1640865304_2_1_133038878.jpg",
    },
    {
      id: 5,
      name: "Sprite",
      size: "1 litre",
      addons: [""],
      price: 50,
      category: "Beverage",
      availability: ["All Items", "All Day", "Breakfast", "Lunch", "Dinner"],
      image:
        "https://www.contis.ph/cdn/shop/products/SpriteinCan.jpg?v=1689558530",
    },

    {
      id: 6,
      name: "Fanta",
      size: "1 litre",
      addons: [""],
      price: 50,
      category: "Beverage",
      availability: ["All Items", "All Day", "Breakfast", "Lunch", "Dinner"],
      image:
        "https://static.thcdn.com/images/medium/original/widgets/190-en/58/original-New_Fanta_Mobile-011458.png",
    },
    {
      id: 7,
      name: "Mexican Taco",
      size: "medium",
      addons: ["lettuce"],
      price: 200,
      category: "Fastfood",
      availability: ["All Items", "Breakfast", "Dinner"],
      image:
        "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/sneha-archanaskitchen.com/Classic_Mexican_Taco_Recipe_With_Refried_Beans__Fresh_Summer_Salad.jpg",
    },
    {
      id: 8,
      name: "Burger",
      size: "medium",
      addons: ["salami", "cheese", "bacon"],
      price: 200,
      category: "Fastfood",
      availability: ["All Items", "Lunch", "Dinner"],
      image:
        "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
    },
    {
      id: 9,
      name: "Pasta",
      size: "medium",
      addons: ["black olive", "mozzarella"],
      price: 400,
      category: "Fastfood",
      availability: ["All Items", "Lunch"],
      image:
        "https://static.thcdn.com/images/v2/app/uploads/sites/419/2021/05/FEATURE0326-THG0021212-MYP-NF-PASTA-1800-x-672-min_1619626601.jpg?width=700",
    },
  ];

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const [availability, setAvailability] = useState<string>("All Items");

  const [availableItems, setAvailableItems] = useState<Items[]>(items);

  useEffect(() => {
    const filteredItems = items.filter((item) =>
      item.availability.includes(availability)
    );
    setAvailableItems(filteredItems);
  }, [availability]);

  return (
    <div className="mx-[2vw]">
      <div className="py-6">
        <h2 className="text-2xl font-semibold">Order Management</h2>
      </div>
      <div className="flex justify-between">
        <Box
          borderWidth="1px"
          borderRadius="md"
          bg={"#f4f4f6"}
          w={"75vw"}
          h={"90vh"}
          overflow={"auto"}
        >
          <div>
            <div className="flex justify-center">
              <div className="w-fit mt-[2vh] p-2 flex justify-center space-x-8 text-xl text-black font-semibold items-center">
                <Button
                  bg={availability === "All Items" ? "#ff5841" : "white"}
                  textColor={availability === "All Items" ? "white" : "black"}
                  onClick={() => setAvailability("All Items")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  All Items
                </Button>

                <Button
                  bg={availability === "All Day" ? "#ff5841" : "white"}
                  textColor={availability === "All Day" ? "white" : "black"}
                  onClick={() => setAvailability("All Day")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  All Day
                </Button>

                <Button
                  bg={availability === "Breakfast" ? "#ff5841" : "white"}
                  textColor={availability === "Breakfast" ? "white" : "black"}
                  onClick={() => setAvailability("Breakfast")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Breakfast
                </Button>

                <Button
                  bg={availability === "Lunch" ? "#ff5841" : "white"}
                  textColor={availability === "Lunch" ? "white" : "black"}
                  onClick={() => setAvailability("Lunch")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Lunch
                </Button>

                <Button
                  bg={availability === "Dinner" ? "#ff5841" : "white"}
                  textColor={availability === "Dinner" ? "white" : "black"}
                  onClick={() => setAvailability("Dinner")}
                  _hover={{ background: "#ff5841", textColor: "white" }}
                >
                  Dinner
                </Button>
              </div>
            </div>

            <div className="ml-20 space-y-8">
              {categories.map((category) => (
                <div key={category} className="space-y-4">
                  <div className="mt-5 flex justify-center text-2xl font-semibold w-fit text-[#ff5841]">
                    {category}
                  </div>

                  <Grid templateColumns="repeat(6, 0fr)" gap={6}>
                    {availableItems
                      .filter((item) => item.category === category)
                      .map((item) => (
                        <CustomCard
                          key={item.id}
                          name={item.name}
                          size={item.size}
                          price={item.price}
                          image={item.image}
                        />
                      ))}
                  </Grid>
                </div>
              ))}
            </div>
          </div>
        </Box>

        <OrderSummery />
      </div>
    </div>
  );
};

export default Cards;
