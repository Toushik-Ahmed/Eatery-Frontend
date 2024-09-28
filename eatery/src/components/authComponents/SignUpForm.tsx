"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {  signUp } from "@/services/apiservice";
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
  VStack,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { setToken } from "@/services/tokenServices";

type Props = {};

function SignUpForm({}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationName, setOrganization] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false); // Track hydration status

  const router = useRouter();

  // Ensure component is hydrated
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSignupSuccess(false);

    try {
      const accessTokenResponse = await signUp({
        firstName,
        lastName,
        organizationName,
        userType,
        email,
        phone,
        password,
      });
      setToken(accessTokenResponse.token);
      setSignupSuccess(true);
    
      router.push("/login");
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to sign up. Please try again.");
    }
  };

  // Dynamic card width based on screen size
  const cardWidth = useBreakpointValue({
    base: "90vw",
    md: "50vw",
    lg: "30vw",
  });

  // Prevent rendering until hydration is complete
  if (!isHydrated) {
    return null;
  }

  return (
    <Box
      bg="gray.200"
      width="100vw"
      height="100vh"
      py={{ base: 6, md: 10 }}
      px={{ base: 4, md: 8 }}
    >
      <Center>
        <Box mt={{ base: 6, md: 10 }}>
          <Box mb={{ base: 6, md: 8 }} textAlign="center">
            <Heading
              as="h1"
              fontWeight="500"
              fontSize={{ base: "24px", md: "28px", lg: "32px" }}
              letterSpacing="-0.5px"
            >
              Sign up for Eatery
            </Heading>
          </Box>

          {/* Sign Up Form */}
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
                <Stack
                  spacing={{ base: 4, md: 6 }}
                  direction={{ base: "column", md: "row" }}
                  mb="4"
                >
                  {/* First Name */}
                  <FormControl isRequired>
                    <FormLabel size="sm">First Name:</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="md"
                      borderRadius="6px"
                    />
                  </FormControl>

                  {/* Last Name */}
                  <FormControl isRequired>
                    <FormLabel size="sm">Last Name:</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="md"
                      borderRadius="6px"
                    />
                  </FormControl>
                </Stack>

                <Stack
                  spacing={{ base: 4, md: 6 }}
                  direction={{ base: "column", md: "row" }}
                  mb="4"
                >
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
                </Stack>

                <Stack
                  spacing={{ base: 4, md: 6 }}
                  direction={{ base: "column", md: "row" }}
                  mb="4"
                >
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

                  {/* Phone Number */}
                  <FormControl isRequired>
                    <FormLabel size="sm">Phone no:</FormLabel>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="md"
                      borderRadius="6px"
                    />
                  </FormControl>
                </Stack>

                {/* Password */}
                <Box mb="4">
                  <FormControl isRequired>
                    <FormLabel size="sm">Password</FormLabel>
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
                </Box>

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
                  Sign up
                </Button>
                <Center mt="2">
                  <HStack fontSize="sm" spacing="1">
                    <Text>Already have an account?</Text>
                    <Link isExternal color="#0969da" href="/login">
                      Sign in.
                    </Link>
                  </HStack>
                </Center>
                {error && (
                  <Text color="red.500" fontSize="sm" mt={2}>
                    {error}
                  </Text>
                )}
              </form>
            </CardBody>
          </Card>
        </Box>
      </Center>
    </Box>
  );
}

export default SignUpForm;
