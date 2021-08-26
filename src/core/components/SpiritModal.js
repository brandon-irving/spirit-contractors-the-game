import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import SpiritInfo from '../../pages/CreateACharacter/ChooseASpirit/SpiritInfo'

const SpiritModal = ({isOpen, onClose, selectedSpirit, setselectedSpirit, spirit, }) => {
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
          <ModalHeader>Spirit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SpiritInfo
              selectedSpirit={selectedSpirit}
              setselectedSpirit={setselectedSpirit}
              closeModal={onClose}
              spirit={spirit}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    )
}

export default SpiritModal
