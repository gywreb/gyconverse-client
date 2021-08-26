import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { fileUri } from "src/configs/apiClient";
import TimerDisplay from "../TimerDisplay/TimerDisplay";

const VideoCallHeader = ({
  avatar,
  username,
  isInCall,
  seconds,
  minutes,
  hours,
}) => {
  return (
    <Flex
      position="absolute"
      width="100vw"
      top={0}
      alignItems="center"
      zIndex="98"
      pt={6}
      pb={6}
      pl={6}
    >
      <Avatar
        size="lg"
        src={
          avatar
            ? fileUri(avatar)
            : `https://avatars.dicebear.com/api/gridy/${username}.svg`
        }
        mr={4}
      />
      <Flex flexDirection="column">
        <Text
          fontWeight="bold"
          fontSize="2xl"
          color={isInCall ? "gray.900" : "white"}
        >
          {!isInCall ? ` Calling ${username || ""}...` : username || ""}
        </Text>
        <Flex alignItems="center">
          {hours >= 1 && (
            <TimerDisplay value={hours} isInCall={isInCall} seperator />
          )}
          <TimerDisplay value={minutes} isInCall={isInCall} seperator />
          <TimerDisplay value={seconds} isInCall={isInCall} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VideoCallHeader;
