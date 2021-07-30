import { Box, Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const OverlaySpinner = () => {
  return (
    <Flex
      position="absolute"
      width="100vw"
      height="100vh"
      bg="gray.50"
      zIndex="9999"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner color="teal.500" boxSize={32} thickness="6px" />
    </Flex>
  );
};

export default OverlaySpinner;
