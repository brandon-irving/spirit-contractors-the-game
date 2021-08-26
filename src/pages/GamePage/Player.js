import {
  Avatar,
  Box,
  Button,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import ActionsModal from "../../core/components/ActionsModal";
import Card from "../../core/components/Card";
import Gauge from "../../core/components/Gauge";
import SpiritModal from "../../core/components/SpiritModal";
import { stats } from "../../core/gameData/characterData";
import "./Player.css";
const spirit = {
    name: "Lucky Bunny",
    desc: "An average sized bunny, that wears a a turtle neck, shades and a gold necklace. He is the chief proprietor of luck and knows it. The only thing this bunny is interested in, is business. So hes always willing to sell you some luck, for the right price.",
    element: "None",
    abilities: [
      {
        name: "Luck Purchase",
        desc: "You can sell hp to increase your roll boost. Every 5hp is +1",
      },
      {
        name: "Gambling Foot",
        desc: "You can bet some of your hp on a second chance to roll",
      },
    ],
    img: "https://image.shutterstock.com/image-illustration/portrait-hare-suit-hand-drawn-260nw-330857777.jpg",
    strategy:
      "Hp is always a currency Lucky accepts, so stay near a healer and have plenty of potions around. If you ever come across something valuable, try haggling. With a silver tongue and some luck, you just might strike a deal with this bunny!",
  }
const PlaceHolder = (props) => (
  <Box m={0} bg="black" w="100vw" p={4} {...props} />
);
const PlayerSection = (props) => (
  <Box p={2} m={0} w="100vw" color="black" {...props} />
);
const CharacterAlias = ({
  name = "Your Name",
  spirit = "Spirit Name",
  level = "1",
}) => (
  <Stack fontSize="10pt" direction="column">
    <Text style={{ margin: 0 }}>{name}</Text>
    <Text style={{ margin: 0 }}>{spirit}</Text>
    <Text style={{ margin: 0 }}>Level {level}</Text>
  </Stack>
);
const HitPoints = ({ hp, maxHp }) => (
  <Box
    fontSize="15pt"
    m={0}
    border="2px solid"
    w="90px"
    h="60px"
    p={4}
    color="white"
  >
    <Text mt={-3} fontSize="8pt">
      Hit Points
    </Text>
    <Text>
      {hp}/{maxHp}
    </Text>
  </Box>
);
const InfoStat = ({ label, value, text }) => (
  <Stat textAlign="center">
    <StatLabel>{label}</StatLabel>
    <StatNumber>{value}</StatNumber>
    <StatLabel>{text}</StatLabel>
  </Stat>
);
const Player = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isActionModalOpen, setisActionModalOpen] = React.useState(false)

    function handleSpiritClick(){
        setIsOpen(true)
    }

    
  return (
    <div>
      <PlaceHolder />
      <PlayerSection bg="#333" borderBottom="1px solid" color="white">
        <Stack direction="row" align="center" justify="space-between">
          <Stack direction="row">
            <Avatar src="" />
            <CharacterAlias />
          </Stack>
          <Stack>
            <HitPoints hp={10} maxHp={10} />
          </Stack>
        </Stack>
      </PlayerSection>
      <PlayerSection bg="#333" color="white">
        <Stack direction="row" align="center" justify="space-between">
          <InfoStat
            label="Weapon"
            value={<Avatar size="sm" src="" />}
            text="1d6"
          />
          <InfoStat label="Walking" value="25ft" text="Speed" />
          <Avatar onClick={handleSpiritClick}  className="pulse" src="" />
          <InfoStat
            label="Current"
            value={<Avatar size="sm" src="" />}
            text="Status"
          />
          <Button onClick={()=>setisActionModalOpen(true)} colorScheme="blue">Actions</Button>
        </Stack>
      </PlayerSection>
      <PlayerSection borderBottom="1px solid white">
        <Wrap justify="center">
          {stats.map((stat, i) => {
            return (
              <WrapItem key={i} align="center">
                <Card
                  whiteSpace="noWrap"
                  color="white"
                  spacing="1"
                  h="100px"
                  m="2"
                  w="100px"
                  key={i}
                >
                  <Text mt={-4} fontSize="10px">
                    {stat.name}
                  </Text>
                  <Box border="1px solid white">
                    <Text my={2} color="green" fontSize="19pt">
                      + 1
                    </Text>
                  </Box>
                  <Box border="1px solid white" borderRadius={100}>
                    <Text fontSize="10pt">{stat.value}</Text>
                  </Box>
                </Card>
              </WrapItem>
            );
          })}
        </Wrap>
      </PlayerSection>
      <Stack m={10} mt={6}>
        <Box>
          <Text>Hp</Text>
          <Gauge />
        </Box>
        <Box>
          <Text>Mp</Text>
          <Gauge color="blue" />
        </Box>
      </Stack>
      <SpiritModal 
      isOpen={isOpen}
      onClose={()=>setIsOpen(false)}
        spirit={spirit}
      />
      <ActionsModal isOpen={isActionModalOpen}
      onClose={()=>setisActionModalOpen(false)} />
    </div>
  );
};

export default Player;