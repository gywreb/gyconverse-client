import { Flex } from "@chakra-ui/react";
import React from "react";
import Conversation from "../Conversation/Conversation";
import SideBar from "../SideBar/SideBar";
import VideoCallNotiCard from "../VideoCallNotiCard/VideoCallNotiCard";

const AppLayout = ({ children }) => {
  return (
    <Flex width="100%" alignItems="center" overflowY="hidden">
      <SideBar />
      <Conversation />
      {children}
      <VideoCallNotiCard />
    </Flex>
  );
};

export default AppLayout;
