"use client";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Select,
  Text,
  VStack,
  HStack,
  Divider,
  Tag,
  List,
  ListItem,
  Grid,
  GridItem,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  deleteMenuItem,
  getmenuItems,
} from "@/redux/MenuBuilder/MenuCardSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

interface Ingredient {
  name: string;
  properties: {
    quantity: number;
    unit: string;
  };
}

interface AddOn {
  name: string;
  quantity: number;
  unit: string;
  addonPrice: number;
}

interface Size {
  sizeName: string;
  ingredients: Ingredient[];
  addOns: AddOn[];
  sellingPrice: number;
  preparationTime: number;
}

interface SelectedItem {
  _id: string;
  itemName: string;
  image: string;
  description: string;
  tastyTag?: string;
  mealTime: string[];
  size: Size[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: SelectedItem | null;
  selectedSize: number;
  setSelectedSize: (size: number) => void;
  onDelete: () => void; // Function to handle item deletion
}

const ItemDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedItem,
  selectedSize,
  setSelectedSize,
  onDelete,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  useEffect(() => {
    dispatch(getmenuItems());
  }, [dispatch]);

  const handleDelete = async () => {
    if (selectedItem) {
      console.log("Attempting to delete item with ID:", selectedItem._id);

      try {
        await dispatch(deleteMenuItem(selectedItem._id.toString()) as any);
        toast({
          title: "Item deleted.",
          description: "The selected item has been deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onDelete();
      } catch (error) {
        console.error("Error deleting item:", error); // Log the error
        toast({
          title: "Deletion failed.",
          description: "There was an error deleting the item.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent
        width="30vw"
        maxWidth="30vw"
        bg="gray.50"
        borderRadius="lg"
        boxShadow="lg"
      >
        <DrawerCloseButton />
        <DrawerHeader bg="#d91a40" color="white" borderBottomWidth="1px">
          <Text fontSize="2xl" fontWeight="bold">
            {selectedItem?.itemName}
          </Text>
        </DrawerHeader>
        <DrawerBody p={6}>
          {selectedItem ? (
            <VStack spacing={6} align="flex-start">
              {/* Image and Size Selector part */}
              <Grid templateColumns="1fr" gap={6}>
                <GridItem>
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.itemName}
                    borderRadius="md"
                    boxShadow="md"
                    width="100%"
                  />
                </GridItem>
                <GridItem>
                  <Text fontWeight="bold">Size:</Text>
                  <Select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(Number(e.target.value))}
                    borderColor="black.300"
                    focusBorderColor="#FF5841"
                  >
                    {selectedItem.size.map((size, index) => (
                      <option key={index} value={index}>
                        {size.sizeName}
                      </option>
                    ))}
                  </Select>
                </GridItem>
              </Grid>
              <Divider borderColor="black" borderWidth="2px" />

              {/* Description and Details part */}
              <VStack align="flex-start" spacing={3}>
                <Text fontWeight="bold" fontSize="lg">
                  Description:
                </Text>
                <Text>{selectedItem.description}</Text>

                {/* <Text fontWeight="bold" fontSize="lg">
                  Available at:
                </Text> */}
              </VStack>
              <Divider borderColor="black" borderWidth="2px" />

              {/* Ingredients part */}
              <VStack align="flex-start" spacing={3}>
                <Text fontWeight="bold" fontSize="lg">
                  Ingredients for {selectedItem.size[selectedSize].sizeName}:
                </Text>
                <List spacing={2}>
                  {selectedItem.size[selectedSize].ingredients.map(
                    (ing, idx) => (
                      <ListItem key={idx}>
                        {ing.name}: {ing.properties.quantity}{" "}
                        {ing.properties.unit}
                      </ListItem>
                    )
                  )}
                </List>
              </VStack>
              <Divider borderColor="black" borderWidth="2px" />

              {/* Add-ons part */}
              {selectedItem.size[selectedSize].addOns.length > 0 && (
                <VStack align="flex-start" spacing={3}>
                  <Text fontWeight="bold" fontSize="lg">
                    Add-ons:
                  </Text>
                  <List spacing={2}>
                    {selectedItem.size[selectedSize].addOns.map(
                      (addon, idx) => (
                        <ListItem key={idx}>
                          {addon.name}: {addon.quantity} {addon.unit} ($
                          {addon.addonPrice})
                        </ListItem>
                      )
                    )}
                  </List>
                </VStack>
              )}
              <Divider borderColor="black" borderWidth="2px" />

              {/* Price and Preparation Time part */}
              <Text fontWeight="bold">
                Preparation Time:{" "}
                {selectedItem.size[selectedSize].preparationTime} minutes
              </Text>
              <Text fontWeight="bold" fontSize="xl">
                Price: ${selectedItem.size[selectedSize].sellingPrice}
              </Text>
              <Box mt={6}>
                <Button
                  bg="#d91a40"
                  _hover={{ bg: "#d91a40", color: "white" }}
                  onClick={handleDelete}
                  size="lg"
                  width="100%"
                >
                  Delete Item
                </Button>
              </Box>
            </VStack>
          ) : (
            <Text>No item selected.</Text>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ItemDrawer;
