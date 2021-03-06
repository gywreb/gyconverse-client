import { Box, Flex, Icon, IconButton, Input } from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsImage } from "react-icons/bs";
import { CgAttachment } from "react-icons/cg";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({
  message,
  onChat,
  sendMessage,
  onClickSend,
  handleUploadImage,
}) => {
  const uploadImgRef = useRef();
  return (
    <Box width="100%">
      <Flex
        position="absolute"
        bottom="0"
        bg="gray.50"
        width="100%"
        height="70px"
        alignSelf="flex-end"
        borderWidth="2px"
        borderColor="gray.200"
        //zIndex="99"
        alignItems="center"
        paddingRight="1%"
        paddingLeft="1%"
        justifyContent="space-between"
      >
        <Flex width="100%" alignItems="center" flexWrap="wrap">
          <Flex mr={2}>
            <Flex alignItems="center">
              <Input
                accept="image/*"
                multiple={false}
                onChange={(e) => {
                  handleUploadImage(e);
                }}
                ref={uploadImgRef}
                style={{ display: "none" }}
                type="file"
              />
              <IconButton
                onClick={() => {
                  uploadImgRef.current.click();
                }}
                padding={2}
                bgColor="gray.50"
                icon={<Icon as={BsImage} color="teal.500" boxSize={6} />}
              />
              <IconButton
                padding={2}
                bgColor="gray.50"
                icon={<Icon as={CgAttachment} color="teal.500" boxSize={6} />}
              />
            </Flex>
          </Flex>
          <Flex flexGrow={1}>
            <Input
              id="chat"
              bgColor="gray.200"
              variant="filled"
              placeholder="Type your thougnt here..."
              isFullWidth={true}
              value={message}
              onChange={(e) => onChat(e)}
              onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
              autoComplete="off"
            />
          </Flex>
          <Flex ml={2}>
            <Flex alignItems="center">
              <IconButton
                onClick={onClickSend}
                bgColor="gray.50"
                icon={<Icon as={IoMdSend} color="teal.500" boxSize={8} />}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatInput;
