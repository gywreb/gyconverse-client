import { useOverflowScrollPosition } from "@byteclaw/use-overflow-scroll-position";
import { Box, chakra, Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import AppScrollBar from "../AppScrollBar/AppScrollBar";
import ChatToBottomBtn from "../ChatToBottomBtn/ChatToBottomBtn";
import LeftMessage from "../Message/LeftMessage/LeftMessage";
import RightMessage from "../Message/RightMessage/RightMessage";

const MessageAnchor = chakra("div", {
  // attach style props
  baseStyle: {
    width: "100%",
  },
});

const MessageTop = chakra("div", {
  // attach style props
  baseStyle: {
    width: "100%",
  },
});

const ChatBox = ({ messages }) => {
  const topMessage = useRef(null);
  const messageAnchor = useRef(null);
  const chatBox = useRef(null);
  const [scrollPosition, scrollHeight] = useOverflowScrollPosition(chatBox);
  const [toBottomVisible, setToBottomVisible] = useState(false);

  useEffect(() => {
    if (scrollPosition < scrollHeight * 0.8) {
      setToBottomVisible(true);
    } else if (scrollPosition >= scrollHeight * 0.8) {
      setToBottomVisible(false);
    }
  }, [scrollPosition]);

  useEffect(() => {
    messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleToBottom = () => {
    messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Flex
      flexDirection="column"
      overflowX="hidden"
      bg="gray.200"
      justifyContent="flex-end"
      height="100%"
    >
      <Box
        p={4}
        width="100%"
        ref={chatBox}
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
        {messages.map((message, index) =>
          message.owner ? (
            <RightMessage content={message.content} avatar={message.avatar} />
          ) : (
            <LeftMessage content={message.content} avatar={message.avatar} />
          )
        )}
        <MessageAnchor ref={messageAnchor} />
      </Box>
      {toBottomVisible && <ChatToBottomBtn onClick={handleToBottom} />}
    </Flex>
  );
};

export default ChatBox;