import { Button, Stack } from '@chakra-ui/react'
import React from 'react'

const TwinButtons = ({acceptButton={props: {}, label: ''}, declineButton={props: {}, label: ''}}) => {
    return (
        <Stack my={3} w='full' spacing={3} direction='row' justify='flex' justifyContent='flex-end'>
        <Button {...declineButton.props}>{declineButton.label}</Button>
        <Button {...acceptButton.props}>{acceptButton.label}</Button>
        </Stack>
    )
}

export default TwinButtons
