import { Avatar, Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdVideocam } from "react-icons/io";
import { appColor } from "src/configs/styles";

const ChatHeader = ({ avatar, roomName, isOnline, handleVideoCall }) => {
  return (
    <Box width="100%">
      <Flex
        boxShadow="rgba(0, 0, 0, 0.45) 0px 10px 20px -20px"
        width="100%"
        position="absolute"
        height="70px"
        top="0"
        bgColor="gray.50"
        zIndex="99"
        borderLeftWidth="2px"
        borderColor="gray.200"
        paddingRight="1%"
        paddingLeft="1%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" maxWidth="50%">
          <Avatar
            position="relative"
            size="md"
            src={avatar || ""}
            _after={{
              content: "''",
              position: "absolute",
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              bottom: "0",
              left: "70%",
              backgroundColor: isOnline ? appColor.online : "gray.500",
              borderWidth: "2px",
              borderColor: "white",
            }}
          />
          <Box maxWidth="70%" ml={2}>
            <Text isTruncated fontSize="lg">
              {roomName || ""}
            </Text>
            <Text isTruncated fontSize="md" color="gray.500">
              {isOnline ? "Online" : "Offline"}
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center" flexWrap="wrap">
          <IconButton
            ml={4}
            bgColor="gray.50"
            icon={<Icon as={IoMdVideocam} color="teal.500" boxSize={8} />}
            onClick={handleVideoCall}
          />
          <IconButton
            bgColor="gray.50"
            ml={4}
            icon={
              <Icon as={BsFillInfoCircleFill} color="teal.500" boxSize={6} />
            }
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatHeader;
