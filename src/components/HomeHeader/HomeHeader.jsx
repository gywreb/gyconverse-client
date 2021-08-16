import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import {
  BsFillInfoCircleFill,
  BsFillPeopleFill,
  BsSearch,
} from "react-icons/bs";
import { ImDrawer2 } from "react-icons/im";
import { IoMdNotifications, IoMdVideocam } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { appColor } from "src/configs/styles";
import { Events, SocketService } from "src/services/SocketService";
import {
  acceptFriendRequest,
  updateFriendList,
  updateFriendRequests,
} from "src/store/auth/actions";
import { updatePeopleList } from "src/store/user/actions";
import AppScrollBar from "../AppScrollBar/AppScrollBar";
import FriendRequestItem from "../FriendRequestItem/FriendRequestItem";

const HomeHeader = () => {
  const { userInfo, afrLoading, acceptingId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    SocketService.client.on(Events.receiveFriendRequest, (request) => {
      dispatch(updateFriendRequests(request));
      toast({
        title: `You received a friend request from ${request.username}`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
    SocketService.client.on(Events.alertAcceptFriendRequest, (request) => {
      dispatch(updateFriendList(request));
      dispatch(updatePeopleList(request));
      toast({
        title: `${request.username} accepted your friend request!`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    });
  }, []);

  const handleConfirmRequest = (request) => {
    dispatch(acceptFriendRequest(userInfo, request, toast));
  };

  return (
    <Box width="100%">
      <Flex
        boxShadow="rgba(0, 0, 0, 0.45) 0px 10px 20px -20px"
        width="100%"
        position="absolute"
        height="70px"
        top="0"
        bgColor="gray.50"
        zIndex="99"
        borderLeftWidth="2px"
        borderColor="gray.200"
        paddingRight="1%"
        paddingLeft="1%"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" maxWidth="50%">
          <Flex
            alignItems="center"
            justifyContent="center"
            bg="teal.500"
            borderRadius="50%"
            boxSize={14}
          >
            <Icon
              as={BsFillPeopleFill}
              color="white"
              boxSize={10}
              padding={1}
            />
          </Flex>

          <Box maxWidth="70%" ml={2}>
            <Text isTruncated fontSize="xl" color="teal.500">
              People
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center" flex={1} pl={4} pr={4}>
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
        <Flex alignItems="center" flexWrap="wrap">
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <IconButton
                borderRadius="50%"
                bg="gray.200"
                position="relative"
                fontSize="12px"
                fontWeight="bold"
                color="white"
                icon={
                  <Icon as={IoMdNotifications} color="teal.500" boxSize={8} />
                }
                boxSize={12}
                _after={
                  userInfo.friendRequests?.length
                    ? {
                        content: `'${userInfo.friendRequests?.length}'`,
                        position: "absolute",
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        top: "0",
                        left: "65%",
                        backgroundColor: "pink.500",
                        borderWidth: "1px",
                        borderColor: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }
                    : null
                }
              />
            </PopoverTrigger>
            <PopoverContent width="55vh" maxHeight="80vh" mr={2}>
              {/* <PopoverArrow /> */}
              <PopoverHeader>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text fontSize="xl" color="teal.500" fontWeight="bold">
                    {` Friend Requests (${userInfo.friendRequests?.length})`}
                  </Text>
                  <PopoverCloseButton boxSize={10} fontSize="md" />
                </Flex>
              </PopoverHeader>
              <PopoverBody
                p={0}
                mr={-2}
                overflowX="hidden"
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
                {userInfo.friendRequests && userInfo.friendRequests.length ? (
                  userInfo.friendRequests.map((request) => (
                    <FriendRequestItem
                      username={request.username}
                      avatar={request.username}
                      isAccepting={afrLoading && request.id === acceptingId}
                      handleConfirmRequest={() => handleConfirmRequest(request)}
                    />
                  ))
                ) : (
                  <Flex p={8} alignItems="center" justifyContent="center">
                    <Icon as={ImDrawer2} color="gray.400" pr={2} boxSize={12} />
                    <Text fontSize="lg" color="gray.400" pt={2}>
                      Empty Request
                    </Text>
                  </Flex>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HomeHeader;
