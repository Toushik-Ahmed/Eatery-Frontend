"use client";

import { RootState } from "@/redux/store";
import { Box, Button, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { OrderDetails } from "@/redux/Pos/PlaceOrderSlice";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
type Props = {};

const Invoice = (props: Props) => {
  const list = useSelector((state: RootState) => state.placeOrder);
  const invoiceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(list.orderDetails.tableNo);
  }, [list]);

  const formattedDate = list.orderDetails.createdAt
    ? format(new Date(list.orderDetails.createdAt), "dd-MM-yyyy")
    : "";
  const formattedTime = list.orderDetails.createdAt
    ? format(new Date(list.orderDetails.createdAt), "hh:mm a")
    : "";
  const downloadPDF = async () => {
    if (invoiceRef.current) {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: invoiceRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF("p", "mm", [imgWidth, imgHeight]);

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice_${list.orderDetails._id}.pdf`);
    }
  };
  return (
    <>
      <Box>
        <Box
          borderWidth={"1px"}
          borderColor={"black"}
          w={"18vw"}
          mx={"40vw"}
          px={"4"}
          ref={invoiceRef}
        >
          <Box py={"4"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Invoice
            </Text>
          </Box>
          <Flex>
            <Box mb={"4"} fontSize={"sm"}>
              <Text>Order Id:</Text>
              <Text>#{list.orderDetails._id} </Text>
              <Text>Table No: {list.orderDetails.tableNo}</Text>
            </Box>

            <Spacer />
            <Box fontSize={"sm"}>
              <Text>Date: {formattedDate}</Text>
              <Text>Time: {formattedTime}</Text>
            </Box>
          </Flex>
          <Box bg={"#e3e7ec"} p={"2"} borderRadius={"4"} fontSize={"sm"}>
            <Flex>
              <Text>Item</Text>
              <Spacer />
              <Text>Amount</Text>
            </Flex>
          </Box>
          {list.orderDetails.menuItems.map((item, index) => (
            <Box
              p={"2"}
              borderBottomWidth={"1px"}
              borderBottomColor={"gray.400"}
              key={index}
              fontSize={"sm"}
            >
              <Stack spacing={"2"}>
                <Flex>
                  <Text>
                    {item.itemName} : {item.selectedSize}
                  </Text>
                  <Spacer />
                  <Text>{item.unitPrice}$</Text>
                </Flex>
                <Text>Add ons:</Text>
                {item.addOns.map((addon, index) => (
                  <Flex key={index}>
                    <Text>{addon.name}</Text>
                    <Spacer />
                    <Text>{addon.addonPrice}$</Text>
                  </Flex>
                ))}

                <Text>quantity: x {item.quantity}</Text>

                <Flex>
                  <Text>Sub-total:</Text>
                  <Spacer />
                  <Text>{item.sellingPrice}$</Text>
                </Flex>
              </Stack>
            </Box>
          ))}
          <Box pr={"2"} py={"4"}>
            <Flex justifyContent={"right"}>
              <Text fontSize={"md"} fontWeight={"semibold"}>
                Total : {list.orderDetails.totalPrice.toFixed(2)}$
              </Text>
            </Flex>
          </Box>
        </Box>

        <Button colorScheme="red" onClick={downloadPDF} mx={"40vw"} mt={"2"}>
          PDF
        </Button>
      </Box>
    </>
  );
};

export default Invoice;
