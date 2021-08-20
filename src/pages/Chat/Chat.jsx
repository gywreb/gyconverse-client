import { Flex, Spinner, useToast } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AppLayout from "src/components/AppLayout/AppLayout";
import ChatBox from "src/components/ChatBox/ChatBox";
import ChatHeader from "src/components/ChatHeader/ChatHeader";
import ChatInput from "src/components/ChatInput/ChatInput";
import { MESSAGE_TYPE } from "src/configs/constants";
import { ROUTE_KEY } from "src/configs/routes";
import { Events, SocketService } from "src/services/SocketService";
import {
  loadRoomHistory,
  saveMessage,
  setSocketMessage,
} from "src/store/chat/actions";

const Chat = () => {
  const {
    inCallingFriends,
    inVidCallFriends,
    loadingHistory,
    currentRoom,
    onlineFriends,
  } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageAnchor = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();

  const handleToBottom = () => {
    messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.sendCallFinishMess) {
      location.state.sendCallFinishMess = false;
      const newMessage = {
        type: MESSAGE_TYPE.VIDEO_CALL,
        room: currentRoom?.singleRoom,
        sender: userInfo._id,
        content: location.state.content,
      };
      setTimeout(
        () => {
          dispatch(saveMessage(newMessage));
          setTimeout(() => {
            messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        },
        process.env.NODE_ENV === "development" ? 500 : 2500
      );
    }
  }, [location.state]);

  useEffect(() => {
    if (location?.state?.isChatInit) {
      console.log(userInfo._id);
      let firstFriend = userInfo.friends[0];
      if (firstFriend.singleRoom) dispatch(loadRoomHistory(firstFriend));
      SocketService.client.emit(Events.joinRoom, firstFriend.singleRoom);
    }
    SocketService.client.on(Events.receiveSingleChat, (message) => {
      if (message.room === SocketService.currentSocketRoom?.singleRoom) {
        dispatch(setSocketMessage(message));
        setTimeout(() => {
          messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });
    return () => {
      SocketService.client.off(Events.receiveSingleChat);
    };
  }, []);

  const [message, setMessage] = useState("");

  const handleChat = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message?.trim().length) return null;
    const newMessage = {
      type: MESSAGE_TYPE.TEXT,
      room: currentRoom.singleRoom,
      sender: userInfo._id,
      content: message,
    };
    dispatch(saveMessage(newMessage));
    setMessage("");
    setTimeout(() => {
      messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleVideoCall = (currentRoom, isOnline, isInCalling, isInVidCall) => {
    if (currentRoom && userInfo) {
      if (!isOnline) {
        toast({
          title: `${currentRoom.username} is offline at the moment, try calling ${currentRoom.username} again later!`,
          position: "top",
          status: "warning",
          duration: 20000,
          isClosable: true,
        });
      } else if (isInVidCall) {
        toast({
          title: `${currentRoom.username} is in video call with someone, try calling ${currentRoom.username} again later!`,
          position: "top",
          status: "error",
          duration: 20000,
          isClosable: true,
        });
      } else if (isInCalling) {
        toast({
          title: `${currentRoom.username} is calling someone, try calling ${currentRoom.username} again later!`,
          position: "top",
          status: "warning",
          duration: 20000,
          isClosable: true,
        });
      } else {
        history.replace({
          pathname: ROUTE_KEY.VideoCall,
          state: { isCallInitiator: true, isVideoCall: true },
        });
      }
    }
  };

  return (
    <AppLayout>
      <Flex
        flexDirection="column"
        position="relative"
        width="100%"
        alignItems="center"
        height="100vh"
        pb="70px"
        pt="70px"
        overflowX="hidden"
      >
        <ChatHeader
          isOnline={onlineFriends.includes(currentRoom?._id)}
          isInCalling={inCallingFriends.includes(currentRoom?._id)}
          isInVidCall={inVidCallFriends.includes(currentRoom?._id)}
          avatar={currentRoom?.avatar}
          roomName={currentRoom?.username}
          handleVideoCall={() =>
            handleVideoCall(
              currentRoom,
              onlineFriends.includes(currentRoom?._id),
              inCallingFriends.includes(currentRoom?._id),
              inVidCallFriends.includes(currentRoom?._id)
            )
          }
        />
        {loadingHistory ? (
          <Flex
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100%"
            bg="gray.200"
          >
            <Spinner color="teal.500" boxSize={32} thickness="6px" />
          </Flex>
        ) : (
          <ChatBox
            authUser={userInfo}
            messageAnchor={messageAnchor}
            handleToBottom={handleToBottom}
          />
        )}
        <ChatInput
          onChat={handleChat}
          message={message}
          sendMessage={handleSendMessage}
          onClickSend={handleSendMessage}
        />
      </Flex>
    </AppLayout>
  );
};

export default Chat;
