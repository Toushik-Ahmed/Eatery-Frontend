"use client";

import React from "react";
import CustomCard from "../customComponents/CustomCard";
import OrderSummery from "./OrderSummery";

type Props = {};

const Cards = (props: Props) => {
  return (
    <div className="ml-[2vw]">
      <h2 className="text-2xl font-semibold mb-[5vh]">Order Management</h2>
      <div className="flex space-x-4">
        <div className="bg-[#FFFFF4] w-[70vw] h-[85vh] border border-black overflow-auto">
          <div>
            <div className="flex justify-center">
              <div className="w-fit mt-[5vh] rounded-full p-2 flex justify-center space-x-8 text-xl text-black font-semibold border border-black items-center shadow-md">
                <div className="cursor-pointer hover:text-[#ff5841]">
                  All Items
                </div>
                <div className="cursor-pointer hover:text-[#ff5841]">
                  All Day
                </div>
                <div className="cursor-pointer hover:text-[#ff5841]">
                  Breakfast
                </div>
                <div className="cursor-pointer hover:text-[#ff5841]">Lunch</div>
                <div className="cursor-pointer hover:text-[#ff5841]">
                  Dinner
                </div>
              </div>
            </div>
            <div className="ml-10">
              <div className="mt-5 text-xl font-semibold w-fit text-[#ff5841]">
                Fastfood
              </div>
              <div className="grid grid-cols-4 gap-y-6">
                <CustomCard />
                <CustomCard />
                <CustomCard />
                <CustomCard />
              </div>
              <div className="mt-5 text-xl font-semibold w-fit text-[#ff5841]">
                Beverage
              </div>
              <div className="grid grid-cols-4 gap-y-6">
                <CustomCard />
                <CustomCard />
                <CustomCard />
              </div>
            </div>
          </div>
        </div>
        <div>
          <OrderSummery />
        </div>
      </div>
    </div>
  );
};

export default Cards;
