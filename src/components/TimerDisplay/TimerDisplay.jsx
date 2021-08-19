import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const TimerDisplay = ({ value, isInCall, seperator }) => {
  const leftDigit = value >= 10 ? value.toString()[0] : "0";
  const rightDigit = value >= 10 ? value.toString()[1] : value.toString();

  return (
    <Flex alignItems="center">
      <Text fontSize="xl" color={isInCall ? "gray.900" : "white"}>
        {leftDigit}
      </Text>
      <Text fontSize="xl" color={isInCall ? "gray.900" : "white"}>
        {rightDigit}
        {seperator ? ":" : ""}
      </Text>
    </Flex>
  );
};

export default TimerDisplay;
