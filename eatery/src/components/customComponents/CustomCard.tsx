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

type Props = {};

const CustomCard = (props: Props) => {
  return (
    <Card maxW="sm" h="22vh" w="15vw" bg="#F2F0EA" borderRadius="lg" boxShadow='2xl'>
      <CardBody p="15px">
        <Image
          src="https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg"
          alt="Beef Cheese Burger"
          borderRadius="lg"
          h="120px"
          w="250px"
        />
        <Stack mt="2" spacing="1">
          <Heading size="md">Beef Cheese Burger</Heading>
          <Text color="orange.600" fontSize="1rem" >
            $10
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CustomCard;
