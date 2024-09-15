import React from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  Image,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  CloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  CheckboxGroup,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

const Form = () => {
  return (
    <Box
      p={{ base: 2, md: 5 }}
      bg="#FFFFF0"
      borderRadius="lg"
      maxW={{ base: "100%", md: "700px" }}
      m="0 auto"
      boxShadow="lg"
    >
      {/* Header Section */}
      {/* <Flex align="center" mt={8} mb={8}> */}
      <Box fontSize="2xl" fontWeight="bold" textAlign="center">
        Create Menu Item
      </Box>
      {/* </Flex> */}
      <Image
        // src="https://kfcbd.com/storage/products/lWKKP0vwKrr4yspTCFxtGTSi3.jpg"
        src="https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?t=st=1726082801~exp=1726086401~hmac=8046bca01720e55afd3bf69de6c619f661b50c42c1c2e04aacad0a8fd86ed050&w=740"
        mx="auto"
        my="5"
        borderRadius="full"
        width={{ base: "50%", md: "30%" }}
      />
      {/* Form Section */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormControl>
          <FormLabel>Item Name</FormLabel>
          <Input
            placeholder="Please Enter Item Name"
            variant="outline"
            borderColor="purple.300"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select Category"
            variant="outline"
            borderColor="purple.300"
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Tasty Tags</FormLabel>
          <Select
            placeholder="Select Tags"
            variant="outline"
            borderColor="purple.300"
          >
            <option value="option1">Regular</option>
            <option value="option2">Naga </option>
            <option value="option2">Extra Naga</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Meal Time</FormLabel>
          <Select
            placeholder="Select Meal Time"
            variant="outline"
            borderColor="purple.300"
          >
            <option value="recipe1">All Day</option>
            <option value="recipe2">Breakfast</option>
            <option value="recipe2">Lunch</option>
            <option value="recipe2">Dinner</option>
          </Select>
        </FormControl>

        <FormControl gridColumn={{ base: "span 1", md: "span 2" }}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Write something about this"
            borderColor="purple.300"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Size</FormLabel>
          <Select
            placeholder="Select Size"
            variant="outline"
            borderColor="purple.300"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
          <FormLabel>
            <Button colorScheme="orange" color="white" mt={4}>
              +
            </Button>
          </FormLabel>
        </FormControl>
      </Grid>

      <Skeleton
        startColor="pink.500"
        endColor="orange.500"
        height="20px"
        my={6}
      />

      <Accordion defaultIndex={[0]} allowMultiple>
        {/* Add ingredients section */}
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <FormLabel>Add Ingredients</FormLabel>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={4}
            >
              <AccordionItem>
                <FormLabel>
                  Ingredients
                  <AccordionButton>
                    <AccordionIcon />
                  </AccordionButton>
                </FormLabel>

                <AccordionPanel pb={4}>
                  <CheckboxGroup colorScheme="purple">
                    <Stack spacing={2}>
                      <Checkbox value="addon1">Add-On 1</Checkbox>
                      <Checkbox value="addon2">Add-On 2</Checkbox>
                      <Checkbox value="addon3">Add-On 3</Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>

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
          </AccordionPanel>
        </AccordionItem>

        {/* Add-ons Section */}
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <FormLabel>Add Ons</FormLabel>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={4}
            >
              <AccordionItem>
                <FormLabel>
                  Ons
                  <AccordionButton>
                    <AccordionIcon />
                  </AccordionButton>
                </FormLabel>

                <AccordionPanel pb={4}>
                  <CheckboxGroup colorScheme="purple">
                    <Stack spacing={2}>
                      <Checkbox value="addon1">Add-On 1</Checkbox>
                      <Checkbox value="addon2">Add-On 2</Checkbox>
                      <Checkbox value="addon3">Add-On 3</Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>

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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
        <FormControl mt={4}>
          <FormLabel>Preparation Time</FormLabel>
          <Input
            placeholder="Please Enter Preparation Time"
            variant="outline"
            borderColor="purple.300"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Price</FormLabel>
          <Input
            placeholder="Please Enter Preparation Time"
            variant="outline"
            borderColor="purple.300"
          />
        </FormControl>
      </Grid>

      {/* Buttons */}
      <Flex justify="flex-end" mt={8}>
        <Button mr={4} colorScheme="orange" color="white">
          Cancel
        </Button>
        <Button colorScheme="pink" color="white">
          Add Item
        </Button>
      </Flex>
    </Box>
  );
};

export default Form;
