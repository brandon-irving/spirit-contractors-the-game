import React from "react";
import Card from "../../core/components/Card";
import { defaultStats } from "../../core/gameData/characterData";
import ChooseASpirit from "./ChooseASpirit";
import ChooseStats from "./ChooseStats";
import { Input } from "@chakra-ui/react";
import CharacterSummary from "./CharacterSummary";
import SelectAWeapon from "./SelectAWeapon";
import TwinButtons from "../../core/components/TwinButtons";
import StepList from "../../core/components/StepList";
import { updateUserDocument } from "../../core/firebaseConfig";
import { useGlobalContext } from "../../context/globalContext";
import { useHistory } from 'react-router-dom'
import { statBoostGenerator } from "../../helpers/statBoostGenerator";
const defaultCharacter = {
  name: "",
  spirit: "",
  stats: defaultStats,
  weapon: 'Short Sword',
  gil: 10,
};

const CreateACharacter = () => {
  const history = useHistory()
  const { user } = useGlobalContext()
  const [character, setcharacter] = React.useState(defaultCharacter);
  const [step, setstep] = React.useState("Name");

  // vars
  const stepList = ["Name", "Spirit", "Stats", "Equip", "Done"];
  const isAtTheStart = step === "Name";
  const isAtTheEnd = step === "Done";

  // funcs
  function updateCharacter(updates = {}) {
    setcharacter({ ...character, ...updates });
  }

  async function handleComplete() {
    console.log('log: handleComplete', {user, character})
    await updateUserDocument(user, {
      ...character,
      gil: 10,
      hp:
        character.stats.Constitution +
        10 +
        statBoostGenerator(character.stats.Constitution),
      mp:
        character.stats.Wisdom +
        10 +
        statBoostGenerator(character.stats.Wisdom),
      displayName: character.name,
    });
    history.push('/')
  }

  function handleNext() {
    const index = stepList.indexOf(step);
    !isAtTheEnd && setstep(stepList[index + 1]);
  }

  function handleBack() {
    const index = stepList.indexOf(step);
    !isAtTheStart && setstep(stepList[index - 1]);
  }

  // ui
  const ComponentList = {
    Name: (
      <Input
        mt={3}
        value={character.name}
        onChange={(e) => updateCharacter({ name: e.target.value })}
        placeholder="Name"
        size="lg"
      />
    ),
    Spirit: <ChooseASpirit spirit={character.spirit} updateCharacter={updateCharacter} />,
    Stats: <ChooseStats stats={character.stats} updateCharacter={updateCharacter}/>,
    Equip: <SelectAWeapon weapon={character.weapon} updateCharacter={updateCharacter}/>,
    Done: <CharacterSummary character={character}/>,
  };
  const acceptButton = isAtTheEnd
    ? {
        props: {
          color: "white",
          colorScheme: "green",
          onClick: handleComplete,
        },
        label: "Create Character",
      }
    : { props: { onClick: handleNext, disabled: isAtTheEnd }, label: "Next" };
  const declineButton = {
    props: { onClick: handleBack, disabled: isAtTheStart },
    label: "Back",
  };
  return (
    <Card container={step === "Spirit"} m={0}>
      <StepList current={step} steps={stepList} />
      {ComponentList[step]}
      <TwinButtons acceptButton={acceptButton} declineButton={declineButton} />
    </Card>
  );
};

export default CreateACharacter;
