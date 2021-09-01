import {
  AspectRatio,
  Avatar,
  Flex,
  Icon,
  Image,
  Progress,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoMdCall } from "react-icons/io";
import { fileUri } from "src/configs/apiClient";
import { MESSAGE_TYPE } from "src/configs/constants";
import PlaceholderImg from "../../../assets/images/placeholder.jpg";
import { format } from "timeago.js";
import { parseEmojis } from "src/utils/parseEmojis";
import moment from "moment";

const LeftMessage = ({
  username,
  content,
  avatar,
  type,
  isContinuous,
  handleInteractMessage,
  timestamps,
}) => {
  const renderMessage = (type) => {
    switch (type) {
      case MESSAGE_TYPE.IMAGE: {
        return (
          <AspectRatio width="300px" ratio={4 / 3}>
            <Image
              src={fileUri(content)}
              width="100%"
              objectFit="cover"
              borderRadius="14px"
              borderTopLeftRadius={isContinuous ? "14px" : 0}
              fallback={
                <Progress colorScheme="whiteAlpha" size="xs" isIndeterminate />
              }
              fallbackSrc={PlaceholderImg}
            />
          </AspectRatio>
        );
      }
      case MESSAGE_TYPE.VIDEO_CALL: {
        return (
          <>
            <Flex flexDirection="column">
              <Text maxWidth="100%" textAlign="left" fontWeight="bold">
                Video Call
              </Text>
              <Text
                maxWidth="100%"
                textAlign="left"
                color="gray.500"
                fontSize="sm"
              >
                {format(content) || ``}
              </Text>
            </Flex>
            <Flex
              ml={4}
              boxSize={10}
              bgColor="gray.400"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <Icon as={IoMdCall} color="white" boxSize={6} />
            </Flex>
          </>
        );
      }
      default: {
        return (
          <Text maxWidth="100%" textAlign="left">
            {parseEmojis(content) || content || ``}
          </Text>
        );
      }
    }
  };
  return (
    <Flex justifyContent="flex-start" width="100%">
      <Flex
        width="75%"
        alignSelf="flex-start"
        justifyContent="flex-start"
        pt={isContinuous ? 0.5 : 4}
        pb={0.5}
        pr={6}
      >
        <Flex maxWidth="10%" mr={2}>
          <Avatar
            alignSelf="flex-start"
            size="md"
            src={
              avatar
                ? avatar
                : `https://avatars.dicebear.com/api/gridy/${username}.svg`
            }
            padding="2px"
            bgColor={avatar ? "white" : "none"}
            boxShadow="lg"
            opacity={isContinuous ? 0 : 1}
          />
        </Flex>
        <Flex maxWidth="90%" flexDirection="column">
          {!isContinuous && (
            <Text textAlign="left" fontSize="xs" color="gray.500" ml={1}>
              {moment(timestamps).format("DD/MM - h:mm A")}
            </Text>
          )}
          <Flex
            cursor={type !== MESSAGE_TYPE.TEXT ? "pointer" : null}
            onClick={handleInteractMessage}
            p={
              type === MESSAGE_TYPE.TEXT || type === MESSAGE_TYPE.VIDEO_CALL
                ? 4
                : 0
            }
            borderRadius="14px"
            borderTopLeftRadius={isContinuous ? "14px" : 0}
            bgColor="gray.50"
            boxShadow="lg"
            alignItems="center"
          >
            {renderMessage(type)}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LeftMessage;
