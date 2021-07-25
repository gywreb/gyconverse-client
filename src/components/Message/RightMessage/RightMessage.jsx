import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const RightMessage = ({ content, avatar }) => {
  return (
    <Flex maxWidth="50%" alignSelf="flex-end" pt={4} pb={4} pl={6}>
      <Box p={4} borderRadius="8px" bgColor="teal.500" boxShadow="lg">
        <Text textAlign="right" color="white">
          {content ||
            `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
          atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
          explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
          nihil!`}
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
  );
};

export default RightMessage;
