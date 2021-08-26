import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

export default function InfoCard({
  bg,
  img='',
  name = "",
  primaryInfo = "",
  badgeData,
  actionRow,
  badgeTitle,
  maxW='320',
  width
}) {
    const bgColor = useColorModeValue("white", "white.400")
  const infoColor = useColorModeValue("gray.700", "gray.400");
  const badgeColor = useColorModeValue("gray.50", "gray.800");
  const bgColorTheme = {
      default: {},
      white: {
        textColor: 'black'
      }
  }
  return (
    <Center py={6}>
      <Box
        maxW={width || maxW}
        w={width || 'full'}
        bg={bg || bgColor}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={img}
          alt={name}
          mb={4}
          pos={"relative"}
        />
        <Heading color={bgColorTheme[bg || 'default'].textColor} fontSize={"2xl"} fontFamily={"body"}>
          {name}
        </Heading>
        <div style={{color: bgColorTheme[bg || 'default'].textColor || infoColor}}>
        {typeof primaryInfo === "string" ? (
          <Text textAlign={"center"} px={3}>
            {primaryInfo}
          </Text>
        ) : (
          primaryInfo
        )}
        </div>
    <Text color={bgColorTheme[bg || 'default'].textColor} mt={3} mb={-7}>{!!badgeTitle && badgeTitle}</Text>
        {!!badgeData && (
          <Stack align={"center"} justify={"center"} direction={"row"} mt={8}>
            {badgeData.map((d) => {
                const { label, bg, fontSize='10pt', fontWeight='400', colorScheme='', px=2, py=1} = d
                return(
                    <Badge key={label} colorScheme={colorScheme} px={px} py={py} bg={bg || badgeColor} fontSize={fontSize} fontWeight={fontWeight} >
                      {label}
                    </Badge>
                  )
            })}
          </Stack>
        )}

        {!!actionRow && (
          <Stack mt={8} direction={"row"} spacing={4}>
            {actionRow.map((button, i) => {
                const { fontSize='sm', label='', color='white', bg='gray', onClick=()=>null, } = button
              return (
                <Button
                key={i}
                onClick={onClick}
                  flex={1}
                  fontSize={fontSize}
                  rounded={"full"}
                  bg={`${bg}.400`}
                  color={color}
                // TODO: look into makingm dynamic
                //   boxShadow={
                //     "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                //   }
                  _hover={{
                    bg: `${bg}.500`,
                  }}
                  _focus={{
                    bg: `${bg}.500`,
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Stack>
        )}
      </Box>
    </Center>
  );
}
