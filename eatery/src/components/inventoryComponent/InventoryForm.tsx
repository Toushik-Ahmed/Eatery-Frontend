'use client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
  Select,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {};

const InventoryForm = (props: Props) => {
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [poo, setPoo] = useState<number>(0);
  const [alergens, setAlergens] = useState<string>('No');
  const [capacity, setCapacity] = useState<number>(0);
  const [capacityUnit, setCapacityUnit] = useState('');

  const handleSubmit = () => {
    const addIngredientsForm = {
      ingredient,
      quantity,
      unit,
      poo,
      alergens,
      capacity,
      capacityUnit,
    };
  };

  const handleCancel = () => {
    setIngredient('');
    setQuantity('');
    setAlergens('');
    setCapacity(0);
    setCapacityUnit('');
    setPoo(0);
    setUnit('');
  };

  return (
    <Box
      p={6}
      bg="#FFFFF0"
      borderRadius="lg"
      width={'fit-content'}
      boxShadow="lg"
      h="100%"
    >
      <Flex align="center" mt={2} mb={2}></Flex>

      <Image
        src="https://img.freepik.com/premium-vector/vector-menu-illustration-food-meat-meal-restaurant-popular-set-lunch-icon-dinner-snack_1013341-40254.jpg?w=100"
        mx="auto"
        my={4}
        borderRadius="full"
        width={{ base: '50%', md: '30%' }}
      />

      <FormControl>
        <FormLabel>Ingredient</FormLabel>
        <Input
          placeholder="Please Enter Ingredient Name"
          variant="outline"
          borderColor="purple.300"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
      </FormControl>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <Input
            placeholder="Quantity"
            variant="outline"
            borderColor="purple.300"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
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
          value={poo}
          onChange={(e) => setPoo(parseInt(e.target.value))}
        />
      </FormControl>

      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
        <FormControl>
          <FormLabel>Capacity</FormLabel>
          <Input
            placeholder="Please Enter base capacity"
            variant="outline"
            borderColor="purple.300"
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Unit</FormLabel>
          <Select
            placeholder="Select Unit"
            variant="outline"
            borderColor="purple.300"
            value={capacityUnit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option>Grams</option>
            <option>Kilograms</option>
            <option>Liters</option>
          </Select>
        </FormControl>
      </Grid>

      <FormControl>
        <FormLabel>Alergens</FormLabel>
        <Select
          placeholder="Select the suitable option"
          variant="outline"
          borderColor="purple.300"
          value={alergens}
          onChange={(e) => setAlergens(e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </Select>
      </FormControl>

      {/* Buttons */}
      <Flex justify="space-between" mt={4}>
        <Button
          colorScheme="orange"
          color="white"
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button colorScheme="pink" color="white" onClick={() => handleSubmit()}>
          Add Item
        </Button>
      </Flex>
    </Box>
  );
};

export default InventoryForm;
