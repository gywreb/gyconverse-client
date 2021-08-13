import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AppLayout from "src/components/AppLayout/AppLayout";
import ThreeDotsWave from "src/components/ThreeDotWave/ThreeDotWave";
import VideoCallControl from "src/components/VideoCallControl/VideoCallControl";
import { ROUTE_KEY } from "src/configs/routes";
import { loadRoomHistory } from "src/store/chat/actions";

const VideoCall = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentRoom } = useSelector((state) => state.chat);

  const handleHangUp = () => {
    dispatch(loadRoomHistory(currentRoom));
    history.push(ROUTE_KEY.Chat);
  };

  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="100%"
      alignItems="center"
      height="100vh"
      overflowX="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        bg="gray.900"
        flexDirection="column"
        pb={20}
      >
        <Icon as={GoPerson} color="white" boxSize={80} />
        <Text fontSize="3xl" color="white" mt={4} mb={4}>
          Calling username
        </Text>
        <ThreeDotsWave />
      </Flex>
      <VideoCallControl handleHangUp={() => handleHangUp()} />
    </Flex>
  );
};

export default VideoCall;
