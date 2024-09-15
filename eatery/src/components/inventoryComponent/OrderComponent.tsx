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

const OrderComponent = (props: Props) => {
  return (
    <div>
      <Box
        p={6}
        bg="#FFFFF0"
        borderRadius="lg"
        w={{ base: '100%', md: '80%', lg: '100%' }}
        boxShadow="lg"
        h="100%"
      >
        <Flex align="center" mt={2} mb={2}>
          <Box fontSize="2xl" fontWeight="bold">
            Order Item
          </Box>
        </Flex>

        <Image
          src="https://img.freepik.com/free-photo/seasoning-ingredients-wooden-board_23-2148601149.jpg?t=st=1726141583~exp=1726145183~hmac=d2f86f78636cd3ce16707dfafcdef8fe97a7f6c988e4224df66fa941954ed19c&w=100"
          mx="auto"
          my={4}
          borderRadius="md"
          width={{ base: '50%', md: '30%' }}
        />

        <FormControl>
          <FormLabel>Ingredient</FormLabel>
          <Input
            placeholder=" Enter Ingredient Name"
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

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={4}
        ></Grid>

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
            Order
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default OrderComponent;
