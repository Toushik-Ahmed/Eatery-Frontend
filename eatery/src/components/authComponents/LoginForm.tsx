'use client';
import { logIn } from '@/services/apiservice';
import { setToken } from '@/services/tokenServices';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {};

const LoginForm = ({}: Props) => {
  const [organizationName, setOrganization] = useState('');
  const [userType, setUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
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
        router.push('/Inventory');
      }, 2000);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <Box bg="gray.200" width="100vw">
      <Center>
        <Box mt="50">
          {/* Header Section */}
          <Box mb="50" textAlign="center">
            <Heading
              as="h1"
              fontWeight="300"
              fontSize="30px"
              letterSpacing="-0.5px"
            >
              Sign in to Eatery
            </Heading>
          </Box>

          {/* Login Form Section */}
          <Card bg="#f6f8fa" variant="outline" borderColor="#d8dee4" w="308px">
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Box mb="4">
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
                </Box>

                {/* Category Dropdown Field */}
                <Box mb="4">
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
                </Box>

                <Box mb="4">
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
                </Box>

                <Box mb="4">
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
                  _hover={{ bg: '#2c974b' }}
                  _active={{ bg: '#298e46' }}
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
