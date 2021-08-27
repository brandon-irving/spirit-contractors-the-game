import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

const LoadingScreen = () => {
    return (
        <Center style={{height: '100vh'}}>
        <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      </Center>
    )
}

export default LoadingScreen
