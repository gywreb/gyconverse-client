import { chakra, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AppLayout from "src/components/AppLayout/AppLayout";
import ThreeDotsWave from "src/components/ThreeDotWave/ThreeDotWave";
import VideoCallControl from "src/components/VideoCallControl/VideoCallControl";
import { ROUTE_KEY } from "src/configs/routes";
import { Events, SocketService } from "src/services/SocketService";
import { loadRoomHistory, saveMessage } from "src/store/chat/actions";
import AuthWebcam from "src/components/AuthWebcam/AuthWebcam";
import { useState } from "react";
import VideoCallHeader from "src/components/VIdeoCallHeader/VideoCallHeader";
import Peer from "simple-peer";
import { MESSAGE_TYPE } from "src/configs/constants";
import { useStopwatch } from "react-timer-hook";
import moment from "moment";
import { timerFormat } from "src/utils/timerFormat";

const Video = chakra("video", {
  baseStyle: {
    minWidth: "100%",
  },
});

const VideoCall = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentRoom } = useSelector((state) => state.chat);
  const { userInfo } = useSelector((state) => state.auth);
  const authVideoRef = useRef();
  const userVideoRef = useRef();
  const connectionRef = useRef();
  const [isVideoMute, setIsVideoMute] = useState(false);
  const [isMicMute, setIsMicMute] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const location = useLocation();
  const toast = useToast();
  const [time, setTime] = useState("");

  const { seconds, minutes, hours, start } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    const {
      callerSignal,
      inviteSignal,
      isInCall: isVidCall,
      isVideoCall,
    } = location.state;
    if (!isVideoCall) {
      history.replace(ROUTE_KEY.Home);
    }
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (authVideoRef.current) {
          authVideoRef.current.srcObject = stream;
          SocketService.setAuthVideoStream(stream, authVideoRef);
        }
        if (location.state?.isInCall && location.state?.callerSignal) {
          setIsInCall(isVidCall);
          start();
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
          });

          peer.on("signal", (signal) => {
            SocketService.client.emit(Events.answerCall, {
              toSignal: signal,
              toUser: inviteSignal.from,
              ansUser: userInfo,
            });
          });

          peer.on("stream", (targetStream) => {
            SocketService.userVideoStream = targetStream;
            userVideoRef.current.srcObject = targetStream;
          });

          peer.signal(callerSignal);

          connectionRef.current = peer;
        } else {
          //=====================
          // initiate the call for target user
          const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
          });
          // fired peer signal anh handle send to target by socket.io
          peer.on("signal", (signal) => {
            SocketService.client.emit(Events.sendCall, {
              to: currentRoom,
              from: userInfo,
              fromSignal: signal,
            });
          });

          //receive media stream from target
          peer.on("stream", (targetStream) => {
            SocketService.userVideoStream = targetStream;
            userVideoRef.current.srcObject = targetStream;
          });

          //establish video connection when target accept call
          SocketService.client.on(Events.acceptCall, (signal) => {
            setIsInCall(true);
            start();
            peer.signal(signal.toSignal);
          });

          connectionRef.current = peer;
        }
      });

    SocketService.client.on(Events.denyCallReceive, (signal) => {
      handleHangUp();
      toast({
        title: `${signal?.to?.username} denied your call :(`,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });

    SocketService.client.on(Events.leaveCallReceive, (signal) => {
      if (SocketService.authVideoStream) {
        SocketService.authVideoStream.getAudioTracks()[0].stop();
        SocketService.authVideoStream.getVideoTracks()[0].stop();
      }
      setIsInCall(false);
      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
      if (!location.state?.isCallInitiator) {
        SocketService.leaveRoom();
        SocketService.client.emit(Events.joinRoom, currentRoom.singleRoom);
      }
      dispatch(loadRoomHistory(currentRoom));
      history.replace(ROUTE_KEY.Chat, {
        sendCallFinishMess: location.state?.isCallInitiator ? true : false,
        content: signal.content,
      });
    });

    return () => {
      SocketService.client.off(Events.acceptCall);
      SocketService.client.off(Events.denyCallReceive);
      SocketService.client.off(Events.leaveCallReceive);
      location.state = undefined;
    };
  }, []);

  const handleHangUp = () => {
    if (SocketService.authVideoStream) {
      SocketService.authVideoStream.getAudioTracks()[0].stop();
      SocketService.authVideoStream.getVideoTracks()[0].stop();
    }
    if (currentRoom && userInfo)
      SocketService.client.emit(Events.cancelCall, {
        to: currentRoom,
        from: userInfo,
      });
    SocketService.leaveRoom();
    SocketService.client.emit(Events.joinRoom, currentRoom.singleRoom);
    dispatch(loadRoomHistory(currentRoom));
    history.replace(ROUTE_KEY.Chat);
  };

  const handleLeaveCall = () => {
    const content = timerFormat(hours, minutes, seconds);
    if (SocketService.authVideoStream) {
      SocketService.authVideoStream.getAudioTracks()[0].stop();
      SocketService.authVideoStream.getVideoTracks()[0].stop();
    }
    setIsInCall(false);
    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
    if (currentRoom && userInfo) {
      SocketService.client.emit(Events.leaveCall, {
        to: currentRoom,
        from: userInfo,
        content,
      });
    }
    if (!location.state?.isCallInitiator) {
      SocketService.leaveRoom();
      SocketService.client.emit(Events.joinRoom, currentRoom.singleRoom);
    }
    dispatch(loadRoomHistory(currentRoom));
    history.replace(ROUTE_KEY.Chat, {
      sendCallFinishMess: location.state?.isCallInitiator ? true : false,
      content,
    });
  };

  const handleControlWebcam = () => {
    if (SocketService.authVideoStream?.getVideoTracks().length) {
      SocketService.authVideoStream.getVideoTracks()[0].enabled = isVideoMute;
      setIsVideoMute((prev) => !prev);
    }
  };

  const handleControlMic = () => {
    if (SocketService.authVideoStream?.getAudioTracks().length) {
      SocketService.authVideoStream.getAudioTracks()[0].enabled = isMicMute;
      setIsMicMute((prev) => !prev);
    }
  };

  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="100%"
      alignItems="center"
      height="100vh"
      overflowX="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        bg="gray.900"
        flexDirection="column"
        // pb={20}
      >
        <VideoCallHeader
          username={currentRoom?.username}
          isInCall={isInCall}
          isVideoMute={isVideoMute}
          seconds={seconds}
          minutes={minutes}
          hours={hours}
        />
        {!isInCall &&
          !location.state?.isInCall &&
          !location.state?.callerSignal && (
            <>
              <Icon as={GoPerson} color="white" boxSize={80} />
              <ThreeDotsWave />
            </>
          )}
        <Video playsInline ref={userVideoRef} autoPlay position="absolute" />
      </Flex>
      <AuthWebcam
        videoRef={authVideoRef}
        isVideoMute={isVideoMute}
        isMicMute={isMicMute}
      />
      <VideoCallControl
        handleHangUp={isInCall ? handleLeaveCall : handleHangUp}
        handleControlWebcam={() => handleControlWebcam()}
        handleControlMic={() => handleControlMic()}
        isVideoMute={isVideoMute}
        isMicMute={isMicMute}
      />
    </Flex>
  );
};

export default VideoCall;
