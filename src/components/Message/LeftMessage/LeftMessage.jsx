import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const LeftMessage = ({ content, avatar }) => {
  return (
    <Flex justifyContent="flex-start" width="100%">
      <Flex maxWidth="50%" alignSelf="flex-start" pt={4} pb={4} pr={6}>
        <Avatar
          alignSelf="flex-end"
          size="md"
          src={avatar ? avatar : ""}
          padding="2px"
          bgColor={avatar ? "white" : "none"}
          boxShadow="lg"
          mr={2}
        />
        <Box p={4} borderRadius="8px" bgColor="gray.50" boxShadow="lg">
          <Text textAlign="left">
            {content ||
              `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
          atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
          explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
          nihil!`}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default LeftMessage;
