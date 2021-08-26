import { Progress } from '@chakra-ui/react'
import React from 'react'

const Gauge = ({value=100, color='green'}) => {
    return (
        <div>
            <Progress  borderRadius={100} colorScheme={color} height="20px" value={value} />
        </div>
    )
}

export default Gauge
