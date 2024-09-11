import {
  Button,
  Box,
  Flex,
  HStack,
  Spacer,
  Select,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const OrderSummery = (props: Props) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      bg={"#FFFFF6"}
      w={"20vw"}
      h={"90vh"}
    >
      <div className="h-[80vh] flex flex-col items-center overflow-auto">
        <div className="text-lg font-bold">Order Summery</div>
        <Box
          p={"4"}
          mt={"4"}
          borderWidth="1px"
          borderRadius="md"
          borderColor={"gray"}
          rounded={"md"}
        >
          <div className="flex space-x-40">
            <div className="text-md">
              <h2 className="font-bold ">Mexican Tacos</h2>
              <div className="flex justify-between items-center">
                <Button>-</Button>

                <div>1</div>

                <Button>+</Button>
              </div>
              <Select placeholder="Add ons">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select placeholder="Size">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>
            <div className="text-lg font-bold">600$</div>
          </div>
        </Box>
        <Box
          p={"4"}
          mt={"4"}
          borderWidth="1px"
          borderRadius="md"
          borderColor={"gray"}
          rounded={"md"}
        >
          <div className="flex space-x-40">
            <div className="text-md">
              <h2 className="font-bold ">Mexican Tacos</h2>
              <div className="flex justify-between items-center">
                <Button>-</Button>

                <div>1</div>

                <Button>+</Button>
              </div>
              <Select placeholder="Add ons">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select placeholder="Size">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>
            <div className="text-lg font-bold">600$</div>
          </div>
        </Box>
        <Box
          p={"4"}
          mt={"4"}
          borderWidth="1px"
          borderRadius="md"
          borderColor={"gray"}
          rounded={"md"}
        >
          <div className="flex space-x-40">
            <div className="text-md">
              <h2 className="font-bold ">Mexican Tacos</h2>
              <div className="flex justify-between items-center">
                <Button>-</Button>

                <div>1</div>

                <Button>+</Button>
              </div>
              <Select placeholder="Add ons">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select placeholder="Size">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>
            <div className="text-lg font-bold">600$</div>
          </div>
        </Box>
        <Box
          p={"4"}
          mt={"4"}
          borderWidth="1px"
          borderRadius="md"
          borderColor={"gray"}
          rounded={"md"}
        >
          <div className="flex space-x-40">
            <div className="text-md">
              <h2 className="font-bold ">Mexican Tacos</h2>
              <div className="flex justify-between items-center">
                <Button>-</Button>

                <div>1</div>

                <Button>+</Button>
              </div>
              <Select placeholder="Add ons">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
              <Select placeholder="Size">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </div>
            <div className="text-lg font-bold">600$</div>
          </div>
        </Box>
      </div>
      <HStack spacing="5px">
        <Box p={"4"} fontWeight={"bold"} w={"fit-content"}>
          Total: 600$
        </Box>
        <Spacer />
        <Box as="button" borderRadius="md" bg="#ff5841" color="white" h={10}>
          Send Order
        </Box>
      </HStack>
    </Box>
  );
};

export default OrderSummery;
