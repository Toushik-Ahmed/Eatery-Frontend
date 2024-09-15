"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  Image,
  FormControl,
  FormLabel,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

const Form: React.FC = () => {
  const [ingredients, setIngredients] = useState<
    { ingredient: string; quantity: string; unit: string }[]
  >([]);
  const [addOns, setAddOns] = useState<
    { addOn: string; quantity: string; unit: string }[]
  >([]);
  const [ingredientData, setIngredientData] = useState({
    ingredient: "",
    quantity: "",
    unit: "",
  });
  const [addOnData, setAddOnData] = useState({
    addOn: "",
    quantity: "",
    unit: "",
  });

  const [sizes, setSizes] = useState<
    {
      size: string;
      preparationTime: string;
      price: string;
      ingredients: { ingredient: string; quantity: string; unit: string }[];
      addOns: { addOn: string; quantity: string; unit: string }[];
    }[]
  >([]); // Store size with prep time, price, ingredients, and add-ons

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [preparationTime, setPreparationTime] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const [itemName, setItemName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tastyTags, setTastyTags] = useState<string>("");
  const [mealTime, setMealTime] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setIngredientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = () => {
    if (
      !ingredientData.ingredient ||
      !ingredientData.quantity ||
      !ingredientData.unit
    ) {
      alert("Please fill all fields for ingredients.");
      return;
    }
    setIngredients([...ingredients, ingredientData]);
    setIngredientData({ ingredient: "", quantity: "", unit: "" });
  };

  const handleAddOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAddOnData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddOn = () => {
    if (!addOnData.addOn || !addOnData.quantity || !addOnData.unit) {
      alert("Please fill all fields for add-ons.");
      return;
    }
    setAddOns([...addOns, addOnData]);
    setAddOnData({ addOn: "", quantity: "", unit: "" });
  };

  // Handle size selection, preparation time, price, ingredients, and add-ons addition
  const handleAddSize = () => {
    if (!selectedSize || !preparationTime || !price) {
      alert("Please fill all fields for size, preparation time, and price."); // Show an alert if any field is empty
      return;
    }

    if (ingredients.length === 0 && addOns.length === 0) {
      alert("Please add at least one ingredient or add-on."); // Ensure there is at least one ingredient or add-on
      return;
    }

    // If all fields are filled, proceed to add the size
    setSizes((prevSizes) => [
      ...prevSizes,
      {
        size: selectedSize,
        preparationTime,
        price,
        ingredients: [...ingredients],
        addOns: [...addOns],
      },
    ]);

    // Reset the fields after adding the size
    setSelectedSize("");
    setPreparationTime("");
    setPrice("");
    setIngredients([]);
    setAddOns([]);
  };

  // Handle form submission only for the "Add Item" button
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      itemName,
      category,
      tastyTags,
      mealTime,
      description,
      sizes,
    };

    // Display the collected data (log it for now)
    console.log(formData);

    // Clear the form fields after submitting
    setItemName("");
    setCategory("");
    setTastyTags("");
    setMealTime("");
    setDescription("");
    setSizes([]);
  };

  return (
    <Box
      p={{ base: 2, md: 5 }}
      bg="#FFFFF0"
      borderRadius="lg"
      maxW={{ base: "100%", md: "700px" }}
      m="0 auto"
      boxShadow="lg"
      as="form"
      onSubmit={handleSubmit} // Use onSubmit only for the form
    >
      {/* Header Section */}
      <Box fontSize="2xl" fontWeight="bold" textAlign="center">
        Create Menu Item
      </Box>

      <Image
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
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select Category"
            variant="outline"
            borderColor="purple.300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={tastyTags}
            onChange={(e) => setTastyTags(e.target.value)}
          >
            <option value="option1">Regular</option>
            <option value="option2">Naga</option>
            <option value="option3">Extra Naga</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Meal Time</FormLabel>
          <Select
            placeholder="Select Meal Time"
            variant="outline"
            borderColor="purple.300"
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
          >
            <option value="allDay">All Day</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </Select>
        </FormControl>

        <FormControl gridColumn={{ base: "span 1", md: "span 2" }}>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="Write something about this"
            borderColor="purple.300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Size</FormLabel>
          <Select
            placeholder="Select Size"
            variant="outline"
            borderColor="purple.300"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Preparation Time</FormLabel>
          <Input
            placeholder="Please Enter Preparation Time"
            variant="outline"
            borderColor="purple.300"
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            placeholder="Please Enter Price"
            variant="outline"
            borderColor="purple.300"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>

        <Button
          colorScheme="orange"
          color="white"
          mt={4}
          onClick={handleAddSize}
        >
          +
        </Button>
      </Grid>

      {/* Display the saved sizes with preparation time, price, ingredients, and add-ons */}
      <Box mt={6}>
        {sizes.map((sizeInfo, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={4}>
            <Text>
              <strong>{sizeInfo.size}</strong> - Prep Time:{" "}
              {sizeInfo.preparationTime}, Price: {sizeInfo.price}
            </Text>
            <Text>
              <strong>Ingredients:</strong>
            </Text>
            <Box ml={4}>
              {sizeInfo.ingredients.length === 0 ? (
                <Text>No Ingredients</Text>
              ) : (
                sizeInfo.ingredients.map((ingredient, i) => (
                  <Text key={i}>
                    {ingredient.ingredient} - {ingredient.quantity}{" "}
                    {ingredient.unit}
                  </Text>
                ))
              )}
            </Box>
            <Text>
              <strong>Add-Ons:</strong>
            </Text>
            <Box ml={4}>
              {sizeInfo.addOns.length === 0 ? (
                <Text>No Add-Ons</Text>
              ) : (
                sizeInfo.addOns.map((addOn, i) => (
                  <Text key={i}>
                    {addOn.addOn} - {addOn.quantity} {addOn.unit}
                  </Text>
                ))
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Skeleton
        startColor="pink.500"
        endColor="orange.500"
        height="20px"
        my={6}
      />

      <Accordion defaultIndex={[0]} allowMultiple>
        {/* Ingredients Section */}
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
              <FormControl>
                <FormLabel>Ingredient</FormLabel>
                <Input
                  name="ingredient"
                  placeholder="Ingredient Name"
                  variant="outline"
                  borderColor="purple.300"
                  value={ingredientData.ingredient}
                  onChange={handleIngredientChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  name="quantity"
                  placeholder="Quantity"
                  variant="outline"
                  borderColor="purple.300"
                  value={ingredientData.quantity}
                  onChange={handleIngredientChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Unit</FormLabel>
                <Select
                  name="unit"
                  placeholder="Select Unit"
                  variant="outline"
                  borderColor="purple.300"
                  value={ingredientData.unit}
                  onChange={handleIngredientChange}
                >
                  <option value="g">Grams</option>
                  <option value="kg">Kilograms</option>
                  <option value="l">Liters</option>
                </Select>
              </FormControl>

              <Button
                colorScheme="orange"
                color="white"
                mt={4}
                onClick={handleAddIngredient}
              >
                Add Ingredient
              </Button>
            </Grid>

            <Box mt={6}>
              {ingredients.map((ingredient, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  mb={4}
                >
                  <Text>
                    <strong>Ingredient:</strong> {ingredient.ingredient}
                  </Text>
                  <Text>
                    <strong>Quantity:</strong> {ingredient.quantity}
                  </Text>
                  <Text>
                    <strong>Unit:</strong> {ingredient.unit}
                  </Text>
                </Box>
              ))}
            </Box>
          </AccordionPanel>
        </AccordionItem>

        {/* Add-ons Section */}
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              <FormLabel>Add Add-ons</FormLabel>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={4}
            >
              <FormControl>
                <FormLabel>Add-On</FormLabel>
                <Input
                  name="addOn"
                  placeholder="Add-On Name"
                  variant="outline"
                  borderColor="purple.300"
                  value={addOnData.addOn}
                  onChange={handleAddOnChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  name="quantity"
                  placeholder="Quantity"
                  variant="outline"
                  borderColor="purple.300"
                  value={addOnData.quantity}
                  onChange={handleAddOnChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Unit</FormLabel>
                <Select
                  name="unit"
                  placeholder="Select Unit"
                  variant="outline"
                  borderColor="purple.300"
                  value={addOnData.unit}
                  onChange={handleAddOnChange}
                >
                  <option value="g">Grams</option>
                  <option value="kg">Kilograms</option>
                  <option value="l">Liters</option>
                </Select>
              </FormControl>

              <Button
                colorScheme="orange"
                color="white"
                mt={4}
                onClick={handleAddAddOn}
              >
                Add Add-On
              </Button>
            </Grid>

            <Box mt={6}>
              {addOns.map((addOn, index) => (
                <Box
                  key={index}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  mb={4}
                >
                  <Text>
                    <strong>Add-On:</strong> {addOn.addOn}
                  </Text>
                  <Text>
                    <strong>Quantity:</strong> {addOn.quantity}
                  </Text>
                  <Text>
                    <strong>Unit:</strong> {addOn.unit}
                  </Text>
                </Box>
              ))}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* Buttons */}
      {/* <Flex justify="flex-end" mt={8}>
        <Button mr={4} colorScheme="orange" color="white"  type="submit">
          Cancel
        </Button>
        <Button colorScheme="pink" color="white">
          Add Item
        </Button>
      </Flex> */}

<Button colorScheme="purple" mt={5} type="submit">
        Add Item
      </Button>
    </Box>
  );
};


export default Form;
