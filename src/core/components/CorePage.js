import { Flex } from '@chakra-ui/react'
import React from 'react'

const CorePage = ({children}) => {
    return (
        <Flex
        minH={'10vh'}
        align={'center'}
        justify={'center'}
        overflow='scroll'
        >
            {children}
        </Flex>
    )
}

export default CorePage
