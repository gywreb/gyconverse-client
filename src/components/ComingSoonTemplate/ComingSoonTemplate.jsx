import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import GCIcon from "../../assets/images/gc-icon-smooth.png";

const ComingSoonTemplate = ({ bgColor, featureName }) => {
  return (
    <Flex
      width="100%"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      bgGradient="linear(to-tl, gray.300, gray.50)"
    >
      <Avatar src={GCIcon} boxSize={48} />
      <Text
        bgGradient="linear(to-r, cyan.600, teal.900)"
        bgClip="text"
        fontSize="7xl"
        letterSpacing="widest"
        fontWeight="bold"
      >
        COMING SOON
      </Text>
      <Text bg="teal.500" bgClip="text" fontSize="2xl" letterSpacing="wide">
        {`We will launch ${featureName || "this feature"} very soon!`}
      </Text>
    </Flex>
  );
};

export default ComingSoonTemplate;
