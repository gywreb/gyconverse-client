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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { ROUTE_KEY } from "src/configs/routes";
import { Events, SocketService } from "src/services/SocketService";
import {
  sendChatInvite,
  updateFriendListByChatInvite,
} from "src/store/auth/actions";
import { loadRoomHistory, setOnlineFriends } from "src/store/chat/actions";
import AppScrollBar from "../AppScrollBar/AppScrollBar";
import MotionDiv from "../MotionDiv/MotionDiv";
import ConversationItem from "./ConversationItem/ConversationItem";

const Conversation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { onlineFriends, currentRoom } = useSelector((state) => state.chat);
  const [singleRooms, setSingleRooms] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const toast = useToast();

  const handleGetRoomHistory = async (friend) => {
    SocketService.leaveRoom();
    dispatch(loadRoomHistory(friend));
    SocketService.client.emit(Events.joinRoom, friend.singleRoom);
    history.push(ROUTE_KEY.Chat);
  };

  useEffect(() => {
    SocketService.client.on(Events.receiveChatInvite, (invite) => {
      dispatch(updateFriendListByChatInvite(invite));
    });
    SocketService.client.on(Events.getOnlineUsers, (onlineUsers) => {
      dispatch(setOnlineFriends(onlineUsers));
    });
    SocketService.client.on(Events.singleRoomsInfo, (singleRooms) => {
      setSingleRooms(singleRooms);
    });
  }, []);

  const handleSendChatInvite = (friend) => {
    let room = {
      roomName: `${userInfo.username}-${friend.username}`,
      members: [userInfo._id, friend._id],
    };
    dispatch(sendChatInvite(userInfo, friend, room, toast, history));
  };

  return (
    <MotionDiv
      // motion="slideLeftIn"
      position="sticky"
      height="100vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      width="33%"
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
        {userInfo.friends.map((friend, index) => {
          return (
            <ConversationItem
              key={index}
              username={friend.username}
              lastMessage={
                (singleRooms.length ? singleRooms : userInfo.rooms).find(
                  (room) => room._id === friend.singleRoom
                )?.lastMessage
              }
              avatar={friend.avatar}
              talked={friend.talked}
              singleRoom={friend.singleRoom}
              onClick={() => handleGetRoomHistory(friend)}
              isOnline={onlineFriends.includes(friend._id)}
              handleSendChatInvite={() => handleSendChatInvite(friend)}
              isChatting={
                friend.singleRoom === currentRoom?.singleRoom &&
                location.pathname === ROUTE_KEY.Chat
              }
            />
          );
        })}
      </AppScrollBar>
    </MotionDiv>
  );
};

export default Conversation;
