export const stats = [
    {
      name: "Strength",
      desc: "This determines your point boost on attack rolls. It also increases your chances on successful strength rolls (such as lifting something, wrestling someone etc)",
      value: 10,
    },
    {
      name: "Constitution",
      desc: "This determines your health (HP). It also gives you boosts on all health rolls (such as whether or not you catch an illness) ",
      value: 10,
    },
    {
      name: "Dexterity",
      desc: "This determines how good you are with your hands. Certain weapons and tasks require a high enough dexterity (such as archery and weilding a bow)",
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

  export const defaultStats = stats.reduce((acc, stat) => {
    return { ...acc, [stat.name]: stat.value };
  }, {});