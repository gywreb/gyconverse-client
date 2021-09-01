import { chakra, Flex, Spinner, useToast } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AppLayout from "src/components/AppLayout/AppLayout";
import ChatBox from "src/components/ChatBox/ChatBox";
import ChatHeader from "src/components/ChatHeader/ChatHeader";
import ChatInput from "src/components/ChatInput/ChatInput";
import { FILE_LIMIT_SIZE, MESSAGE_TYPE } from "src/configs/constants";
import { ROUTE_KEY } from "src/configs/routes";
import { Events, SocketService } from "src/services/SocketService";
import {
  loadRoomHistory,
  saveMessage,
  setSocketMessage,
} from "src/store/chat/actions";
import { fileUri } from "src/configs/apiClient";
import ImageViewer from "react-simple-image-viewer";
import moment from "moment";

const Gallery = chakra(ImageViewer, {
  baseStyle: {
    position: "absolute",
    zIndex: "99",
  },
});

const Chat = () => {
  const {
    inCallingFriends,
    inVidCallFriends,
    loadingHistory,
    loadingSendMess,
    currentRoom,
    onlineFriends,
    gallery,
  } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const messageAnchor = useRef(null);
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();
  const [isImgViewOpen, setIsImgViewOpen] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const handleToBottom = () => {
    messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.sendCallFinishMess) {
      if (loadingHistory) return;
      location.state.sendCallFinishMess = false;
      const newMessage = {
        type: MESSAGE_TYPE.VIDEO_CALL,
        room: currentRoom?.singleRoom,
        sender: userInfo._id,
        content: location.state.content,
        timestamps: moment(),
      };
      setTimeout(() => {
        dispatch(saveMessage(newMessage, MESSAGE_TYPE.VIDEO_CALL));
        setTimeout(() => {
          messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }, 500);
    }
  }, [location.state, loadingHistory]);

  useEffect(() => {
    if (location?.state?.isChatInit) {
      let firstFriend = userInfo.friends[0];
      if (firstFriend.singleRoom) dispatch(loadRoomHistory(firstFriend));
      SocketService.client.emit(Events.joinRoom, firstFriend.singleRoom);
    }
    SocketService.client.on(Events.receiveSingleChat, (message) => {
      if (message.room === SocketService.currentSocketRoom?.singleRoom) {
        dispatch(setSocketMessage(message));
        setTimeout(() => {
          messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });
    return () => {
      SocketService.client.off(Events.receiveSingleChat);
      SocketService.client.off(Events.callLeaveUnexpectedReceive);
    };
  }, []);

  const [message, setMessage] = useState("");

  const handleChat = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!message?.trim().length) return null;
    const newMessage = {
      type: MESSAGE_TYPE.TEXT,
      room: currentRoom.singleRoom,
      sender: userInfo._id,
      content: message,
      timestamps: moment(),
    };
    dispatch(saveMessage(newMessage, MESSAGE_TYPE.TEXT));
    setMessage("");
    setTimeout(() => {
      messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.size > FILE_LIMIT_SIZE) {
      toast({
        title: `${file.name} is ${
          file.size / Math.pow(2, 20)
        }, larger than the max file size allowed is 5MB`,
        position: "top",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onerror = () => {
      console.log("error on load image");
    };

    const base64Data = await getBase64(file);

    // handle upload image
    const newMessage = new FormData();
    newMessage.append("type", MESSAGE_TYPE.IMAGE);
    newMessage.append("room", currentRoom.singleRoom);
    newMessage.append("sender", userInfo._id);
    newMessage.append("content", file);
    newMessage.append("timestamps", moment());

    dispatch(
      saveMessage(newMessage, MESSAGE_TYPE.IMAGE, base64Data, messageAnchor)
    );
    setTimeout(() => {
      messageAnchor?.current?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const handleVideoCall = (currentRoom, isOnline, isInCalling, isInVidCall) => {
    if (currentRoom && userInfo) {
      if (!isOnline) {
        toast({
          title: `${currentRoom.username} is offline at the moment, try calling ${currentRoom.username} again later!`,
          position: "top",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      } else if (isInVidCall) {
        toast({
          title: `${currentRoom.username} is in video call with someone, try calling ${currentRoom.username} again later!`,
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else if (isInCalling) {
        toast({
          title: `${currentRoom.username} is calling someone, try calling ${currentRoom.username} again later!`,
          position: "top",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      } else {
        navigator.permissions
          .query({ name: "camera", name: "microphone" })
          .then((permission) => {
            console.log(permission);
            if (permission.state === "denied") {
              toast({
                title: `Please turn on camera and microphone permission on the top of your browser!`,
                position: "top",
                status: "warning",
                duration: 3000,
                isClosable: true,
              });
            } else {
              history.replace({
                pathname: ROUTE_KEY.VideoCall,
                state: { isCallInitiator: true, isVideoCall: true },
              });
            }
          });
      }
    }
  };

  const handleInteractMessage = (message, type) => {
    switch (type) {
      case MESSAGE_TYPE.IMAGE: {
        let index = gallery.findIndex(
          (img) => fileUri(message.content) === img
        );
        setCurrentImgIndex(index);
        setIsImgViewOpen(true);
      }
    }
  };

  const closeImageViewer = () => {
    setCurrentImgIndex(0);
    setIsImgViewOpen(false);
  };

  return (
    <>
      {isImgViewOpen && (
        <Gallery
          src={gallery}
          currentIndex={currentImgIndex}
          disableScroll={false}
          onClose={closeImageViewer}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        />
      )}
      <AppLayout>
        <Flex
          flexDirection="column"
          position="relative"
          width="100%"
          alignItems="center"
          height="100vh"
          pb="70px"
          pt="70px"
          overflowX="hidden"
        >
          <ChatHeader
            isOnline={onlineFriends.includes(currentRoom?._id)}
            isInCalling={inCallingFriends.includes(currentRoom?._id)}
            isInVidCall={inVidCallFriends.includes(currentRoom?._id)}
            avatar={currentRoom?.avatar}
            roomName={currentRoom?.username}
            handleVideoCall={() =>
              handleVideoCall(
                currentRoom,
                onlineFriends.includes(currentRoom?._id),
                inCallingFriends.includes(currentRoom?._id),
                inVidCallFriends.includes(currentRoom?._id)
              )
            }
          />
          {loadingHistory ? (
            <Flex
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              bg="gray.200"
            >
              <Spinner color="teal.500" boxSize={32} thickness="6px" />
            </Flex>
          ) : (
            <ChatBox
              currentRoom={currentRoom}
              authUser={userInfo}
              messageAnchor={messageAnchor}
              handleToBottom={handleToBottom}
              handleInteractMessage={
                loadingSendMess ? () => {} : handleInteractMessage
              }
            />
          )}
          <ChatInput
            onChat={handleChat}
            message={message}
            sendMessage={loadingHistory ? () => {} : handleSendMessage}
            onClickSend={loadingHistory ? () => {} : handleSendMessage}
            handleUploadImage={
              loadingHistory || loadingSendMess ? () => {} : handleUploadImage
            }
          />
        </Flex>
      </AppLayout>
    </>
  );
};

export default Chat;
