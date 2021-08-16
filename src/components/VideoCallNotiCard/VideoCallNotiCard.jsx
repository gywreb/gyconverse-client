import {
  Avatar,
  Button,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const VideoCallNotiCard = ({ avatar, username }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {}, []);

  return (
    <Modal isOpen={isOpen} isCentered size="xs" motionPreset="scale">
      <ModalOverlay />
      <ModalContent minHeight="380px">
        <ModalHeader textAlign="center" fontWeight="normal">
          Incomming Call
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection="column" alignItems="center">
            <Avatar mt={2} boxSize={32} src={avatar ? avatar : ""} />
            <Text color="teal.500" fontSize="xl" mt={2} fontWeight="bold">
              a username
            </Text>
            <Flex alignItems="center" mt={8}>
              <IconButton
                mr={12}
                bgColor="green.400"
                borderRadius="50%"
                boxSize={20}
                icon={<Icon as={FaPhoneAlt} color="white" boxSize={10} />}
              />
              <IconButton
                bgColor="red.500"
                borderRadius="50%"
                boxSize={20}
                icon={<Icon as={IoMdClose} color="white" boxSize={12} />}
                onClick={() => onClose()}
              />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoCallNotiCard;
