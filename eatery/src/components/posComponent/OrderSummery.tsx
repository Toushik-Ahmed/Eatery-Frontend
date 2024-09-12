import { RootState } from "@/redux/store";
import {
  Button,
  Box,
  Flex,
  HStack,
  Spacer,
  Select,
  Text,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

type Props = {};

const OrderSummery = (props: Props) => {
  const [eachItemPrice, setEachItemPrice] = useState<number>(0);
  const listOfItems = useSelector((state: RootState) => state.orderInfo);
  const size = Array.from(
    new Set(listOfItems.orderedItems.map((item) => item.size))
  );
  console.log(listOfItems.orderedItems);
  console.log(size);
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      bg={"#FFFFF6"}
      w={"20vw"}
      h={"90vh"}
    >
      <Box
        h={"80vh"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        overflowY={"auto"}
      >
        <Text py={"4"} fontWeight={"bold"}>
          Order Summery
        </Text>
        {listOfItems.orderedItems.map((item) => (
          <Box
            w={"19vw"}
            p={"4"}
            borderWidth="1px"
            borderRadius="md"
            borderColor={"gray-200"}
            rounded={"md"}
          >
            <Flex>
              <Box key={item.id}>
                <Text fontWeight={"bold"}>{item.name}</Text>
                <Select placeholder="Size" size={"sm"} mt={"2"}>
                  {item.size.map((s) => (
                    <option value={s.sizeName} key={s.sizeName}>
                      {s.sizeName}
                    </option>
                  ))}
                </Select>
                <Flex mt={2}>
                  <Button size={"sm"}>-</Button>

                  <Center w={"40px"} bg="green.500">
                    <Text>1</Text>
                  </Center>

                  <Button size={"sm"}>+</Button>
                </Flex>
                <Select placeholder="Add ons" size={"sm"} mt={"2"}>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Box>
              <Spacer />
              <Text fontWeight={"bold"}>600$</Text>
            </Flex>
          </Box>
        ))}
      </Box>
      <Box p={"6"} borderTop={"1px"} h={"10vh"}>
        <HStack spacing="1">
          <Box fontWeight={"bold"} w={"fit-content"}>
            Total: 600$
          </Box>
          <Spacer />
          <Box
            as="button"
            borderRadius="md"
            bg="#ff5841"
            color="white"
            h={10}
            p={"2"}
          >
            Send Order
          </Box>
        </HStack>
      </Box>
    </Box>
  );
};

export default OrderSummery;
