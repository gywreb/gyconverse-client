import {
  Avatar,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useEditableControls,
} from "@chakra-ui/react";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { fileUri } from "src/configs/apiClient";
import GCIcon from "../../assets/images/gc-icon-smooth.png";

const EditableProfile = ({ isOpen, onClose, userInfo }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" alignItems="center">
            <Avatar
              mt={2}
              boxSize={32}
              src={userInfo?.avatar ? fileUri(userInfo.avatar) : GCIcon}
              bgColor={userInfo?.avatar ? "white" : "teal"}
              boxShadow="lg"
              padding="2px"
              size="md"
              cursor="pointer"
            />
            <Editable
              mt={4}
              color="teal.500"
              fontWeight="bold"
              textAlign="center"
              defaultValue={userInfo?.username || ""}
              fontSize="2xl"
              position="relative"
              width="80%"
              maxWidth="80%"
              isTruncated
              //isPreviewFocusable={false}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditableProfile;
