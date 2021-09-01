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
import { useSelector } from "react-redux";
import { fileUri } from "src/configs/apiClient";
import { MESSAGE_TYPE } from "src/configs/constants";
import PlaceholderImg from "../../../assets/images/placeholder.jpg";
import { format } from "timeago.js";
import { parseEmojis } from "src/utils/parseEmojis";
import moment from "moment";

const RightMessage = ({
  username,
  content,
  avatar,
  isContinuous,
  type,
  handleInteractMessage,
  timestamps,
}) => {
  const { loadingSendMess } = useSelector((state) => state.chat);

  const renderMessage = (type) => {
    switch (type) {
      case MESSAGE_TYPE.IS_UPLOAD_IMAGE: {
        return (
          <Flex
            width="300px"
            position="relative"
            alignItems="center"
            justifyContent="center"
          >
            <AspectRatio width="100%" ratio={4 / 3}>
              <Image
                src={content}
                width="100%"
                objectFit="cover"
                borderRadius="14px"
                borderTopRightRadius={isContinuous ? "14px" : 0}
                fallback={
                  <Progress
                    colorScheme="whiteAlpha"
                    size="xs"
                    isIndeterminate
                  />
                }
                fallbackSrc={PlaceholderImg}
                opacity={0.5}
                bgColor="white"
              />
            </AspectRatio>
            <Progress
              position="absolute"
              width="100%"
              height="100%"
              opacity={0.5}
              colorScheme="teal"
              size="xs"
              isIndeterminate
            />
          </Flex>
        );
      }
      case MESSAGE_TYPE.IMAGE: {
        return (
          <AspectRatio width="300px" ratio={4 / 3}>
            <Image
              src={fileUri(content)}
              width="100%"
              objectFit="cover"
              borderRadius="14px"
              borderTopRightRadius={isContinuous ? "14px" : 0}
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
            <Flex
              mr={4}
              boxSize={10}
              bgColor="teal.400"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
            >
              <Icon as={IoMdCall} color="white" boxSize={6} />
            </Flex>
            <Flex flexDirection="column">
              <Text
                maxWidth="100%"
                textAlign="right"
                color="white"
                fontWeight="bold"
              >
                Video Call
              </Text>
              <Text
                maxWidth="100%"
                textAlign="right"
                color="white"
                fontSize="sm"
              >
                {format(content) || ``}
              </Text>
            </Flex>
          </>
        );
      }
      default: {
        return (
          <Text maxWidth="100%" textAlign="right" color="white">
            {parseEmojis(content) || content || ``}
          </Text>
        );
      }
    }
  };
  return (
    <Flex justifyContent="flex-end" width="100%">
      <Flex
        width="75%"
        alignSelf="flex-end"
        justifyContent="flex-end"
        pt={isContinuous ? 0.5 : 4}
        pb={0.5}
        pl={6}
      >
        <Flex flexDirection="column" maxWidth="90%">
          {!isContinuous && (
            <Text textAlign="right" fontSize="xs" color="gray.500" mr={1}>
              {moment(timestamps).format("DD/MM - h:mm A")}
            </Text>
          )}
          <Flex
            justifyContent="flex-end"
            p={
              type === MESSAGE_TYPE.TEXT || type === MESSAGE_TYPE.VIDEO_CALL
                ? 4
                : 0
            }
            borderRadius="14px"
            borderTopRightRadius={isContinuous ? "14px" : 0}
            bgColor={
              type === MESSAGE_TYPE.TEXT || type === MESSAGE_TYPE.VIDEO_CALL
                ? "teal.500"
                : "white"
            }
            boxShadow="lg"
            cursor={type !== MESSAGE_TYPE.TEXT ? "pointer" : null}
            onClick={handleInteractMessage}
          >
            {renderMessage(type)}
          </Flex>
        </Flex>
        <Flex maxWidth="10%" ml={2}>
          <Avatar
            alignSelf="flex-start"
            size="md"
            src={
              avatar
                ? fileUri(avatar)
                : `https://avatars.dicebear.com/api/gridy/${username}.svg`
            }
            padding="2px"
            //bgColor={avatar ? "white" : "teal"}
            boxShadow="lg"
            opacity={isContinuous ? 0 : 1}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RightMessage;
