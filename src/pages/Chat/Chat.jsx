import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import AppLayout from "src/components/AppLayout/AppLayout";
import ChatBox from "src/components/ChatBox/ChatBox";
import ChatHeader from "src/components/ChatHeader/ChatHeader";
import ChatInput from "src/components/ChatInput/ChatInput";

const Chat = () => {
  const messages = [
    {
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
    atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
    explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
    nihil!`,
      avatar: "https://avatars.githubusercontent.com/gywreb",
      owner: true,
    },
    {
      content: `This is a short message`,
      avatar: null,
      owner: false,
    },
    {
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
      atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
      explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
      nihil!`,
      avatar: null,
      owner: false,
    },
    {
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
    atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
    explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
    nihil!`,
      avatar: "https://avatars.githubusercontent.com/gywreb",
      owner: true,
    },
    {
      content: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est omnis
      atque cumque asperiores praesentium quibusdam perspiciatis. Numquam a
      explicabo ea nisi neque illum fugit sit at dolorem, delectus maxime
      nihil!`,
      avatar: null,
      owner: false,
    },
    {
      content: `This is a short message`,
      avatar: "https://avatars.githubusercontent.com/gywreb",
      owner: true,
    },
  ];

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
        <ChatHeader />
        <ChatBox messages={messages} />
        <ChatInput />
      </Flex>
    </AppLayout>
  );
};

export default Chat;
