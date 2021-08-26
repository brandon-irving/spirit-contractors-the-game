import { Box, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useIsScrolling } from "react-use-is-scrolling";
import Card from "../../../core/components/Card";
import NumberInput from "../../../core/components/NumberInput";
import { statBoostGenerator } from "../../../helpers/statBoostGenerator";
import { stats } from '../../../core/gameData/characterData'
 
const ChooseStats = ({stats: defaultStats, updateCharacter}) => {
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
  useEffect(() => {
    updateCharacter({stats: statSheet})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statSheet])
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
