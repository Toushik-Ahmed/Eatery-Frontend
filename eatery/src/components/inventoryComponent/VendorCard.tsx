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
};

const VendorCard = ({ src, alt, Phone, Email, heading }: Props) => {
  return (
    <Card
      w={'fit-content'}
      bg="#fffafa"
      borderRadius="lg"
      boxShadow="2xl"
      textAlign={'center'}
      display="flex"
      flexDirection="column"
      alignItems="center"
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
          boxSize="132px"
          borderRadius="lg"
          objectFit="cover"
        />
        <Stack mt="2" spacing="1">
          <Heading size="md"></Heading>
          <Text color="#ff5841" fontSize="1rem">
            {heading}
          </Text>
          <Text color="black" fontSize="1rem">
            Phone: {Phone}
          </Text>
          <Text color="black" fontSize="1rem">
            Email: {Email}
          </Text>
          <Button bg="#ff5841" color="white">
            Go
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default VendorCard;
