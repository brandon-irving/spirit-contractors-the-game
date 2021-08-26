import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ActionsModal = ({ isOpen, onClose }) => {
  return (
    <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <ModalHeader>Actions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Each turn you can perform any 2 actions once</Text>
          <>
            <Text mt={4} fontWeight={"bold"} fontSize="14pt">
              Attack
            </Text>
            <Box align="left">
              <Text mb={2}>
                This is when you launch a strike at an enemy. You have 3 basic
                means of attacking but youre creative enough, then ask the DM
                and see if you can perform the action!
              </Text>
              <Text>- Striking with your weapon</Text>
              <Text>- Throwing your weapon (If feasible)</Text>
              <Text>- Fisticuf (dmg is your str boost)</Text>
            </Box>
          </>
          <>
            <Text mt={4} fontWeight={"bold"} fontSize="14pt">
              Travel
            </Text>
            <Box align="left">
              <Text mb={2}>
                The act of moving your dungeon piece squares based off of your
                roll. (5ft = 1 square)
              </Text>
            </Box>
          </>
          <>
            <Text mt={4} fontWeight={"bold"} fontSize="14pt">
              Ability
            </Text>
            <Box align="left">
              <Text mb={2}>
                You can use an action activating your spirits ability!
              </Text>
            </Box>
          </>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ActionsModal;
