"use client";

import React from "react";
import CustomCard from "../customComponents/CustomCard";

type Props = {};

const Cards = (props: Props) => {
  return (
    <div className="ml-[2vw]">
      <h2>Order Management</h2>
      <div className=" border border-black">
        <div>
          <div>
            <div className="bg-green-500">All Items</div>
            <div className="bg-green-500">All Items</div>
            <div className="bg-green-500">All Items</div>
            <div className="bg-green-500">All Items</div>
            <div className="bg-green-500">All Items</div>
          </div>
          <div className="flex justify-center space-x-6 mt-[10vh] w-[70vw] h-[80vh]">
            <CustomCard />
            <CustomCard />
            <CustomCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
