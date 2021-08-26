import React, {useState, useEffect} from "react";
import InfoCard from "../../core/components/InfoCard";
import { weapons } from "../../core/gameData/weapons";
import { Stack, Text } from "@chakra-ui/react";
const SelectAWeapon = ({weapon, updateCharacter}) => {
  const [selectedWeapon, setselectedWeapon] = useState(weapon);

  useEffect(() => {
    updateCharacter({weapon: selectedWeapon})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWeapon])
  return (
    <>
      <Stack>
        {Object.keys(weapons).map((weaponName, i) => {
          const { name, roll, range, desc, requirements, img } =
            weapons[weaponName];
          const isSelected = weaponName === selectedWeapon;
          function handleSelect() {
            setselectedWeapon(weaponName);
          }
          const actionRow = [
            {
              label: isSelected ? "Selected" : "Select Weapon",
              color: "white",
              bg: isSelected ? "green" : "blue",
              onClick: handleSelect,
            },
          ];
          const badgeData = [roll, range].map((label) => ({
            label,
            bg: "grey",
          }));

          return (
            <InfoCard
              key={i}
              bg="white"
              name={name}
              img={img}
              badgeTitle="Action Data"
              badgeData={badgeData}
              actionRow={actionRow}
              primaryInfo={
                <>
                  {desc}
                  <Text textAlign={"center"} fontSize="md" fontWeight="bold">
                    Requirements
                  </Text>
                  <Stack direction="row">
                    {Object.keys(requirements).map((rName, i) => {
                      return (
                        <li key={i}>
                          {rName}: {requirements[rName]}
                        </li>
                      );
                    })}
                  </Stack>
                </>
              }
            />
          );
        })}
      </Stack>
    </>
  );
};

export default SelectAWeapon;
