import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFillCaretRightFill, BsCheckCircle } from "react-icons/bs";
import SpiritModal from "../../../core/components/SpiritModal";
const spirits = [
  {
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
  },
  {
    name: "Noct of the Shade",
    desc: "Born from the absence of light, Noct enjoys the shadows and wishes to spread this joy to others. He embraces your interest in the darkness and happily helps you in your endeavors.",
    element: "Shade",
    abilities: [
      {
        name: "Shadow Armor:",
        desc: "Your str, spd, and def boost when in the shadows",
      },
      {
        name: "Shady Travels",
        desc: "You can travel to any one shadow, once per day but you lose shadow armor for 24hrs",
      },
    ],
    img: "https://image.shutterstock.com/image-illustration/dark-dragon-stone-background-260nw-1836182665.jpg",
    strategy:
      "Shadows are your friend! Suggest attacking at night or try to lure foes to shady areas or around big infrastructures. Your Shady Travel can either be an escape tactic or something you can use to get to hard to reach places!",
  },
  {
    name: "Shining Mantis",
    desc: "Always shining brilliantly, this spirit is the embodiment of justice. You seek assistance and he answers instantly, giving you the ability to create light structures.",
    element: "Shine",
    abilities: [
      {
        name: "Shining Justice",
        desc: "Your str, spd, and def boost when in the light",
      },
      {
        name: "Light Shield:",
        desc: "You can create a shield of light to defend against attacks (the more the light the stronger the shield max: 5)",
      },
    ],
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1J4GxqAnRL_9TgvvuXamTqNdaXYOFdIC4BA&usqp=CAU',
    strategy:
      "Stay in the light or create light. Maybe purchase a flashlight or a lamp before you head into battle. Avoid leading the charge at night and if you need to, keep a flash bang handy!",
  },
  {
    name: "Frost Tiger",
    desc: "Cold but fair, this tiger is unyielding to the law of the land. He is an executioner, punishing those who disrupt the law. Since you agree to punish the unruly, he will happily be your instrument, giving you the ability to freeze water.",
    element: "Frost",
    abilities: [
      {
        name: "Freezing",
        desc: "You can freeze moderate amounts of water per action",
      },
      {
        name: "Frost Launch",
        desc: "You can launch your ice 15ft straight. The damage of the ice depends on its size",
      },
    ],
    img: 'https://i.pinimg.com/originals/25/81/ff/2581ffd0742db1612103f5db349b5d73.jpg',
    strategy:
      "Strategy: Bring water bottles, jugs, whatever you can think of that can carry water. You can also freeze water into weapons, tools, etc. Get creative and try to be as flexible as water!",
  },
  {
    name: "Amber Scales",
    desc: "This spirit ensures that there is always balance in the universe. Light and then darkness. Life and then death, a perfect dichotomy in life that keeps everything equal. You have showed the scales that someone threatens this balance and it helps you without second thought. Blessing you with the knowledge and the ability to balance",
    element: "None",
    abilities: [
      {
        name: "Balanced Thoughts",
        desc: "You can ask for one hint in any situation",
      },
      {
        name: "True Balance",
        desc: "You can add your hp and mp, then divide them evenly. Can only be done once every 24hrs",
      },
    ],
    img: 'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6036a2d1c1500c374ffcbf2f%2FLegal-law-concept-statue-of-Lady-Justice-with-scales-of-justice-sky-background%2F960x0.jpg%3FcropX1%3D53%26cropX2%3D1476%26cropY1%3D0%26cropY2%3D909',
    strategy:
      "This ability is perfect for a support character (like a healer or long ranged fighter). With your balanced thoughts, you can quickly deduce a monsters weakness and with true balance, you can save yourself in a pinch! ",
  },
  {
    name: "Aquatica Orca",
    desc: "This spirit believes in freedom with all its heart and will fight to preserve everyones right to it. Granting you complete freedom in water, in hopes that you may use this ability to fend oppressors",
    element: "Water",
    abilities: [
      {
        name: "Child of Water",
        desc: "Water you yield has healing properties, you are also healed while in natural water",
      },
      { name: "Blast of Freedom", desc: "You can shoot water 15ft " },
    ],
    img: 'https://i.pinimg.com/originals/22/c8/fd/22c8fd264a4ca7e00544e106b23d19f5.jpg',
    strategy:
      "This ability is for a healing character. Stay within range of an attacker and heal them as they defend you. Keeping cantenes of water will prove useful and basing your strategies around being near large bodies of water will be ideal",
  },
  {
    name: "Paximime The Crafter",
    desc: "This spirit is a true creative, not caring for much except crafting. You promise him that this adventure will allow him to create to his hearts content. The enticed Crafter blesses you with the power of alchemic transmutation",
    element: "None",
    abilities: [
      {
        name: "Transmutation",
        desc: "You can gather material and change it into something else",
      },
    ],
    img: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/the-alchemist-cameron-gray.jpg',
    strategy:
      "This ability is exceptionally versatile but it heavily relies on your knowledge of alchemy, biology, earth metals, etc. Before going into battle, try going to a school, library or workshop and gain knowledge. This will make your ability extraordinarily useful",
  },
];
const ChooseASpirit = ({ spirit: defaultSpirit, updateCharacter }) => {
  const [spirit, setspirit] = useState(defaultSpirit);
  const [selectedSpirit, setselectedSpirit] = useState(defaultSpirit);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const selectedCss = useColorModeValue('green', 'green.600')
  function handleSpiritClick(spirit) {
    setspirit(spirit);
    onOpen();
  }
  useEffect(() => {
    updateCharacter({ spirit: selectedSpirit });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSpirit]);
  return (
    <>
      <Text align="center">
        Some spirits see the gradual decline to cataclysm, some simply want an
        adventure. Whatever the reason these spirits have agreed to form a
        contract with you. Choose the spirit you most resonate with!
      </Text>
      {spirits.map((s, i) => {
        const isSelected = selectedSpirit === s
        return (
          <Button
            bg={isSelected ? selectedCss : 'white'}
            border={selectedSpirit === s ? `solid 3px ${selectedCss}` : ""}
            justifyContent="space-between"
            rightIcon={
              selectedSpirit === s ? (
                <BsCheckCircle color={selectedCss} />
              ) : (
                <BsFillCaretRightFill color="black" />
              )
            }
            size="lg"
            onClick={() => handleSpiritClick(s)}
            key={i}
            p={3}
          >
            <Text color={isSelected ? 'white' : "black"}>{s.name}</Text>
          </Button>
        );
      })}
      <SpiritModal 
      isOpen={isOpen}
      onClose={onClose}
      selectedSpirit={selectedSpirit}
              setselectedSpirit={setselectedSpirit}
              spirit={spirit}
      />
     
    </>
  );
};

export default ChooseASpirit;
