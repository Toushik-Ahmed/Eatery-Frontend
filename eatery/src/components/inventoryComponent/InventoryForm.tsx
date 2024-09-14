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

type Props = {};

const InventoryForm = (props: Props) => {
  return (

      <Box
        p={6}

        bg="#FFFFF0"
        borderRadius="lg"
        w={{ base: '100%', md: '80%', lg: '100%' }}
        boxShadow="lg"
        h="100%"
      >
        {/* Header Section */}
        {/* <Flex justify="flex-end">
          <CloseButton />
        </Flex> */}
        <Flex align="center" mt={2} mb={2}>
          <Box fontSize="2xl" fontWeight="bold">
            Add Ingredients
          </Box>
        </Flex>

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
          />
        </FormControl>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
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

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
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
        <Flex justify="space-between" mt={4}>
          <Button colorScheme="orange" color="white">
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
