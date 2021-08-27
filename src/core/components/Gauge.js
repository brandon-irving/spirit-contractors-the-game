import { Progress } from '@chakra-ui/react'
import React from 'react'

const Gauge = ({value=100, maxValue, color='green'}) => {
    const desiredValue = maxValue ? (value / maxValue) * 100 : value
    return (
        <div>
            <Progress  borderRadius={100} colorScheme={color} height="20px" value={desiredValue} />
        </div>
    )
}

export default Gauge
