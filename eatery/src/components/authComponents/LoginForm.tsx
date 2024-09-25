"use client";
import { logIn } from "@/services/apiservice";
import { setToken } from "@/services/tokenServices";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  Select,
  Text,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {};

const LoginForm = ({}: Props) => {
  const [organizationName, setOrganization] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // This ensures that the component is fully hydrated before rendering
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoginSuccess(false);

    try {
      const response = await logIn({
        organizationName,
        userType,
        email,
        password,
      });
      setToken(response.token);
      
      setLoginSuccess(true);
      setTimeout(() => {
        router.push("/Inventory");
      }, 2000);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please try again.");
    }
  };

  // Adjust card width based on screen size
  const cardWidth = useBreakpointValue({
    base: "90vw",
    md: "50vw",
    lg: "30vw",
  });

  if (!isHydrated) {
    return null; // Prevent rendering until the component is hydrated
  }

  return (
    <Box
      bg="gray.200"
      width="100vw"
      height="100vh"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 8 }}
    >
      <Center>
      <Box mt={{ base: 8, md: 10 }} mb={{ base: 8, md: 10 }}>
          {/* Header Section */}
          <Box mb={{ base: 6, md: 8 }} textAlign="center">
            <Heading
              as="h1"
              fontWeight="500"
              fontSize={{ base: "24px", md: "28px", lg: "32px" }}
              letterSpacing="-0.5px"
            >
              Login to Eatery
            </Heading>
          </Box>

          {/* Login Form Section */}
          <Card
            bg="#f6f8fa"
            variant="outline"
            borderColor="#d8dee4"
            w={cardWidth}
            p={{ base: 4, md: 6 }}
            borderRadius="xl"
          >
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing={{ base: 4, md: 6 }} mb="4">
                  {/* Organization Name */}
                  <FormControl isRequired>
                    <FormLabel size="sm">Organization Name:</FormLabel>
                    <Input
                      type="text"
                      value={organizationName}
                      onChange={(e) => setOrganization(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="md"
                      borderRadius="6px"
                    />
                  </FormControl>

                  {/* User Type */}
                  <FormControl isRequired>
                    <FormLabel size="sm">Category</FormLabel>
                    <Select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      placeholder="Select category"
                      bg="white"
                      borderColor="#d8dee4"
                      size="md"
                      borderRadius="6px"
                    >
                      <option value="Admin">Admin</option>
                      <option value="POSManager">POS Manager</option>
                      <option value="MenuManager">Menu Manager</option>
                      <option value="InventoryManager">
                        Inventory Manager
                      </option>
                    </Select>
                  </FormControl>

                  {/* Email Address */}
                  <FormControl isRequired>
                    <FormLabel size="sm">Email address:</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="md"
                      borderRadius="6px"
                    />
                  </FormControl>

                  {/* Password */}
                  <FormControl isRequired>
                    <HStack justify="space-between">
                      <FormLabel size="sm">Password</FormLabel>
                      {/* Uncomment if you want to enable forgot password link */}
                      {/* <Button
                        as="a"
                        href="#"
                        variant="link"
                        size="xs"
                        color="#0969da"
                        fontWeight="500"
                      >
                        Forgot password?
                      </Button> */}
                    </HStack>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="md"
                      borderRadius="6px"
                    />
                  </FormControl>
                </Stack>

                {/* Submit Button */}
                <Button
                  type="submit"
                  bg="#2da44e"
                  color="white"
                  size="md"
                  w="full"
                  _hover={{ bg: "#2c974b" }}
                  _active={{ bg: "#298e46" }}
                >
                  Login
                </Button>

                {error && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    {error}
                  </Text>
                )}

                {/* Create Account Section */}
                <Center mt="4">
                  <HStack fontSize="sm" spacing="1">
                    <Text>New to Eatery?</Text>
                    <Link isExternal color="#0969da" href="/signup">
                      Create an account.
                    </Link>
                  </HStack>
                </Center>
              </form>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </Box>
  );
};

export default LoginForm;
