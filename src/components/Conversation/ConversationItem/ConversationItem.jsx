import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { appColor } from "src/configs/styles";

const ConversationItem = ({ username, lastMessage, avatar, onClick }) => {
  return (
    <Box
      cursor="pointer"
      _hover={{ bgColor: "gray.100" }}
      transition="0.15s ease-in-out"
      onClick={onClick}
    >
      <Flex alignItems="center" justifyContent="space-between" padding={4}>
        <Flex maxWidth="70%" alignItems="center">
          <Avatar
            size="md"
            src={avatar ? avatar : ""}
            _after={{
              content: "''",
              position: "absolute",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              bottom: "0",
              left: "70%",
              backgroundColor: appColor.online,
              borderWidth: "2px",
              borderColor: "white",
            }}
          />
          <Box maxWidth="70%" ml={2}>
            <Text isTruncated fontSize="lg">
              {username ||
                `This is a name Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Aspernatur ipsum eligendi rem id? Natus libero dignissimos,
              asperiores, a itaque ipsam nemo obcaecati eveniet sit consectetur
              in voluptate possimus debitis excepturi!`}
            </Text>
            <Text isTruncated fontSize="md" color="gray.500">
              {lastMessage ||
                `This is a message Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aspernatur ipsum eligendi rem id? Natus libero
              dignissimos, asperiores, a itaque ipsam nemo obcaecati eveniet sit
              consectetur in voluptate possimus debitis excepturi!`}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Text fontSize="xs" color="gray.500">
            4 hours ago
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ConversationItem;
