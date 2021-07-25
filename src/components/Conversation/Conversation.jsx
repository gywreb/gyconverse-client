import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { BsSearch } from "react-icons/bs";
import AppScrollBar from "../AppScrollBar/AppScrollBar";
import MotionDiv from "../MotionDiv/MotionDiv";
import ConversationItem from "./ConversationItem/ConversationItem";

const Conversation = () => {
  const conversations = [
    {
      username: "username 1",
      lastMessage: "This is a last message",
      avatar: "https://avatars.githubusercontent.com/gywreb",
    },
    {
      username: "username 2",
      lastMessage: `This is a last message Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Excepturi culpa, in ullam non adipisci, quidem praesentium soluta corporis omnis et molestiae sunt?
      Cupiditate consectetur sunt est deleniti facere quasi accusantium.`,
      avatar: null,
    },
    {
      username: "username 3",
      lastMessage: "This is a last message",
      avatar: "https://avatars.githubusercontent.com/gywreb",
    },
    {
      username: "username 4",
      lastMessage: `This is a last message Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Excepturi culpa, in ullam non adipisci, quidem praesentium soluta corporis omnis et molestiae sunt?
      Cupiditate consectetur sunt est deleniti facere quasi accusantium.`,
      avatar: null,
    },
    {
      username: "username 5",
      lastMessage: "This is a last message",
      avatar: "https://avatars.githubusercontent.com/gywreb",
    },
    {
      username: "username 6",
      lastMessage: `This is a last message Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Excepturi culpa, in ullam non adipisci, quidem praesentium soluta corporis omnis et molestiae sunt?
        Cupiditate consectetur sunt est deleniti facere quasi accusantium.`,
      avatar: null,
    },
    {
      username: "username 7",
      lastMessage: "This is a last message",
      avatar: "https://avatars.githubusercontent.com/gywreb",
    },
    {
      username: "username 8",
      lastMessage: `This is a last message Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi culpa, in ullam non adipisci, quidem praesentium soluta corporis omnis et molestiae sunt?
          Cupiditate consectetur sunt est deleniti facere quasi accusantium.`,
      avatar: null,
    },
    {
      username: "username 8",
      lastMessage: `This is a last message Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi culpa, in ullam non adipisci, quidem praesentium soluta corporis omnis et molestiae sunt?
          Cupiditate consectetur sunt est deleniti facere quasi accusantium.`,
      avatar: null,
    },
    {
      username: "username 8",
      lastMessage: `This is a last message Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Excepturi culpa, in ullam non adipisci, quidem praesentium soluta corporis omnis et molestiae sunt?
          Cupiditate consectetur sunt est deleniti facere quasi accusantium.`,
      avatar: null,
    },
  ];
  return (
    <MotionDiv
      // motion="slideLeftIn"
      position="sticky"
      height="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      width="350px"
      alignItems="center"
      justifyContent="space-between"
      bg="gray.50"
    >
      <Flex alignItems="center" pl={4} pr={4} pt={6} pb={6}>
        <InputGroup>
          <Input
            bgColor="gray.200"
            variant="filled"
            id="search"
            type="text"
            placeholder="Search..."
          />
          <InputRightElement mr={1}>
            <Button bgColor="gray.200" onClick={() => {}} boxSize={8}>
              <Icon as={BsSearch} color="teal.500" />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
      <Box height="1.5px" width="100%" bgColor="gray.200" />
      <AppScrollBar mt={4} overflow="scroll" pb={8} maxHeight="85%">
        {conversations.map((conv) => (
          <ConversationItem
            username={conv.username}
            lastMessage={conv.lastMessage}
            avatar={conv.avatar}
            onClick={() => console.log("press")}
          />
        ))}
      </AppScrollBar>
    </MotionDiv>
  );
};

export default Conversation;
