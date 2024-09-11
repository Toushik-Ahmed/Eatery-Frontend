"use client";

import React, { useState } from "react";
import CustomCard from "../customComponents/CustomCard";
import OrderSummery from "./OrderSummery";
import { Box, Button } from "@chakra-ui/react";

type Props = {};

const Cards = (props: Props) => {
  const items = [
    {
      Fastfood: {
        name: "Burger",
        size: "large",
        addons: "salami",
        price: 300,
        image:
          "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
      },
    },
    {
      Beverage: {
        name: "Sprite",
        size: "1 litre",
        price: 60,
        image:
          "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
      },
    },
  ];
  /* const [name , setName] = useState<string | undefined>('');
  const [size , setSize] = useState<number | undefined>();
  const [price , setPrice] = useState<number | undefined>();
  const [image , setImage] = useState<string | undefined>();
  const [addons , setAddons] = useState<string | undefined>(); */

  return (
    <div className="mx-[2vw]">
      <div className="py-6">
        <h2 className="text-2xl font-semibold">Order Management</h2>
      </div>
      <div className="flex justify-between">
        <Box
          borderWidth="1px"
          borderRadius="md"
          bg={"#FFFFF4"}
          w={"75vw"}
          h={"90vh"}
          overflow={"auto"}
        >
          <div>
            <div className="flex justify-center">
              <div className="w-fit mt-[2vh] p-2 flex justify-center justify-between space-x-8 text-xl text-black font-semibold items-center">
                <Button _hover={{ background: "#ff5841", textColor: "white" }}>
                  All Items
                </Button>

                <Button _hover={{ background: "#ff5841", textColor: "white" }}>
                  All Day
                </Button>

                <Button _hover={{ background: "#ff5841", textColor: "white" }}>
                  Breakfast
                </Button>

                <Button _hover={{ background: "#ff5841", textColor: "white" }}>
                  Lunch
                </Button>

                <Button _hover={{ background: "#ff5841", textColor: "white" }}>
                  Dinner
                </Button>
              </div>
            </div>
            <div className="ml-20 space-y-8">
              <div className="mt-5 flex justify-center text-2xl font-semibold w-fit text-[#ff5841]">
                Fastfood
              </div>
              {items.map(
                (item) =>
                  item.Fastfood && (
                    <div className="grid grid-cols-4 gap-y-10">
                      <CustomCard
                        name={item.Fastfood.name}
                        size={item.Fastfood.size}
                        price={item.Fastfood.price}
                        image={item.Fastfood.image}
                        addons={item.Fastfood.addons}
                      />
                      <CustomCard
                        name={item.Fastfood.name}
                        size={item.Fastfood.size}
                        price={item.Fastfood.price}
                        image={item.Fastfood.image}
                        addons={item.Fastfood.addons}
                      />
                      <CustomCard
                        name={item.Fastfood.name}
                        size={item.Fastfood.size}
                        price={item.Fastfood.price}
                        image={item.Fastfood.image}
                        addons={item.Fastfood.addons}
                      />
                      <CustomCard
                        name={item.Fastfood.name}
                        size={item.Fastfood.size}
                        price={item.Fastfood.price}
                        image={item.Fastfood.image}
                        addons={item.Fastfood.addons}
                      />
                      <CustomCard
                        name={item.Fastfood.name}
                        size={item.Fastfood.size}
                        price={item.Fastfood.price}
                        image={item.Fastfood.image}
                        addons={item.Fastfood.addons}
                      />
                    </div>
                  )
              )}
              <div className=" text-2xl font-semibold w-fit text-[#ff5841]">
                Beverage
              </div>
              <div className="grid grid-cols-4 gap-y-10">
                {/* <CustomCard />
                <CustomCard />
                <CustomCard />
                <CustomCard />
                <CustomCard />
                <CustomCard /> */}
              </div>
            </div>
          </div>
        </Box>

        <OrderSummery />
      </div>
    </div>
  );
};

export default Cards;
