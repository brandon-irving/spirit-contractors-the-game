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
import { auth, createUser, firestore } from "../core/firebaseConfig";
import { useGlobalContext } from "../context/globalContext";
import { useHistory } from "react-router-dom";

export default function SignInPage() {
  const {  user, setuser, loading, isLoggedIn, setisLoggedIn, successToaster, errorToaster } = useGlobalContext()
  const history = useHistory()
  const [isSignIn, setisSignIn] = useState(true);
  const [signingIn, setsigningIn] = useState(false);
  const [userCredentials, setuserCredentials] = useState({email: '', password: ''})
  
  function updateCredentials(updates={}){
    setuserCredentials({...userCredentials, ...updates})
  }

  async function handleSubmit() {
    let location = '/'
    let signinState = true
    setsigningIn(true)
    try {
      if (isSignIn){
        const {user: coreUser = {email: ''}} = await auth.signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
        const userRef = firestore.doc(`users/${coreUser.email}`);
        const user = await userRef.get() || {};
        if(user.exists) setuser(user.data())  
        else {
         setuser({uid: coreUser.uid, email: coreUser.email, displayName: coreUser.displayName})
          location = '/create'
        }
      }
      else {
       const {user: { displayName, email, uid }} = await createUser(userCredentials.email, userCredentials.password)
       setuser({ displayName, email, uid })
      location='/create'
      }
      successToaster('Signed in successfully')
    } catch (e) {
      signinState = false
      location = '/signin'
      errorToaster(`Signed in failed: ${e}`)
    }  
    setisLoggedIn(signinState)
    setsigningIn(false)
    history.push(location)
  }

  function handleRedirect(){  
    const isSignedIn = user && isLoggedIn 
    if(!isSignedIn) return     
    if(!user.name) history.push('/create')
    else history.push('/')
  }

  useEffect(() => {
    delete localStorage["chakra-ui-color-mode"];
  }, []);

  useEffect(() => {
    handleRedirect()
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
          value={userCredentials.email}
          onChange={(e)=>updateCredentials({email: e.target.value})}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input value={userCredentials.password}  onChange={(e)=>updateCredentials({password: e.target.value})} type="password" />
        </FormControl>
        <Stack spacing={6}>
          <Button
          isLoading={signingIn}
          loadingText='Signing in'
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
