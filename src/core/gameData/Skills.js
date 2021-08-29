export const skills = [
    // Sword Skills
    {
      title: "Type: Slicing",
      label: "Wide Slash",
      description: "A powerful slash covering a wide range",
      additionalInfo: "Your normal attack roll can now cover 10ft",
      requirements: [
        { type: "Strength", value: 14 },
        { type: "Weapon", value: "Sword" },
      ],
    },
    {
      title: "Type: Slicing",
      label: "Circle Slash",
      description: "A spinning attack that covers all around you",
      additionalInfo: "Your attack roll covers a 5ft radius",
      requirements: [
        { type: "Strength", value: 14 },
        { type: "Weapon", value: "Sword" },
      ],
    },
    {
      title: "Type: Piercing",
      label: "Sonic Thrust",
      description: "A powerful thrust",
      additionalInfo: "Your attack can pierce through decent armor and thick skin",
      requirements: [
        { type: "Strength", value: 14 },
        { type: "Weapon", value: "Sword" },
      ],
    },
    {
      title: "Type: Piercing",
      label: "Falling Strike",
      description: "An airborn strike where you thrust your blade into the enemy",
      additionalInfo: "You have to be above your enemy and jump down to perform. Your attack roll is doubled",
      requirements: [
        { type: "Strength", value: 14 },
        { type: "Weapon", value: "Sword" },
      ],
    },
    {
      title: "Type: Combo",
      label: "Wild Fury",
      description: "You put your all into a rapid fury of attacks",
      additionalInfo: "Roll a d4 and your weapon die. Multiply the results and thats the amount of damage dealt. You enter a state of fatigue however",
      requirements: [
        { type: "Strength", value: 14 },
        { type: "Weapon", value: "Sword" },
      ],
    },
  // Arrow
  {
      title: "Type: Piercing",
      label: "Long Shot",
      description: "Push your bow to the limit and shoot an arrow from far away",
      additionalInfo: "Your bow range increases by 15ft",
      requirements: [
        { type: "Weapon", value: "Bow" },
      ],
    },
    {
      title: "Type: Combo",
      label: "Triple Shot",
      description: "You shoot three arrows at once",
      additionalInfo: "Multiply your attack roll by 3. This move requires one turn to prep unless level 2",
      requirements: [
        { type: "Dexterity", value: 14 },
        { type: "Weapon", value: "Bow" },
      ],
    },
  ];