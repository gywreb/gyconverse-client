import { chakra, Flex, Icon } from "@chakra-ui/react";
import React from "react";

const Video = chakra("video", {
  baseStyle: {},
});

const AuthWebcam = ({ videoRef }) => {
  return (
    <Flex
      position="absolute"
      top="2%"
      right="1%"
      zIndex="999"
      width="300px"
      borderRadius="md"
      alignItems="center"
      justifyContent="center"
    >
      <Video
        playsInline
        muted
        ref={videoRef}
        autoPlay
        minWidth="100%"
        style={{
          borderRadius: "4px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      />
    </Flex>
  );
};

export default AuthWebcam;
