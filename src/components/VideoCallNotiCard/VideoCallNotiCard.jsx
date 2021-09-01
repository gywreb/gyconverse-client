import {
  Avatar,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ROUTE_KEY } from "src/configs/routes";
import { Events, SocketService } from "src/services/SocketService";
import { setBackPrevRoom, setCurrentRoom } from "src/store/chat/actions";

const VideoCallNotiCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [notiInfo, setNotiInfo] = useState(null);
  const [signal, setSignal] = useState(null);
  const [callerSignal, setCallerSignal] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { currentRoom, prevRoom } = useSelector((state) => state.chat);
  const [currentVidFriend, setCurrentVidFriend] = useState(null);
  let notiTimeOut = null;

  const handleReceiveCall = (signal) => {
    onOpen();
    setNotiInfo(signal.from);
    const selectedFriend = userInfo?.friends?.find(
      (friend) => friend.id == signal.from._id
    );
    if (selectedFriend) {
      // improve this bug in future
      selectedFriend.talked = true;
      selectedFriend.singleRoom = signal.to.singleRoom;
      setCurrentVidFriend({ ...selectedFriend });
      dispatch(
        setCurrentRoom(selectedFriend, currentRoom ? currentRoom : null)
      );
    } else {
      handleDenyCall(signal);
      toast({
        title: `${signal?.from?.username} try to video call you but failed :(, let talk with ${signal?.from?.username}!`,
        position: "top",
        status: "error",
        duration: 20000,
        isClosable: true,
      });
    }
    setSignal(signal);
    setCallerSignal(signal.fromSignal);
    notiTimeOut = setTimeout(() => {
      handleDenyCall(signal);
      toast({
        title: `You missed a call from ${signal?.from?.username}!`,
        position: "top",
        status: "error",
        duration: 20000,
        isClosable: true,
      });
    }, 10000);
  };

  useEffect(() => {
    SocketService.client.on(Events.receiveCall, (signal) => {
      handleReceiveCall(signal);
    });

    SocketService.client.on(Events.cancelCallReceive, (signal) => {
      onClose();
      clearTimeout(notiTimeOut);
    });

    return () => {
      if (notiTimeOut) clearTimeout(notiTimeOut);
      SocketService.client.off(Events.receiveCall);
      SocketService.client.off(Events.cancelCallReceive);
    };
  }, []);

  const handleDenyCall = (receiveSignal) => {
    onClose();
    SocketService.client.emit(Events.denyCall, signal ? signal : receiveSignal);
    if (prevRoom) dispatch(setBackPrevRoom(prevRoom));
  };

  const handleAnswerCall = () => {
    onClose();
    clearTimeout(notiTimeOut);
    console.log(currentVidFriend);
    history.replace({
      pathname: ROUTE_KEY.VideoCall,
      state: {
        isInCall: true,
        callerSignal,
        inviteSignal: signal,
        isVideoCall: true,
        currentVidFriend,
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen && notiInfo}
      isCentered
      size="xs"
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent minHeight="380px">
        <ModalHeader textAlign="center" fontWeight="normal">
          Incomming Call
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection="column" alignItems="center">
            <Avatar
              mt={2}
              boxSize={32}
              src={notiInfo?.avatar ? notiInfo.avatar : ""}
            />
            <Text color="teal.500" fontSize="xl" mt={2} fontWeight="bold">
              {notiInfo?.username || ""}
            </Text>
            <Flex alignItems="center" mt={8}>
              <IconButton
                mr={12}
                bgColor="green.400"
                borderRadius="50%"
                boxSize={20}
                icon={<Icon as={FaPhoneAlt} color="white" boxSize={10} />}
                onClick={handleAnswerCall}
              />
              <IconButton
                bgColor="red.500"
                borderRadius="50%"
                boxSize={20}
                icon={<Icon as={IoMdClose} color="white" boxSize={12} />}
                onClick={handleDenyCall}
              />
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoCallNotiCard;
