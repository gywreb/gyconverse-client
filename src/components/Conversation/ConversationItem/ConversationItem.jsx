import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { RiChatSmile3Fill } from "react-icons/ri";
import { fileUri } from "src/configs/apiClient";
import { appColor } from "src/configs/styles";
import { parseEmojis } from "src/utils/parseEmojis";

const ConversationItem = ({
  username,
  lastMessage,
  avatar,
  talked,
  onClick,
  isOnline,
  isInCalling,
  isInVidCall,
  handleSendChatInvite,
  isChatting,
}) => {
  return (
    <Box
      bg={isChatting ? "gray.100" : "gray.50"}
      cursor="pointer"
      _hover={{ bgColor: "gray.100" }}
      transition="0.15s ease-in-out"
      onClick={!talked ? null : onClick}
    >
      <Flex alignItems="center" justifyContent="space-between" padding={4}>
        <Flex maxWidth="70%" alignItems="center">
          <Avatar
            size="md"
            src={
              avatar
                ? fileUri(avatar)
                : `https://avatars.dicebear.com/api/gridy/${username}.svg`
            }
            _after={{
              content: "''",
              position: "absolute",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              bottom: "0",
              left: "70%",
              backgroundColor: isInVidCall
                ? "red.400"
                : isInCalling
                ? "yellow.400"
                : isOnline
                ? appColor.online
                : "gray.500",
              borderWidth: "2px",
              borderColor: "white",
            }}
          />
          <Box maxWidth="90%" ml={2}>
            <Text isTruncated fontSize="md">
              {username || ``}
            </Text>
            <Text isTruncated fontSize="sm" color="gray.500">
              {talked && lastMessage
                ? parseEmojis(lastMessage)
                : `Let start chatting now`}
            </Text>
          </Box>
        </Flex>
        {!talked ? (
          <Box>
            <Button
              leftIcon={<RiChatSmile3Fill color="white" />}
              colorScheme="teal"
              color="white"
              size="sm"
              iconSpacing={2}
              onClick={handleSendChatInvite}
            >
              Chat!
            </Button>
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default ConversationItem;
