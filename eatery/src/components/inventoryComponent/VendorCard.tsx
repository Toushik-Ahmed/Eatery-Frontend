import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

type Props = {
  src: string;
  alt: string;
  Phone: string;
  Email: string;
  heading: string;
  handleClick:Function
};

const VendorCard = ({ src, alt, Phone, Email, heading,handleClick }: Props) => {
  return (
    <Card
      w={'fit-content'}
      bg="#fffafa"
      borderRadius="lg"
      boxShadow="2xl"
      // textAlign={'center'}
      display="flex"
      flexDirection="column"
      // alignItems="center"
    >
      <CardBody
        p="15px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Image
          src={src}
          alt={alt}
          boxSize="200px"
          borderRadius="lg"
          objectFit="cover"
        />
        <Stack mt="2" spacing="2">
          <Heading size="md"></Heading>
          <Text color="#ff5841" fontSize="1rem" textAlign="center">
            {heading}
          </Text>
          <Text color="black" fontSize="1rem">
            Phone: {Phone}
          </Text>
          <Text color="black" fontSize="1rem">
            Email: {Email}
          </Text>
          <Button _hover={{ color: "black" }} bg="#d91a40" color="white" onClick={()=>handleClick()}>
            GO
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default VendorCard;
