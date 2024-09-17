import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Image,
  Flex,
  Spacer,
} from "@chakra-ui/react";

type Props = {
  name: string;
  description: string;
  size: {
    sizeName: string;
    ingredients: {
      name: string;
      properties: {
        quantity: number;
        unit: string;
      };
    }[];
    preparationTime: number;
    sellingPrice: number;
    
    addOns: {
      name: string;
      quantity: number;
      unit: string;
    }[];
  }[];
  image: string;
  onClick: () => void;
};

const CustomCard = ({ name,description, size, image, onClick }: Props) => {
  return (
    <Card
      maxW="sm"
      h="40vh"
      w="15vw"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      onClick={onClick}
    >
      <CardBody p={"2"}>
        <Image src={image} alt={name} borderRadius="lg" h="120px" w="250px" />
        <Stack mt="3" spacing="1">
          <Heading size="md" fontWeight={"semibold"}>
            {name}
          </Heading>
          {size.map((s) => (
            <Flex key={s.sizeName} justify="space-between" align="center">
              <Text color="#ff5841" fontSize="md">
                {s.sizeName}
              </Text>
              <Text color="#ff5841" fontSize="md">
                ${s.sellingPrice}
              </Text>
            </Flex>
          ))}
        </Stack>
        <Stack>
          <text>
            {description}
          </text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
