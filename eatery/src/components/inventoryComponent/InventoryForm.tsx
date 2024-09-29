"use client";
import { postAddIngredient } from "@/redux/inventory/AddIngredientsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ingImage from "./assets/ingredients.jpg";
import { getToken } from "@/services/tokenServices";

type Props = {};

const InventoryForm = (props: Props) => {
  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [poo, setPoo] = useState<number>(0);
  const [capacity, setCapacity] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const handleSubmit = () => {
    const addIngredientsForm = {
      ingredient,
      unit,
      poo,
      capacity,
    };
    dispatch(postAddIngredient(addIngredientsForm));
    const a = getToken();
    console.log(a);
    toast({
      title: "Ingredient Added Successfully!.",

      status: "success",
      position: "top-right",
      duration: 3000,
      isClosable: true,
      render: () => (
        <Box color="white" p={3} bg="#f53e62">
          <Box>Ingredient Added Successfully! </Box>
          Ingredient: {ingredient}
        </Box>
      ),
    });
  };
  const addIngredientsData = useSelector(
    (state: RootState) => state.addIngredients
  );

  const handleCancel = () => {
    setIngredient("");

    setCapacity(0);

    setPoo(0);
    setUnit("");
  };

  return (
    <Box
      p={6}
      bg="#FFFFF6"
      borderRadius="lg"
      width={"20vw"}
      boxShadow="lg"
      h="100%"
    >
      <Flex align="center" mt={2} mb={2}></Flex>

      <Image
        src={ingImage.src}
        // mx="auto"
        // my={4}
        // borderRadius="full"
        // width={{ base: '50%', md: '30%' }}

        borderRadius="full"
        objectFit="cover"
      />

      <FormControl>
        <FormLabel>Ingredient</FormLabel>
        <Input
          p={2}
          placeholder="Please Enter Ingredient Name"
          variant="outline"
          borderColor="purple.300"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Unit</FormLabel>
        <Select
          placeholder="Select Unit"
          variant="outline"
          borderColor="purple.300"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="Gram">Gram</option>
          <option value="K.G">Kilograms</option>
          <option value="Liter">Liters</option>
          <option value="Pieces">Pieces</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Point of order</FormLabel>
        <Input
          type="number"
          placeholder="Please Enter Order Point"
          variant="outline"
          borderColor="purple.300"
          value={poo}
          onChange={(e) => setPoo(parseInt(e.target.value))}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Capacity</FormLabel>
        <Input
          type="number"
          placeholder="Please Enter base capacity"
          variant="outline"
          borderColor="purple.300"
          value={capacity}
          onChange={(e) => setCapacity(parseInt(e.target.value))}
        />
      </FormControl>

      {/* Buttons */}
      <Flex justify="space-between" mt={4}>
        <Button
          bg={"#d91a40"}
          _hover={{ bg: "#d91a40", color: "white" }}
          color="black"
          onClick={() => handleCancel()}
        >
          Clear All
        </Button>
        <Button
          bg={"#547494"}
          _hover={{ bg: "#547494", color: "white" }}
          color="black"
          onClick={() => handleSubmit()}
        >
          Add Item
        </Button>
      </Flex>
    </Box>
  );
};

export default InventoryForm;
