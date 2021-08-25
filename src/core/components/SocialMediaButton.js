import { FcGoogle } from 'react-icons/fc';
import {  Button, Center, Stack, Text } from '@chakra-ui/react';

export default function SocialMediaButton() {
  return (
    <Center>
      <Stack align={'center'} maxW={'md'} w={'full'}>
        {/* Google */}
        <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
      </Stack>
    </Center>
  );
}