import { Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Card = ({children, bg, p=6}) => {
    const defaultBgColor = useColorModeValue('white', 'gray.700')
    const bgColorMap = {
        'white': useColorModeValue('white', 'white.000'),
    }

    return (
        <Stack
        spacing={4}
        w={'full'}
        margin={5}
        maxW={'md'}
        rounded={'xl'}
        boxShadow={'lg'}
        p={p}
        my={12}
        bg={bgColorMap[bg] || defaultBgColor}
        >
            {children}
        </Stack>
    )
}

export default Card
