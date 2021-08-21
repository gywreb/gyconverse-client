import { useOverflowScrollPosition } from "@byteclaw/use-overflow-scroll-position";
import { chakra, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ChatToBottomBtn from "../ChatToBottomBtn/ChatToBottomBtn";
import LeftMessage from "../Message/LeftMessage/LeftMessage";
import RightMessage from "../Message/RightMessage/RightMessage";
import MotionDiv from "../MotionDiv/MotionDiv";

const MessageAnchor = chakra("div", {
  // attach style props
  baseStyle: {
    width: "100%",
    display: "flex",
    boxSize: 4,
  },
});

const MessageTop = chakra("div", {
  // attach style props
  baseStyle: {
    width: "100%",
  },
});

const ChatBox = ({
  authUser,
  messageAnchor,
  handleToBottom,
  handleInteractMessage,
}) => {
  const topMessage = useRef(null);
  const chatBox = useRef(null);
  const [scrollPosition, scrollHeight] = useOverflowScrollPosition(chatBox);
  const [toBottomVisible, setToBottomVisible] = useState(false);
  let currentRenderSender = null;
  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    if (scrollPosition < scrollHeight * 0.8) {
      setToBottomVisible(true);
    } else if (scrollPosition >= scrollHeight * 0.8) {
      setToBottomVisible(false);
    }
  }, [scrollPosition]);

  useEffect(() => {
    messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Flex
      flexDirection="column"
      overflowX="hidden"
      bg="gray.200"
      justifyContent="flex-end"
      width="100%"
      height="100%"
    >
      <MotionDiv
        motion="fadeIn"
        duration={0.5}
        pt={4}
        pl={4}
        pr={4}
        width="100%"
        innerRef={chatBox}
        overflowY="scroll"
        css={{
          "&:hover": {
            "&::-webkit-scrollbar": {
              visibility: "visible",
            },
            "&::-webkit-scrollbar-track": {
              visibility: "visible",
            },
            "&::-webkit-scrollbar-thumb": {
              visibility: "visible",
            },
          },
          "&::-webkit-scrollbar": {
            width: "8px",
            visibility: "hidden",
          },
          "&::-webkit-scrollbar-track": {
            width: "10px",
            visibility: "hidden",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#A0AEC0",
            borderRadius: "24px",
            visibility: "hidden",
          },
        }}
      >
        <MessageTop ref={topMessage} />
        {messages?.slice(0, 25).map((message, index) => {
          if (index === 0) {
            currentRenderSender = message.sender;
            return authUser._id === message.sender ? (
              <RightMessage
                key={index}
                type={message.type}
                content={message.content}
                avatar={
                  message.avatar ||
                  "https://avatars.githubusercontent.com/gywreb"
                }
                handleInteractMessage={() =>
                  handleInteractMessage(message, message.type)
                }
              />
            ) : (
              <LeftMessage
                key={index}
                type={message.type}
                content={message.content}
                avatar={message.avatar}
                handleInteractMessage={() =>
                  handleInteractMessage(message, message.type)
                }
              />
            );
          } else {
            if (message.sender === currentRenderSender) {
              return authUser._id === message.sender ? (
                <RightMessage
                  key={index}
                  type={message.type}
                  content={message.content}
                  avatar={
                    message.avatar ||
                    "https://avatars.githubusercontent.com/gywreb"
                  }
                  isContinuous
                  handleInteractMessage={() =>
                    handleInteractMessage(message, message.type)
                  }
                />
              ) : (
                <LeftMessage
                  key={index}
                  type={message.type}
                  content={message.content}
                  avatar={message.avatar}
                  isContinuous
                  handleInteractMessage={() =>
                    handleInteractMessage(message, message.type)
                  }
                />
              );
            } else {
              currentRenderSender = message.sender;
              return authUser._id === message.sender ? (
                <RightMessage
                  key={index}
                  type={message.type}
                  content={message.content}
                  avatar={
                    message.avatar ||
                    "https://avatars.githubusercontent.com/gywreb"
                  }
                  handleInteractMessage={() =>
                    handleInteractMessage(message, message.type)
                  }
                />
              ) : (
                <LeftMessage
                  key={index}
                  type={message.type}
                  content={message.content}
                  avatar={message.avatar}
                  handleInteractMessage={() =>
                    handleInteractMessage(message, message.type)
                  }
                />
              );
            }
          }
        })}
        <MessageAnchor ref={messageAnchor} />
      </MotionDiv>
      {toBottomVisible && <ChatToBottomBtn onClick={handleToBottom} />}
    </Flex>
  );
};

export default ChatBox;
