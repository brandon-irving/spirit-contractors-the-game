import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useIsScrolling } from "react-use-is-scrolling";
import Card from "../../../core/components/Card";
import NumberInput from "../../../core/components/NumberInput";
import { statBoostGenerator } from "../../../helpers/statBoostGenerator";
const stats = [
  {
    name: "Strength",
    desc: "This determines your point boost on attack rolls. It also increases your chances on successful strength rolls (such as lifting something, wrestling someone etc)",
    value: 10,
  },
  {
    name: "Defense",
    desc: "This determines how well you handle enemy attacks. It also increases your chances on successful defense rolls (such as performing a dangerous feat and receiving little to no damage)",
    value: 10,
  },
  {
    name: "Speed",
    desc: "This determines how far you move It also increases your chances on successful speed rolls (such as outrunning someone or something)",
    value: 10,
  },
  {
    name: "Intelligence",
    desc: "This determines your spell point boost. It also increases your chances on successful intellect rolls (such as figuring out a puzzle or deducing an issue)",
    value: 10,
  },
  {
    name: "Wisdom",
    desc: "This determines your Mp. It also increases your chances on successful wisdom rolls (such as telling if someone is lying)",
    value: 10,
  },
  {
    name: "Persuasion",
    desc: "This determines how likely you are to have someone believe your words. It also increases your chances on successful persuasion rolls (such as lying or convincing people)",
    value: 10,
  },
];
const ChooseStats = () => {
  const defaultStats = stats.reduce((acc, stat) => {
    return { ...acc, [stat.name]: stat.value };
  }, {});
  const [statSheet, setstatSheet] = useState(defaultStats);
  const { isScrolling } = useIsScrolling();
  const availablePoints = availablePointGenerator()
  function availablePointGenerator() {
    let currentPoints = 0;
    stats.forEach((stat) => {
      currentPoints += statSheet[stat.name];
    });
    return 72 - currentPoints;
  };
  function updateStatSheet(updates = {}) {
    setstatSheet({ ...statSheet, ...updates });
  }

  const max = (value) => availablePoints <= 0 ? value : 15
  return (
    <>
      <Text pt={2} fontSize="20pt" align="center">
        Select your stats
      </Text>
      <Box
        rounded="md"
        top="28px"
        right="10px"
        position="fixed"
        w="90px"
        height="90px"
        bg="#383838"
        opacity={isScrolling ? 0.4 : 1}
      >
        <Text pt={2} fontSize="12pt" align="center">
          Available
        </Text>
        <Text fontSize="28pt" align="center">
          {availablePoints}
        </Text>
      </Box>
      {Object.keys(statSheet).map((statName, i) => {
        const fullStat = stats.find((s) => s.name === statName);
        const value = statSheet[statName];
        function setvalue (value) {
          updateStatSheet({ [statName]: value });
        };
        const statBoost = statBoostGenerator(value)

        return (
          <Card color="black" key={i} m={0} my={7} bg="white">
            <Text fontWeight="bold" fontSize="15pt" mb={3}>
              {fullStat.name} <span style={{marginLeft: '5px', color: statBoost ? 'green' : 'black'}}>+{statBoost}</span>
            </Text>
            <Text fontSize="12pt" mb={3}>
              {fullStat.desc}
            </Text>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <NumberInput min={10} max={max(value)} setvalue={setvalue} value={value} />
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ChooseStats;
