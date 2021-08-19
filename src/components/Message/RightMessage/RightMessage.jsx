import { Avatar, Box, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoMdCall } from "react-icons/io";
import { MESSAGE_TYPE } from "src/configs/constants";

const RightMessage = ({
  content,
  avatar,
  isContinuous,
  type,
  handleInteractMessage,
}) => {
  const renderMessage = (type) => {
    switch (type) {
      case MESSAGE_TYPE.VIDEO_CALL: {
        return (
          <>
            <Flex
              mr={4}
              boxSize={10}
              bgColor="teal.400"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <Icon as={IoMdCall} color="white" boxSize={6} />
            </Flex>
            <Flex flexDirection="column">
              <Text
                maxWidth="100%"
                textAlign="right"
                color="white"
                fontWeight="bold"
              >
                Video Call
              </Text>
              <Text
                maxWidth="100%"
                textAlign="right"
                color="white"
                fontSize="sm"
              >
                {content || ``}
              </Text>
            </Flex>
          </>
        );
      }
      default: {
        return (
          <Text maxWidth="100%" textAlign="right" color="white">
            {content || ``}
          </Text>
        );
      }
    }
  };
  return (
    <Flex justifyContent="flex-end" width="100%">
      <Flex
        width="75%"
        alignSelf="flex-end"
        justifyContent="flex-end"
        pt={2}
        pb={2}
        pl={6}
      >
        <Flex
          maxWidth="90%"
          p={4}
          borderRadius="8px"
          bgColor="teal.500"
          boxShadow="lg"
          cursor={type !== MESSAGE_TYPE.TEXT ? "pointer" : null}
          onClick={handleInteractMessage}
        >
          {renderMessage(type)}
        </Flex>
        <Flex maxWidth="10%" ml={2}>
          <Avatar
            alignSelf="flex-end"
            size="md"
            src={avatar ? avatar : ""}
            padding="2px"
            bgColor="white"
            boxShadow="lg"
            opacity={isContinuous ? 0 : 1}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightMessage;
