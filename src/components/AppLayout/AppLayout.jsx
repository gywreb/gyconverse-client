import { Flex } from "@chakra-ui/react";
import React from "react";
import Conversation from "../Conversation/Conversation";
import SideBar from "../SideBar/SideBar";

const AppLayout = ({ children }) => {
  return (
    <Flex width="100%" alignItems="center">
      <SideBar />
      <Conversation />
      {children}
    </Flex>
  );
};

export default AppLayout;
