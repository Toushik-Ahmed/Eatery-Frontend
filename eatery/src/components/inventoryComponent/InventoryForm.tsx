import {
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

const InventoryForm = (props: Props) => {
  return (
    <Box
      p={{ base: 4, md: 10 }} 
      // bg="#F6F1F1"
      bg="#FFFFF0"
      borderRadius="lg"
      maxW={{ base: "100%", md: "700px" }} 
      m="0 auto"
      boxShadow="lg"
    >
      {/* Header Section */}
      <CloseButton />
      <Flex align="center" mt={8} mb={8}>
        <Box fontSize="2xl" fontWeight="bold">
          Add Ingredients
        </Box>
      </Flex>

      <Image
        src="https://img.freepik.com/premium-vector/vector-menu-illustration-food-meat-meal-restaurant-popular-set-lunch-icon-dinner-snack_1013341-40254.jpg?w=740"
        mx="auto"
        my="10"
        borderRadius="full"
        width={{ base: "90%", md: "55%" }} 
      />

      <FormControl>
        <FormLabel>Ingredient</FormLabel>
        <Input
          placeholder="Please Enter Ingredient Name"
          variant="outline"
          borderColor="purple.300"
        />
      </FormControl>
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} 
        gap={4}
      >
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <Input
            placeholder="Quantity"
            variant="outline"
            borderColor="purple.300"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Unit</FormLabel>
          <Select
            placeholder="Select Unit"
            variant="outline"
            borderColor="purple.300"
          >
            <option value="g">Grams</option>
            <option value="kg">Kilograms</option>
            <option value="l">Liters</option>
          </Select>
        </FormControl>
      </Grid>
      <FormControl>
        <FormLabel>Point of order</FormLabel>
        <Input
          placeholder="Please Enter Order Point"
          variant="outline"
          borderColor="purple.300"
        />
      </FormControl>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap={4}
      >
        <FormControl>
          <FormLabel>Capacity</FormLabel>
          <Input
            placeholder="Please Enter base capacity"
            variant="outline"
            borderColor="purple.300"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Unit</FormLabel>
          <Select
            placeholder="Select Unit"
            variant="outline"
            borderColor="purple.300"
          >
            <option value="g">Grams</option>
            <option value="kg">Kilograms</option>
            <option value="l">Liters</option>
          </Select>
        </FormControl>
      </Grid>

      <FormControl>
          <FormLabel>Alergens</FormLabel>
          <Select
            placeholder="Select the suitable option"
            variant="outline"
            borderColor="purple.300"
          >
            <option value="y">Yes</option>
            <option value="n">No</option>
          </Select>
        </FormControl>

      {/* Buttons */}
      <Flex justify="space-between" mt={8}>
        <Button  colorScheme="orange" color="white">
          Cancel
        </Button>
        <Button colorScheme="pink" color="white">
          Add Item
        </Button>
      </Flex>
      
    </Box>
  );
};

export default InventoryForm;