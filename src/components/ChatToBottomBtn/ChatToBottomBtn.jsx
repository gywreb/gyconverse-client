import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import MotionDiv from "../MotionDiv/MotionDiv";

const ChatToBottomBtn = ({ onClick }) => {
  return (
    <MotionDiv
      motion="fadeIn"
      position="absolute"
      bottom="90px"
      right="2%"
      bgColor="gray.50"
      width="40px"
      height="40px"
      borderRadius="50%"
      zIndex="999"
      cursor="pointer"
      boxShadow="lg"
      onClick={onClick}
    >
      <Flex
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={FaChevronDown} color="teal.500" />
      </Flex>
    </MotionDiv>
  );
};

export default ChatToBottomBtn;
