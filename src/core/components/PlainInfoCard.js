import {
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

function Card({ children }) {
  return (
    <Box
    h={405}
    w={405}
    m={3}
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      color='white'
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

export default function PlainInfoCard({ title='Type: Piercing', label='Wide Slash',additionalInfo= "Multiply your attack roll by 3. This move requires one turn to prep unless level 2", description= 'Your normal attack roll can cover 10ft', requirements=[{type: 'Strength', value: 14}, {type: 'Weapon', value: 'Sword'}]  }) {
  return (
    <Card>
    <Box w={350} position="relative">
      <Box py={4} px={12}>
        <HStack justifyContent="center">
          <Text fontSize="3xl" fontWeight="900">
            {label}
          </Text>
        </HStack>
        <Text align='center'>{title}</Text>
      </Box>
      <VStack
      h={300}
      overflow='scroll'
        bg={useColorModeValue('gray.50', 'gray.700')}
        py={4}
        borderBottomRadius={'xl'}
        >
            <Text  fontSize="xl" fontWeight="900">Requirements</Text>
        <List spacing={3} textAlign="start" px={12}>
            {
                requirements.map((r, i)=> <ListItem key={i}>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                    {r.type}: {r.value}
                  </ListItem>)
            }
        </List>
        <VStack fontSize={'13pt'} spacing={3}>
        <Text mt={2}>Description</Text>
        <Text>{description}</Text>
        <Box >
      <Text align='center' m={3}>How to use</Text>
      <Text m={3}>{additionalInfo}</Text>
      </Box>
        </VStack>
      
      </VStack>
    </Box>
  </Card>
  );
}