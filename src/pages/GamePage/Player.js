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
import { useGlobalContext } from "../../context/globalContext";
import ActionsModal from "../../core/components/ActionsModal";
import Card from "../../core/components/Card";
import Gauge from "../../core/components/Gauge";
import SpiritModal from "../../core/components/SpiritModal";
import { stats } from "../../core/gameData/characterData";
import { weapons } from "../../core/gameData/weapons";
import { statBoostGenerator } from "../../helpers/statBoostGenerator";

import "./Player.css";

const PlayerSection = (props) => (
  <Box p={2} m={0} w="100vw" color="black" {...props} />
);
const CharacterAlias = ({ name = "Your Name", gil = 0, level = "1" }) => (
  <Stack fontSize="10pt" direction="column">
    <Text style={{ margin: 0 }}>{name}</Text>
    <Text style={{ margin: 0 }}>{gil} gil</Text>
    <Text style={{ margin: 0 }}>Level {level}</Text>
  </Stack>
);
const Points = ({ title='', amount, maxAmount }) => (
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
      {title}
    </Text>
    <Text>
      {amount}/{maxAmount}
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
  const { user, setuser, setisLoggedIn } = useGlobalContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isActionModalOpen, setisActionModalOpen] = React.useState(false);

  function handleSpiritClick() {
    setIsOpen(true);
  }

  function handleSignOut() {
    setuser(null)
    setisLoggedIn(false)
  }
  const weapon = weapons[user.weapon];
  const maxHp =  user.stats.Constitution +
  10 +
  statBoostGenerator(user.stats.Constitution)
  const maxMp =  user.stats.Wisdom +
  10 +
  statBoostGenerator(user.stats.Wisdom)
  console.log('log: user.spirit', user.spirit)
  
  return (
    <div>
      <PlayerSection bg="black">
        <Stack textAlign="right">
          <Text onClick={handleSignOut} color="white">
            Sign Out
          </Text>
        </Stack>
      </PlayerSection>

      {/* Row 1 */}
      <PlayerSection bg="#333" borderBottom="1px solid" color="white">
        <Stack direction="row" align="center" justify="space-between">
          <Stack direction="row">
            <Avatar src="" />
            <CharacterAlias gil={user.gil} name={user.name} />
          </Stack>
          <Stack direction='row'>
          <Points
          title='Hp Points'
              amount={user.hp}
              maxAmount={maxHp}
            />
            <Points
            title='Mp Points'
            amount={user.mp}
            maxAmount={maxMp}
          />
          </Stack>
        </Stack>
      </PlayerSection>

      {/* Row 2 */}
      <PlayerSection bg="#333" color="white">
        <Stack direction="row" align="center" justify="space-between">
          <InfoStat
            label="Weapon"
            value={<Avatar size="sm" src={weapon.img} />}
            text={weapon.roll}
          />
          <InfoStat label="Walking" value="30ft" text="Speed" />
          <Avatar
            size="lg"
            onClick={handleSpiritClick}
            className="pulse"
            src={user.spirit.img}
          />
          <InfoStat
            label="Current"
            value={
              <Avatar
                size="sm"
                src="https://i.fbcd.co/products/resized/resized-1500-1000/4cb3dfa788bdb2c97db08616a58304e4b6dd72d374e551cc419a77c4af6ec16e.jpg"
              />
            }
            text="Status"
          />
          <Button onClick={() => setisActionModalOpen(true)} colorScheme="blue">
            Actions
          </Button>
        </Stack>
      </PlayerSection>

      {/* Row 3 */}
      <PlayerSection borderBottom="1px solid white">
        <Wrap justify="center">
          {stats.map((stat, i) => {
            const value = user.stats[stat.name];
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
                      +{statBoostGenerator(value)}
                    </Text>
                  </Box>
                  <Box border="1px solid white" borderRadius={100}>
                    <Text fontSize="10pt">{value}</Text>
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
          <Gauge value={user.hp} maxValue={maxHp} convert />
        </Box>
        <Box>
          <Text>Mp</Text>
          <Gauge value={user.mp} maxValue={maxMp} convert color="blue" />
        </Box>
      </Stack>
      <Stack align='center' m={10} mt={6}>
        <Text>Abilities</Text>
       <ul>
         {user.spirit.abilities.map((ability, i)=>{
           return <li key={i}>{ability.name}</li>
         })}
       </ul>
      </Stack>
      <SpiritModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        spirit={user.spirit}
      />
      <ActionsModal
        isOpen={isActionModalOpen}
        onClose={() => setisActionModalOpen(false)}
      />
    </div>
  );
};

export default Player;
