import React from "react";
import Card from "../../core/components/Card";
// import ChooseASpirit from './ChooseASpirit'
import ChooseStats from "./ChooseStats";

const CreateACharacter = () => {
  return (
    <Card>
      <ChooseStats />
    </Card>
    // <Card container>
    //     <ChooseASpirit />
    // </Card>
  );
};

export default CreateACharacter;
