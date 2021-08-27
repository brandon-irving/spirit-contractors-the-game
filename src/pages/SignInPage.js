import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import Card from "../core/components/Card";
import SocialMediaButton from "../core/components/SocialMediaButton";
import { auth, generateUserDocument } from "../core/firebaseConfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useGlobalContext } from "../context/globalContext";
import { useHistory } from "react-router-dom";

export default function SignInPage() {
  const { user, loading, setisLoggedIn } = useGlobalContext()
  const history = useHistory()
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const [isSignIn, setisSignIn] = useState(true);
  const [completedSignUp, setcompletedSignUp] = useState(false);

  async function handleSubmit() {
    try {
      if (isSignIn){
        await auth.signInWithEmailAndPassword("test@test.com", "password");
        setisLoggedIn(true)
        history.push('/')
      }
      else {
        await createUserWithEmailAndPassword("test@test.com", "password");
        setisLoggedIn(true)
        setcompletedSignUp(true);
      }

    } catch (e) {
      console.log("log: error message", e.message);
    }
  }

  async function createUserDocument() {
    if (completedSignUp) {
      await generateUserDocument(user);
      console.log("log: after sign up", { user });
      setcompletedSignUp(false);
    }
  }

  function handleRedirect(user={}){
    if(!user.uid) return 
    if(!user.name) history.push('/create')
    else console.log('log: redirect to player page')
  }

  useEffect(() => {
    delete localStorage["chakra-ui-color-mode"];
  }, []);

  useEffect(() => {
    createUserDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedSignUp]);

  useEffect(() => {
    handleRedirect(user)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if(loading) return null
  return (
    <Flex minH={"70vh"} align={"center"} justify={"center"} overflow="scroll">
      <Card container>
        <Heading
          textAlign="center"
          lineHeight={1.1}
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          {isSignIn ? "Sign in" : "Register"}
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={handleSubmit}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
          <Box textAlign="right">
            <Text onClick={() => setisSignIn(!isSignIn)}>
              {isSignIn ? "No account? Sign up" : "Already registered? Sign in"}
            </Text>
          </Box>
          <SocialMediaButton />
        </Stack>
      </Card>
    </Flex>
  );
}
