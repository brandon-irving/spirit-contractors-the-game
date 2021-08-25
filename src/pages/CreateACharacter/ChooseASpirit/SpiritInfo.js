import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SpiritInfo({ selectedSpirit, setselectedSpirit, spirit, closeModal }) {
  const { name, desc, element, abilities, strategy, img } = spirit;
  const isSelected = selectedSpirit === spirit
  function handleFormContract() {
    const newSpirit = selectedSpirit === spirit ? "" : spirit;
    setselectedSpirit(newSpirit);
    closeModal();
  }
  function handleClose(){
    closeModal()
  }
  return (
    <Center py={6}>
      <Box>
        <Avatar
          size={"xl"}
          src={img}
          alt={spirit}
          mb={4}
          pos={"relative"}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          Element: {element}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {desc}
        </Text>
        <Stack  mt={4} mb={4} align='flex-start'>
            {
                abilities.map((a, i)=><Text key={i}><span style={{fontWeight: 'bold'}}>{a.name}:</span> {a.desc}</Text>)
            }
        </Stack>
        <Text align='center' fontWeight='bold'>Strategy</Text>
          <Text>{strategy}</Text>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
          onClick={handleFormContract}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            {isSelected ? 'Void Contract' : 'Form Contract'}
          </Button>
          <Button
          onClick={handleClose}
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Return to list
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
