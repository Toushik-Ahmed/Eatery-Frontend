"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  HStack,
  Divider,
  Image,
  Select,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import {
  createMenuItem,
  resetMenuItem,
  uploadImage,
} from "../../redux/MenuBuilder/MenuItemSlice";
import { AppDispatch } from "../../redux/store";
import { select } from "framer-motion/client";

const CreateMenuForm: React.FC = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [mealTimes, setMealTimes] = useState([{ mealtime: "" }]);
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const [sizes, setSizes] = useState([
    {
      sizeName: "",
      ingredients: [{ name: "", properties: { quantity: 0, unit: "" } }],
      preparationTime: 0,
      sellingPrice: 0,
      addOns: [{ name: "", quantity: 0, unit: "", addonPrice: 0 }],
    },
  ]);

  // Cloudinary Configuration .............
  // const uploadImageToCloudinary = async (imageFile: File) => {
  //   const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dglgia8j6/image/upload`;
  //   const formData = new FormData();

  //   // Add required Cloudinary fields...............
  //   formData.append("file", imageFile);
  //   formData.append("upload_preset", "Barshon");

  //   // Upload image.....................
  //   try {
  //     const response = await axios.post(cloudinaryUrl, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     return response.data.secure_url;
  //   } catch (error) {
  //     console.error("Image upload error:", error);
  //     throw new Error("Failed to upload image");
  //   }
  // };

  // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     setImageFile(file);
  //     try {
  //       const uploadedImageUrl = await uploadImageToCloudinary(file);
  //       setImageUrl(uploadedImageUrl);
  //       alert("Image uploaded successfully!");
  //     } catch (error) {
  //       alert("Image upload failed. Please try again.");
  //     }
  //   }
  // };
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store file locally if needed
      try {
        const resultAction = await dispatch(uploadImage(file));

        if (uploadImage.fulfilled.match(resultAction)) {
          const uploadedImageUrl = resultAction.payload as string; // Ensure payload is of type string
          setImageUrl(uploadedImageUrl); // Update local state with the image URL
          alert("Image uploaded successfully!");
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error(error);
        alert("Image upload failed. Please try again.");
      }
    }
  };

  const handleMealTimeChange = (index: number, value: string) => {
    const updatedMealTimes = [...mealTimes];
    updatedMealTimes[index].mealtime = value;
    setMealTimes(updatedMealTimes);
  };

  const addMealTime = () => {
    setMealTimes([...mealTimes, { mealtime: "" }]);
  };

  const removeMealTime = (index: number) => {
    setMealTimes(mealTimes.filter((_, i) => i !== index));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!name || !category || !description || !imageUrl) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   const mealTimeValues = mealTimes
  //     .map((mt) => ({ mealtime: mt.mealtime }))
  //     .filter((mt) => mt.mealtime);
  //   if (mealTimeValues.length === 0) {
  //     alert("Please fill in all meal times.");
  //     return;
  //   }

  //   const newMenuItem = {
  //     name,
  //     category,
  //     mealTime: mealTimeValues,
  //     description,
  //     image: imageUrl,
  //     size: sizes,
  //   };

  //   try {
  //     await dispatch(createMenuItem(newMenuItem) as any);

  //     setName("");
  //     setCategory("");
  //     setMealTimes([{ mealtime: "" }]);
  //     setDescription("");
  //     setImageUrl("");
  //     setSizes([
  //       {
  //         sizeName: "",
  //         ingredients: [{ name: "", properties: { quantity: 0, unit: "" } }],
  //         preparationTime: 0,
  //         sellingPrice: 0,
  //         addOns: [{ name: "", quantity: 0, unit: "", addonPrice: 0 }],
  //       },
  //     ]);

  //     dispatch(resetMenuItem());

  //     alert("Form Submitted Successfully!");
  //   } catch (error) {
  //     alert("Failed to submit form. Please try again.");
  //     console.error(error);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Wait for the image to upload before submitting the form
    await handleImageUpload(
      e as React.ChangeEvent<HTMLInputElement>
    );

    if (!name || !category || !description || !imageUrl) {
      alert("Please fill in all required fields.");
      return;
    }

    const mealTimeValues = mealTimes
      .map((mt) => ({ mealtime: mt.mealtime }))
      .filter((mt) => mt.mealtime);
    if (mealTimeValues.length === 0) {
      alert("Please fill in all meal times.");
      return;
    }

    const newMenuItem = {
      name,
      category,
      mealTime: mealTimeValues,
      description,
      image: imageUrl,
      size: sizes,
    };

    try {
      await dispatch(createMenuItem(newMenuItem) as any);
      console.log("Menu Item Created:", newMenuItem);

      // Reset form state
      setName("");
      setCategory("");
      setMealTimes([{ mealtime: "" }]);
      setDescription("");
      setImageUrl("");
      setSizes([
        {
          sizeName: "",
          ingredients: [{ name: "", properties: { quantity: 0, unit: "" } }],
          preparationTime: 0,
          sellingPrice: 0,
          addOns: [{ name: "", quantity: 0, unit: "", addonPrice: 0 }],
        },
      ]);

      dispatch(resetMenuItem());
      alert("Form Submitted Successfully!");
    } catch (error) {
      alert("Failed to submit form. Please try again.");
      console.error(error);
    }
  };

  const addSize = () => {
    setSizes([
      ...sizes,
      {
        sizeName: "",
        ingredients: [{ name: "", properties: { quantity: 0, unit: "" } }],
        preparationTime: 0,
        sellingPrice: 0,
        addOns: [{ name: "", quantity: 0, unit: "", addonPrice: 0 }],
      },
    ]);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
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
      onSubmit={handleSubmit}
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
      <VStack spacing={6} align="start">
        <FormControl isRequired>
          <FormLabel fontWeight="bold">Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter menu item name"
            focusBorderColor="teal.500"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="bold">Category</FormLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Select category"
            focusBorderColor="teal.500"
          >
            <option value="Fast Food">Fast Food</option>
            <option value="Meal">Meal</option>
            <option value="Beverage">Beverage</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Meal Times</FormLabel>
          {mealTimes.map((mealTime, index) => (
            <HStack key={index} spacing={4}>
              <Select
                value={mealTime.mealtime}
                onChange={(e) => handleMealTimeChange(index, e.target.value)}
                placeholder="Select meal time"
                focusBorderColor="teal.500"
              >
                <option value="All Day">All Day</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </Select>
              <IconButton
                icon={<MinusIcon />}
                aria-label="Remove meal time"
                colorScheme="red"
                onClick={() => removeMealTime(index)}
              />
            </HStack>
          ))}
          <Button
            onClick={addMealTime}
            leftIcon={<AddIcon />}
            colorScheme="orange"
            mt={2}
          >
            Add Meal Time
          </Button>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            focusBorderColor="teal.500"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontWeight="bold">Upload Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(selectedFile) => {
              const file = selectedFile.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  setImageUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
              }
            }}
            focusBorderColor="teal.500"
          />
          {imageUrl && (
            <Box>
              <Image
                src={imageUrl}
                alt="Uploaded image"
                boxSize="150px"
                mt={2}
              />
            </Box>
          )}
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Sizes</FormLabel>
          {sizes.map((size, index) => (
            <Box
              key={index}
              p={4}
              bg="FFFFF0"
              borderWidth={1}
              borderRadius="md"
              w="full"
              boxShadow="sm"
              mt={2}
            >
              <HStack justify="space-between">
                <FormControl isRequired>
                  <FormLabel>Size Name</FormLabel>
                  <Select
                    value={size.sizeName}
                    onChange={(e) => {
                      const updatedSizes = [...sizes];
                      updatedSizes[index].sizeName = e.target.value;
                      setSizes(updatedSizes);
                    }}
                    placeholder="Select size"
                    focusBorderColor="teal.500"
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>

                    <option value="Regular">Regular</option>
                    <option value="Premium">Premium</option>

                    <option value='6"'>6"</option>
                    <option value='8"'>8"</option>
                    <option value='12"'>12"</option>

                    <option value="2 PCs">2 PCs</option>
                    <option value="4 PCs">4 PCs</option>
                    <option value="8 PCs">8 PCs</option>
                  </Select>
                </FormControl>

                <IconButton
                  icon={<MinusIcon />}
                  aria-label="Remove size"
                  colorScheme="red"
                  onClick={() => removeSize(index)}
                />
              </HStack>

              <Divider my={4} />

              <FormControl>
                <FormLabel>Ingredients</FormLabel>
                {size.ingredients.map((ingredient, ingIndex) => (
                  <HStack key={ingIndex} spacing={4}>
                    <Input
                      placeholder="Ingredient Name"
                      value={ingredient.name}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].ingredients[ingIndex].name =
                          e.target.value;
                        setSizes(updatedSizes);
                      }}
                      focusBorderColor="teal.500"
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={ingredient.properties.quantity}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].ingredients[
                          ingIndex
                        ].properties.quantity = Number(e.target.value);
                        setSizes(updatedSizes);
                      }}
                      focusBorderColor="teal.500"
                    />

                    <Select
                      value={ingredient.properties.unit}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].ingredients[
                          ingIndex
                        ].properties.unit = e.target.value;
                        setSizes(updatedSizes);
                      }}
                      placeholder="Select unit"
                      focusBorderColor="teal.500"
                    >
                      <option value="Gram">Gram</option>
                      <option value="Litre">Litre</option>
                      <option value="K.G">K.G</option>
                      <option value="PCS">PCS</option>
                    </Select>
                  </HStack>
                ))}
              </FormControl>

              <Button
                mt={2}
                colorScheme="orange"
                leftIcon={<AddIcon />}
                onClick={() => {
                  const updatedSizes = [...sizes];
                  updatedSizes[index].ingredients.push({
                    name: "",
                    properties: { quantity: 0, unit: "" },
                  });
                  setSizes(updatedSizes);
                }}
              >
                Add Ingredient
              </Button>

              <Divider my={4} />

              <FormControl isRequired>
                <FormLabel>Preparation Time (minutes)</FormLabel>
                <Input
                  type="number"
                  value={size.preparationTime}
                  onChange={(e) => {
                    const updatedSizes = [...sizes];
                    updatedSizes[index].preparationTime = Number(
                      e.target.value
                    );
                    setSizes(updatedSizes);
                  }}
                  focusBorderColor="teal.500"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Selling Price</FormLabel>
                <Input
                  type="number"
                  value={size.sellingPrice}
                  onChange={(e) => {
                    const updatedSizes = [...sizes];
                    updatedSizes[index].sellingPrice = Number(e.target.value);
                    setSizes(updatedSizes);
                  }}
                  focusBorderColor="teal.500"
                />
              </FormControl>

              <Divider my={4} />

              <FormControl>
                <FormLabel>Add-Ons</FormLabel>
                {size.addOns.map((addOn, addIndex) => (
                  <HStack key={addIndex} spacing={4}>
                    <Input
                      placeholder="Add-On Name"
                      value={addOn.name}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].addOns[addIndex].name =
                          e.target.value;
                        setSizes(updatedSizes);
                      }}
                      focusBorderColor="teal.500"
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={addOn.quantity}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].addOns[addIndex].quantity = Number(
                          e.target.value
                        );
                        setSizes(updatedSizes);
                      }}
                      focusBorderColor="teal.500"
                    />

                    <Select
                      value={addOn.unit}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].addOns[addIndex].unit =
                          e.target.value;
                        setSizes(updatedSizes);
                      }}
                      placeholder="Select unit"
                      focusBorderColor="teal.500"
                    >
                      <option value="Gram">Gram</option>
                      <option value="Litre">Litre</option>
                      <option value="K.G">K.G</option>
                      <option value="PCS">PCS</option>
                    </Select>
                    <Input
                      type="number"
                      placeholder="Add-On Price"
                      value={addOn.addonPrice}
                      onChange={(e) => {
                        const updatedSizes = [...sizes];
                        updatedSizes[index].addOns[addIndex].addonPrice =
                          Number(e.target.value);
                        setSizes(updatedSizes);
                      }}
                      focusBorderColor="teal.500"
                    />
                  </HStack>
                ))}
              </FormControl>

              <Button
                mt={2}
                colorScheme="orange"
                leftIcon={<AddIcon />}
                onClick={() => {
                  const updatedSizes = [...sizes];
                  updatedSizes[index].addOns.push({
                    name: "",
                    quantity: 0,
                    unit: "",
                    addonPrice: 0,
                  });
                  setSizes(updatedSizes);
                }}
              >
                Add-On
              </Button>
            </Box>
          ))}
          <Button
            onClick={addSize}
            colorScheme="orange"
            leftIcon={<AddIcon />}
            mt={2}
          >
            Add Size
          </Button>
        </FormControl>

        <Button
          type="submit"
          colorScheme="teal"
          size="lg"
          w="full"
          onClick={() => {
            handleSubmit;
          }}
        >
          Add Item
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateMenuForm;
