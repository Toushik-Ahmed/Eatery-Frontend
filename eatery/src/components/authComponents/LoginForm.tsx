"use client";
import { logIn } from "@/services/apiservice";
import { setToken } from "@/services/tokenServices";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  useToast,
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
  const toast = useToast();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoginSuccess(false);

    if (password.length < 6) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 6 characters long.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await logIn({
        organizationName,
        userType,
        email,
        password,
      });
      setToken(response.token);

      if (userType === "Admin") {
        router.push("/dashboard");
      }
      if (userType === "POSManager") {
        router.push("/tableTry");
      }
      if (userType === "MenuManager") {
        router.push("/menubuilder");
      }
      if (userType === "InventoryManager") {
        router.push("/Inventory");
      }
      setLoginSuccess(true);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to log in. Please try again.");

      toast({
        title: "Login Failed",
        description: "Incorrect password or login details.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const cardWidth = useBreakpointValue({
    base: "80vw",
    md: "40vw",
    lg: "28vw",
  });

  if (!isHydrated) {
    return null;
  }

  return (
    <Box
      bg="#f4f4f6"
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Center>
        <Card
          bg="white"
          variant="outline"
          borderColor="#d8dee4"
          w={cardWidth}
          p={{ base: 4, md: 6 }}
          borderRadius="xl"
        >
          <CardBody>
            {/* Header Section */}
            <Box mb={{ base: 6, md: 8 }} textAlign="center">
              {/* Logo */}
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={50}
                height={50}
                style={{ margin: "0 auto" }}
              />
              <Heading
                as="h1"
                fontWeight="500"
                fontSize={{ base: "15px", md: "12px", lg: "18px" }}
                letterSpacing="-0.5px"
                mt={4}
              >
                Welcome to Eatery
              </Heading>
            </Box>

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
                    <option value="InventoryManager">Inventory Manager</option>
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
                bg="#547494"
                color="black"
                size="md"
                w="full"
                _hover={{ bg: "#547494", color: "white" }}
                _active={{ bg: "#547494" }}
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
                  <Link color="#0969da" href="/signup">
                    Create an account.
                  </Link>
                </HStack>
              </Center>
            </form>
          </CardBody>
        </Card>
      </Center>
    </Box>
  );
};

export default LoginForm;
