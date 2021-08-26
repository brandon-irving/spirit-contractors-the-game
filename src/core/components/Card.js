import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Card = ({children, color='inherit', container, bg, p=6, m=5, my}) => {
    const defaultBgColor = useColorModeValue('white', 'gray.700')
    const bgColorMap = {
        'white': useColorModeValue('white', 'white.000'),
    }
const coreProps = {
    spacing: 4,
    w: 'full',
    margin: m,
    maxW: 'md',
    rounded: 'xl',
    boxShadow: 'lg',
    p: p,
    my: my === undefined ? 12 : my,
    bg: bgColorMap[bg] || defaultBgColor,
    color,
}
    return container ? 
    <Stack {...coreProps}>
            {children}
        </Stack> :
        <Box {...coreProps}>
            {children}
        </Box>
    
}

export default Card
