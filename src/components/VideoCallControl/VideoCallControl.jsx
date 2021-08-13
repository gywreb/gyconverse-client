import { Flex, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaMicrophone } from "react-icons/fa";
import { FaMicrophoneSlash } from "react-icons/fa";
import { ImPhoneHangUp } from "react-icons/im";
import { MdVideocam } from "react-icons/md";
import { MdVideocamOff } from "react-icons/md";

const VideoCallControl = ({ handleHangUp }) => {
  return (
    <Flex
      position="absolute"
      bottom="0"
      bg="none"
      width="100%"
      height="100px"
      alignSelf="flex-end"
      zIndex="99"
      alignItems="center"
      paddingRight="1%"
      paddingLeft="1%"
      justifyContent="center"
      mb={8}
    >
      <IconButton
        bgColor="gray.400"
        borderRadius="50%"
        boxSize={14}
        icon={<Icon as={FaMicrophone} color="white" boxSize={6} />}
        mr={12}
        opacity={0.6}
      />
      <IconButton
        bgColor="red.500"
        borderRadius="50%"
        boxSize={20}
        icon={<Icon as={ImPhoneHangUp} color="white" boxSize={10} />}
        opacity={0.6}
        onClick={handleHangUp}
      />
      <IconButton
        bgColor="gray.400"
        borderRadius="50%"
        boxSize={14}
        icon={<Icon as={MdVideocam} color="white" boxSize={6} />}
        ml={12}
        opacity={0.6}
      />
    </Flex>
  );
};

export default VideoCallControl;
