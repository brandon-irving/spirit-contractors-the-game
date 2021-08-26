import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react'
import React from 'react'

const NumberInput = ({min=0, max=10, value=0, setvalue=()=>null}) => {
    const {
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
      } = useNumberInput({
        step: 1,
        value,
        min,
        max,
        precision: 0,
      })
      const inc = getIncrementButtonProps()
      const dec = getDecrementButtonProps()
      const input = getInputProps({ isReadOnly: true  })
      function handleIncChange(e){
        const newVal = value+=1
        setvalue(newVal)
      }

      function handleDecChange(e){
          const newVal = value-=1
        setvalue(newVal)
      }

      return (
        <HStack maxW="150px">
          <Button onClick={handleIncChange} colorScheme="blue" {...inc}>+</Button>
          <Input style={{textAlign: 'center', border: '1px solid'}} {...input}  />
          <Button onClick={handleDecChange} colorScheme="red" {...dec}>-</Button>
        </HStack>
      )
}

export default NumberInput
