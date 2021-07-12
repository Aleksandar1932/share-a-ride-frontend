import React, { useState } from "react";
import {
  Spacer,
  Flex,
  SimpleGrid,
  Box,
  FormControl,
  FormLabel,
  Input,
  Center,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { Header, Main, Cards, Footer } from "@components";
import { Router } from "next/dist/client/router";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const performLogin = async (username, password) => {
    let BACKEND_URL = process.env.BACKEND_URL;
    const response = await fetch(BACKEND_URL + "/login", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ username: username, password: password }), // body data type must match "Content-Type" header
    });
    let token = await response.json();
    localStorage.setItem("Authorization", token);
    if (token) {
      router.push("/home");
    }
  };
  return (
    <SimpleGrid columns={2} spacing={0}>
      <Box bg="blue" height="100vh"></Box>

      <Center>
        <Box bg="" height="100vh">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <FormHelperText>We'll never share your username.</FormHelperText>
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <FormHelperText>We'll never share your password.</FormHelperText>
          </FormControl>

          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => {
              performLogin(username, password);
            }}
          >
            Login
          </Button>
        </Box>
      </Center>
    </SimpleGrid>
  );
};

export default Login;
