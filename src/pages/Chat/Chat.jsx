import { Box, Flex, Spinner, Stack } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "src/components/AppLayout/AppLayout";
import ChatBox from "src/components/ChatBox/ChatBox";
import ChatHeader from "src/components/ChatHeader/ChatHeader";
import ChatInput from "src/components/ChatInput/ChatInput";
import MotionDiv from "src/components/MotionDiv/MotionDiv";
import { MESSAGE_TYPE } from "src/configs/constants";
import { Events, SocketService } from "src/services/SocketService";
import {
  loadRoomHistory,
  saveMessage,
  setSocketMessage,
} from "src/store/chat/actions";

const Chat = () => {
  const { messages, loadingHistory, currentRoom, onlineFriends } = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    SocketService.client.on(Events.receiveSingleChat, (message) => {
      console.log(message);
      dispatch(setSocketMessage(message));
    });
    if (!messages?.length && userInfo) {
      console.log(userInfo._id);
      let firstFriend = userInfo.friends[0];
      if (firstFriend.singleRoom) dispatch(loadRoomHistory(firstFriend));
      SocketService.client.emit(Events.joinRoom, firstFriend.singleRoom);
    }
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
  };

  // const messages = [
  //   {
  //     content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
  //   atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
  //   explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
  //   nihil!`,
  //     avatar: "https://avatars.githubusercontent.com/gywreb",
  //     owner: true,
  //   },
  //   {
  //     content: `This is a short message`,
  //     avatar: null,
  //     owner: false,
  //   },
  //   {
  //     content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
  //     atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
  //     explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
  //     nihil!`,
  //     avatar: null,
  //     owner: false,
  //   },
  //   {
  //     content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
  //   atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
  //   explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
  //   nihil!`,
  //     avatar: "https://avatars.githubusercontent.com/gywreb",
  //     owner: true,
  //   },
  //   {
  //     content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
  //     atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
  //     explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
  //     nihil!`,
  //     avatar: null,
  //     owner: false,
  //   },
  //   {
  //     content: `This is a short message`,
  //     avatar: "https://avatars.githubusercontent.com/gywreb",
  //     owner: true,
  //   },
  // ];

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
          avatar={currentRoom?.avatar}
          roomName={currentRoom?.username}
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
          <ChatBox messages={messages} authUser={userInfo} />
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
