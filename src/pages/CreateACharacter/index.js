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
  spirit: null,
  stats: defaultStats,
  weapon: 'Short Sword',
  gil: 10,
  skills: [],
  spells: [],
};

const CreateACharacter = () => {
  const history = useHistory()
  const { user, setuser, errorToaster } = useGlobalContext()
  const [character, setcharacter] = React.useState(defaultCharacter);
  const [isLoading, setisLoading] = React.useState(false);
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
    setisLoading(true)
    try{
      const characterData = {
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
      }
      await updateUserDocument(user, characterData);
      setuser({...user, ...characterData, displayName: characterData.name})
      history.push('/')  
    }catch(e){
      errorToaster(`Error: ${e}`)
    }
    setisLoading(false)
  }

  function handleNext() {
    const index = stepList.indexOf(step);
    console.log('log: index', {
      index, character
    })
    if(!index && !character.name.length) return errorToaster('Please enter a name', 3000)
    if(index === 1 && !character.spirit) return errorToaster('Please select a spirit', 3000)
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
          isLoading, 
          loadingText: 'Creating character'
        },
        label: "Create Character",
      }
    : { props: { onClick: handleNext, disabled: isAtTheEnd }, label: "Next",  };
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
