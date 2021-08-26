import {  Button, Stack, VStack } from "@chakra-ui/react"
import { Step, Steps, useSteps } from "chakra-ui-steps"


export const Stepper = ({steps, onStep=()=>null, initialStep=0, onComplete}) => {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep,
  })
  function handleNext(event){
    onStep(activeStep+1)
    nextStep(event)
  }
  function handleBack(event){      
    onStep(activeStep-1)
    prevStep(event)
  }
  return (
    <VStack width="100%">
      <Steps activeStep={activeStep}>
        {steps.map(({ label, content }) => (
          <Step label={label} key={label}>
            {content}
          </Step>
        ))}
      </Steps>
      <Stack w='full' spacing={3} direction='row' justify='flex' justifyContent='flex-end'>
      {!!activeStep && <Button onClick={handleBack}>Prev</Button>}
      <Button onClick={handleNext}>Next</Button>
      </Stack>
    </VStack>
  )
}
