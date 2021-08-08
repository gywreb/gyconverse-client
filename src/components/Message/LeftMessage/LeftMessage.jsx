import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const LeftMessage = ({ content, avatar, isContinuous }) => {
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
        <Box maxWidth="10%" mr={2}>
          <Avatar
            alignSelf="flex-end"
            size="md"
            src={avatar ? avatar : ""}
            padding="2px"
            bgColor={avatar ? "white" : "none"}
            boxShadow="lg"
            opacity={isContinuous ? 0 : 1}
          />
        </Box>
        <Flex
          maxWidth="90%"
          p={4}
          borderRadius="8px"
          bgColor="gray.50"
          boxShadow="lg"
        >
          <Text maxWidth="100%" textAlign="left">
            {content || ``}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeftMessage;
