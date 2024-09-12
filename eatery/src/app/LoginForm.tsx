import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <Box bg="gray.200" width="100vw" height="100vh">
      <Center>
        <Box mt="8">
          {/* Header Section */}
          <Box mb="8" textAlign="center">
            {/* <EateryLogo /> */}
            <Heading
              as="h1"
              fontWeight="300"
              fontSize="24px"
              letterSpacing="-0.5px"
            >
              Sign in to Eatery
            </Heading>
          </Box>

          {/* Login Form Section */}
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" w="308px">
            <CardBody>
              <form>
                <Box mb="4">
                  <FormControl>
                    <FormLabel size="sm">Username or email address</FormLabel>
                    <Input
                      type="text"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                </Box>
                <Box mb="4">
                  <FormControl>
                    <HStack justify="space-between">
                      <FormLabel size="sm">Password</FormLabel>
                      <Button
                        as="a"
                        href="#"
                        variant="link"
                        size="xs"
                        color="#0969da"
                        fontWeight="500"
                      >
                        Forgot password?
                      </Button>
                    </HStack>
                    <Input
                      type="password"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                </Box>
                <Button
                  bg="#2da44e"
                  color="white"
                  size="sm"
                  w="full"
                  _hover={{ bg: "#2c974b" }}
                  _active={{ bg: "#298e46" }}
                >
                  Sign in
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Signup Link Section */}
          <Box mt="6">
            <Card variant="outline" borderColor="#d0d7de">
              <CardBody>
                <Center>
                  <HStack fontSize="sm" spacing="1">
                    <Text>New to Eatery?</Text>
                    <Link isExternal color="#0969da" href="#">
                      Create an account.
                    </Link>
                  </HStack>
                </Center>
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Center>

      {/* Footer Links Section */}
      <Center as="footer" mt="16">
        <HStack spacing="4" pt="2">
          <Link isExternal color="#0969da" href="#" fontSize="xs">
            Terms
          </Link>
          <Link isExternal color="#0969da" href="#" fontSize="xs">
            Privacy
          </Link>
          <Link isExternal color="#0969da" href="#" fontSize="xs">
            Security
          </Link>
          <Link isExternal href="#" fontSize="xs">
            Contact Us
          </Link>
        </HStack>
      </Center>
    </Box>
  );
};

export default LoginForm;
