"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const Invoice = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Box
      borderWidth={"1px"}
      borderColor={"black"}
      w={"20vw"}
      mx={"40vw"}
      px={"4"}
    >
      <Box py={"4"}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          Invoice
        </Text>
      </Box>
      <Flex>
        <Box mb={"4"}>
          <Text>Order Id: </Text>
          <Text>Table No: </Text>
        </Box>
        <Spacer />
        <Box>Date: 19/3/2024</Box>
      </Flex>
      <Box bg={"#e3e7ec"} p={"2"} borderRadius={"4"}>
        <Flex>
          <Text>Item</Text>
          <Spacer />
          <Text>Amount</Text>
        </Flex>
      </Box>
      <Box p={"2"} borderBottom={"1px"}>
        <Stack spacing={"2"}>
          <Flex>
            <Text>Name : size</Text>
            <Spacer />
            <Text>10$</Text>
          </Flex>
          <Text>Add ons:</Text>
          <Flex>
            <Text>Cheese</Text>
            <Spacer />
            <Text>2$</Text>
          </Flex>

          <Text>quantity: x2</Text>

          <Flex>
            <Text>Sub-total:</Text>
            <Spacer />
            <Text>20$</Text>
          </Flex>
        </Stack>
      </Box>
      <Box p={"2"}>
        <Flex justifyContent={"right"}>
          <Text>Total : </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Invoice;
