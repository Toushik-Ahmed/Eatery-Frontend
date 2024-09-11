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
} from "@chakra-ui/react";


type Props = {
  name: string,
  size: string,
  image: string,
  price: number,
  addons: string
};

const CustomCard = ({name, size, image, price,addons}: Props) => {
  return (
    <Card maxW="sm" h="22vh" w="15vw" bg="#F2F0EA" borderRadius="lg" boxShadow='md'>
      <CardBody p="15px">
        <Image
          src={image}
          alt={name}
          borderRadius="lg"
          h="120px"
          w="250px"
        />
        <Stack mt="2" spacing="1">
          <Heading size="md" fontWeight={"semibold"}>{name}</Heading>
          <Text color="#ff5841" fontSize="md" >
            {price}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
