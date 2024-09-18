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
import React from "react";

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
  name: string;
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
  const toast = useToast();

  const handleDelete = () => {
    onDelete();

    toast({
      title: "Item deleted.",
      description: "The selected item has been deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
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
        <DrawerHeader bg="#FF5841" color="white" borderBottomWidth="1px">
          <Text fontSize="2xl" fontWeight="bold">
            {selectedItem?.name}
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
                    alt={selectedItem.name}
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

                {/* Conditionally Render Tasty Tag */}
                {/* {selectedItem.tastyTag && (
                  <>
                    <Text fontWeight="bold" fontSize="lg">
                      Tasty Tag:
                    </Text>
                    <Tag colorScheme="teal">{selectedItem.tastyTag}</Tag>
                  </>
                )} */}

                <Text fontWeight="bold" fontSize="lg">
                  Available at:
                </Text>
                <HStack spacing={2}>
                  {Array.isArray(selectedItem.mealTime) &&
                    selectedItem.mealTime.map((time, idx) => (
                      <Tag key={idx} colorScheme="blue">
                        {time}
                      </Tag>
                    ))}
                </HStack>
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
                  colorScheme="red"
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
