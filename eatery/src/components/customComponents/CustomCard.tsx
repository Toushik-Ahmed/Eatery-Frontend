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

const CustomCard = ({ name, size, image, onClick }: Props) => {
  return (
    <Card
      w={["fit", "fit", "15vw", "10vw"]}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      onClick={onClick}
    >
      <CardBody p={"2"}>
        <Image src={image} alt={name} borderRadius="lg" objectFit={"cover"} />
        <Stack mt="2" spacing="1">
          <Heading size="md" fontWeight={"semibold"} objectFit={"cover"}>
            {name}
          </Heading>
          {size.map((s) => (
            <Flex key={s.sizeName} justify="space-between" align="center">
              <Text
                color="#d91656"
                fontSize={["md", "md", "md", "md"]}
                fontWeight={"semibold"}
                objectFit={"cover"}
              >
                {s.sizeName}
              </Text>
              <Text
                color="#ff5841"
                fontSize={["md", "md", "md", "md"]}
                fontWeight={"semibold"}
                objectFit={"cover"}
              >
                ${s.sellingPrice}
              </Text>
            </Flex>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
