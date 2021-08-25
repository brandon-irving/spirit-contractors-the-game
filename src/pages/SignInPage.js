import React, { useEffect } from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Center
  } from '@chakra-ui/react';
  import Card from '../core/components/Card'
import SocialMediaButton from '../core/components/SocialMediaButton';
  
  export default function SignInPage() {
    useEffect(() => {
        delete localStorage['chakra-ui-color-mode']
    }, [])
    return (
      <Flex
        minH={'70vh'}
        align={'center'}
        justify={'center'}
        overflow='scroll'
        >
          <Card>    
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Sign in to you account
          </Heading>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Submit
            </Button>
            <Center>
            <Text fontSize="25px">or</Text>
            </Center>
            <SocialMediaButton />
          </Stack>
        </Card>
      </Flex>
    );
  }