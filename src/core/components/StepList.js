import { Breadcrumb, BreadcrumbItem, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BsFillCaretRightFill } from "react-icons/bs";

const StepList = ({current='', steps=[]}) => {
  const selectedColor = useColorModeValue('green', 'green.600')
    return (
        <Breadcrumb spacing="8px" separator={<BsFillCaretRightFill color="gray.500" />}>
        {steps.map((step, i)=>{
            const isSelected = current === step
            return <BreadcrumbItem key={i}>
                <Text color={isSelected ? selectedColor : 'inherit'}>{step}</Text>
          </BreadcrumbItem>
        })}
       
      </Breadcrumb>
    )
}

export default StepList
