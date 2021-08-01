import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const RightMessage = ({ content, avatar, isContinuous }) => {
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
        >
          <Text maxWidth="100%" textAlign="right" color="white">
            {content || ``}
          </Text>
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
