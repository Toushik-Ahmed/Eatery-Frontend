"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/apiservice";
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

  const router = useRouter();

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

  return (
    <Box bg="gray.200" width="100vw" height="100vh">
      <Center>
        <Box mt="8">
          <Box mb="8" textAlign="center">
            <Heading
              as="h1"
              fontWeight="300"
              fontSize="24px"
              letterSpacing="-0.5px"
            >
              Sign up for Eatery
            </Heading>
          </Box>

          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" w="30vw">
            <CardBody>
              <form onSubmit={handleSubmit}>
                {/* First Name and Last Name */}
                <HStack mb="4" spacing="4">
                  <FormControl isRequired>
                    <FormLabel size="sm">First Name:</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel size="sm">Last Name:</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                </HStack>

                {/* Organization Name and User Type */}
                <HStack mb="4" spacing="4">
                  <FormControl isRequired>
                    <FormLabel size="sm">Organization Name:</FormLabel>
                    <Input
                      type="text"
                      value={organizationName}
                      onChange={(e) => setOrganization(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel size="sm">Category</FormLabel>
                    <Select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      placeholder="Select category"
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
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
                </HStack>

                {/* Email and Phone Number */}
                <HStack mb="4" spacing="4">
                  <FormControl isRequired>
                    <FormLabel size="sm">Email address:</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel size="sm">Phone no:</FormLabel>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      bg="white"
                      borderColor="#d8dee4"
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                </HStack>

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
                      size="sm"
                      borderRadius="6px"
                    />
                  </FormControl>
                </Box>

                <Button
                  type="submit"
                  bg="#2da44e"
                  color="white"
                  size="sm"
                  w="full"
                  _hover={{ bg: "#2c974b" }}
                  _active={{ bg: "#298e46" }}
                >
                  Sign up
                </Button>
              </form>
            </CardBody>
          </Card>

          <Box mt="6">
            <Card variant="outline" borderColor="#d0d7de">
              <CardBody>
                <Center>
                  <HStack fontSize="sm" spacing="1">
                    <Text>Already have an account?</Text>
                    <Link isExternal color="#0969da" href="/login">
                      Sign in.
                    </Link>
                  </HStack>
                </Center>
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Center>

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
}

export default SignUpForm;
