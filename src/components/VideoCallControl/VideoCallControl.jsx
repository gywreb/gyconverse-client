import {
  Flex,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { ImPhoneHangUp } from "react-icons/im";
import { MdVideocam, MdVideocamOff } from "react-icons/md";
import { AUDIO_TYPE } from "src/configs/constants";

const VideoCallControl = ({
  handleHangUp,
  handleControlWebcam,
  handleControlMic,
  audioInputs,
  audioOutputs,
  isVideoMute,
  isMicMute,
  handleChangeAudioDevice,
}) => {
  return (
    <Flex
      position="absolute"
      bottom="0"
      width="100%"
      height="80px"
      alignSelf="flex-end"
      zIndex="99"
      alignItems="center"
      paddingRight="1%"
      paddingLeft="1%"
      justifyContent="center"
      boxShadow="md"
    >
      <Flex alignItems="center" position="relative" top="-50%">
        <IconButton
          bgColor="trasparent"
          borderRadius="50%"
          boxSize={14}
          opacity={0}
          ml={12}
          boxShadow="md"
        />
        <IconButton
          bgColor="white"
          borderRadius="50%"
          boxSize={14}
          icon={
            <Icon
              as={isMicMute ? FaMicrophoneSlash : FaMicrophone}
              color="gray.900"
              boxSize={6}
            />
          }
          mr={12}
          boxShadow="md"
          onClick={handleControlMic}
        />
        <IconButton
          bgColor="red.500"
          borderRadius="50%"
          boxSize={20}
          icon={<Icon as={ImPhoneHangUp} color="white" boxSize={8} />}
          onClick={handleHangUp}
          boxShadow="md"
        />
        <IconButton
          bgColor="white"
          borderRadius="50%"
          boxSize={14}
          icon={
            <Icon
              as={isVideoMute ? MdVideocamOff : MdVideocam}
              color="gray.900"
              boxSize={6}
            />
          }
          ml={12}
          onClick={handleControlWebcam}
          boxShadow="md"
        />
        <Popover placement="top-start" pb={2}>
          <PopoverTrigger>
            <IconButton
              bgColor="white"
              borderRadius="50%"
              boxSize={14}
              icon={<Icon as={AiFillSound} color="gray.900" boxSize={6} />}
              ml={12}
              onClick={() => {}}
              boxShadow="md"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverCloseButton />
            <PopoverHeader>Audio Settings</PopoverHeader>
            <PopoverBody>
              <Text pb={2} color="teal.500" fontWeight="bold">
                Microphones
              </Text>
              <Select
                variant="filled"
                placeholder={`Default - ${audioInputs[0]?.label}` || "None"}
                defaultValue={audioInputs[0]?.deviceId || null}
                onChange={(e) => handleChangeAudioDevice(e, AUDIO_TYPE.INPUT)}
              >
                {audioInputs.map((device) => (
                  <option value={device.deviceId}>{device.label}</option>
                ))}
              </Select>
              <Text mt={4} pb={2} color="teal.500" fontWeight="bold">
                Speakers
              </Text>
              <Select
                variant="filled"
                placeholder={`Default - ${audioOutputs[0]?.label}` || "None"}
                defaultValue={audioOutputs[0]?.deviceId || null}
                onChange={(e) => handleChangeAudioDevice(e, AUDIO_TYPE.OUTPUT)}
              >
                {audioOutputs.map((device) => (
                  <option value={device.deviceId}>{device.label}</option>
                ))}
              </Select>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default VideoCallControl;
