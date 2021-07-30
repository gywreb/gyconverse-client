import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const RightMessage = ({ content, avatar }) => {
  return (
    <Flex justifyContent="flex-end" width="100%">
      <Flex maxWidth="50%" alignSelf="flex-end" pt={4} pb={4} pl={6}>
        <Box p={4} borderRadius="8px" bgColor="teal.500" boxShadow="lg">
          <Text textAlign="right" color="white">
            {content || ``}
          </Text>
        </Box>
        <Avatar
          alignSelf="flex-end"
          size="md"
          src={avatar ? avatar : ""}
          padding="2px"
          bgColor="white"
          ml={2}
          boxShadow="lg"
        />
      </Flex>
    </Flex>
  );
};

export default RightMessage;
