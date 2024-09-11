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
  size: string;
  image: string;
  price: number;
};

const CustomCard = ({ name, size, image, price}: Props) => {
  return (
    <Card
      maxW="sm"
      h="26vh"
      w="10vw"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
    >
      <CardBody p={"2"}>
        <Image src={image} alt={name} borderRadius="lg" h="120px" w="250px" />
        <Stack mt="2" spacing="1">
          <Heading size="md" fontWeight={"semibold"} >
            {name}
          </Heading>
          <Text color="black" fontSize="md">
            The Best cheese burger you will ever have
          </Text>
          <Flex>
          <Text color="#ff5841" fontSize="md" >
            {price}
          </Text>
          <Spacer />
          <Text color="#ff5841" fontSize="md" >
            {size}
          </Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
