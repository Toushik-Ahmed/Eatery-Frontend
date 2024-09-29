"use client";
import React, { useState, useEffect } from "react";
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
  Stack,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { setToken } from "@/services/tokenServices";
import Image from "next/image";

type Props = {};

function SignUpForm({}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationName, setOrganization] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSignupSuccess(false);

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both password fields are identical.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

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

  const cardWidth = useBreakpointValue({
    base: "100%",
    md: "50vw",
    lg: "30vw",
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
      alignItems="center"
      justifyContent="center"
      px={{ base: 4, md: 8 }}
    >
      <Card
        bg="white"
        variant="outline"
        borderColor="#d8dee4"
        w={cardWidth}
        p={{ base: 4, md: 6 }}
        borderRadius="xl"
      >
        <CardBody>
          <Box mb={{ base: 6, md: 8 }} textAlign="center">
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
              Sign up for Eatery
            </Heading>
          </Box>

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
                  <option value="InventoryManager">Inventory Manager</option>
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

            <Stack
              spacing={{ base: 4, md: 6 }}
              direction={{ base: "column", md: "row" }}
              mb="4"
            >
              {/* Password */}
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

              {/* Confirm Password */}
              <FormControl isRequired>
                <FormLabel size="sm">Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              _hover={{ bg: "#547494" , color: "white"}}
              _active={{ bg: "#547494" }}
              mt="4"
            >
              Sign up
            </Button>

            <Center mt="2">
              <HStack fontSize="sm" spacing="1">
                <Text>Already have an account?</Text>
                <Link color="#0969da" href="/login">
                  Login.
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
  );
}

export default SignUpForm;
