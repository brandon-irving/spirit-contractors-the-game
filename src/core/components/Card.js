import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Card = ({children, whiteSpace= '', spacing='4', color='inherit', container, bg, p=6, m=5, my, w, h}) => {
    const defaultBgColor = useColorModeValue('white', 'gray.700')
    const bgColorMap = {
        'white': useColorModeValue('white', 'white.000'),
    }
const coreProps = {
    spacing,
    w: w || 'full',
    h: h || '',
    margin: m,
    maxW: 'md',
    rounded: 'xl',
    boxShadow: 'lg',
    p: p,
    my: my === undefined && m === undefined ? 12 : my || m,
    bg: bgColorMap[bg] || defaultBgColor,
    color,
    whiteSpace,
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
