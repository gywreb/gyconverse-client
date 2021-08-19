import { Flex, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ImPhoneHangUp } from "react-icons/im";
import { MdVideocam, MdVideocamOff } from "react-icons/md";

const VideoCallControl = ({
  handleHangUp,
  handleControlWebcam,
  handleControlMic,
  isVideoMute,
  isMicMute,
}) => {
  return (
    <Flex
      position="absolute"
      bottom="0"
      width="100%"
      height="80px"
      alignSelf="flex-end"
      zIndex="99"
      alignItems="center"
      paddingRight="1%"
      paddingLeft="1%"
      justifyContent="center"
      boxShadow="md"
    >
      <Flex alignItems="center" position="relative" top="-50%">
        <IconButton
          bgColor="white"
          borderRadius="50%"
          boxSize={14}
          icon={
            <Icon
              as={isMicMute ? FaMicrophoneSlash : FaMicrophone}
              color="gray.900"
              boxSize={6}
            />
          }
          mr={12}
          boxShadow="md"
          onClick={handleControlMic}
        />
        <IconButton
          bgColor="red.500"
          borderRadius="50%"
          boxSize={20}
          icon={<Icon as={ImPhoneHangUp} color="white" boxSize={8} />}
          onClick={handleHangUp}
          boxShadow="md"
        />
        <IconButton
          bgColor="white"
          borderRadius="50%"
          boxSize={14}
          icon={
            <Icon
              as={isVideoMute ? MdVideocamOff : MdVideocam}
              color="gray.900"
              boxSize={6}
            />
          }
          ml={12}
          onClick={handleControlWebcam}
          boxShadow="md"
        />
      </Flex>
    </Flex>
  );
};

export default VideoCallControl;
