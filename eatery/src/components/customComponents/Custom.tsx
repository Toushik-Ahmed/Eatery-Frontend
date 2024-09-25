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
      w={["40vw", "30vw", "20vw", "10vw"]}
      bg="white"
      borderRadius="lg"
      boxShadow={"none"}
      onClick={onClick}
      h={{ base: "36vh", md: "36vh", xl: "26vh" }}
    >
      <CardBody p={"2"}>
        <Image
          src={image}
          alt={name}
          w={["40vw", "30vw", "50vw", "10vw"]}
          h={"12vh"}
          borderRadius="lg"
          objectFit={"cover"}
        />
        <Stack mt="1" spacing="1">
          <Text fontSize="md" fontWeight={"bold"} objectFit={"cover"}>
            {name}
          </Text>
          {size.map((s) => (
            <Flex key={s.sizeName} justify="space-between" align="center">
              <Text
                color="#d91656"
                fontSize={["sm", "sm", "sm", "sm"]}
                fontWeight={"bold"}
                objectFit={"cover"}
              >
                {s.sizeName}
              </Text>
              <Text
                color="#ff5841"
                fontSize={["sm", "sm", "sm", "sm"]}
                fontWeight={"bold"}
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
