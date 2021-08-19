import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoMdCall } from "react-icons/io";
import { MESSAGE_TYPE } from "src/configs/constants";

const LeftMessage = ({
  content,
  avatar,
  type,
  isContinuous,
  handleInteractMessage,
}) => {
  const renderMessage = (type) => {
    switch (type) {
      case MESSAGE_TYPE.VIDEO_CALL: {
        return (
          <>
            <Flex flexDirection="column">
              <Text maxWidth="100%" textAlign="left" fontWeight="bold">
                Video Call
              </Text>
              <Text
                maxWidth="100%"
                textAlign="left"
                color="gray.500"
                fontSize="sm"
              >
                {content || ``}
              </Text>
            </Flex>
            <Flex
              ml={4}
              boxSize={10}
              bgColor="gray.400"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <Icon as={IoMdCall} color="white" boxSize={6} />
            </Flex>
          </>
        );
      }
      default: {
        return (
          <Text maxWidth="100%" textAlign="left">
            {content || ``}
          </Text>
        );
      }
    }
  };
  return (
    <Flex justifyContent="flex-start" width="100%">
      <Flex
        width="75%"
        alignSelf="flex-start"
        justifyContent="flex-start"
        pt={2}
        pb={2}
        pr={6}
      >
        <Flex maxWidth="10%" mr={2}>
          <Avatar
            alignSelf="flex-end"
            size="md"
            src={avatar ? avatar : ""}
            padding="2px"
            bgColor={avatar ? "white" : "none"}
            boxShadow="lg"
            opacity={isContinuous ? 0 : 1}
          />
        </Flex>
        <Flex
          cursor={type !== MESSAGE_TYPE.TEXT ? "pointer" : null}
          onClick={handleInteractMessage}
          maxWidth="90%"
          p={4}
          borderRadius="8px"
          bgColor="gray.50"
          boxShadow="lg"
          alignItems="center"
        >
          {renderMessage(type)}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeftMessage;
