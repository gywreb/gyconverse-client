import { chakra, Flex, Icon, useToast } from "@chakra-ui/react";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ThreeDotsWave from "src/components/ThreeDotWave/ThreeDotWave";
import VideoCallControl from "src/components/VideoCallControl/VideoCallControl";
import { ROUTE_KEY } from "src/configs/routes";
import { Events, SocketService } from "src/services/SocketService";
import { loadRoomHistory } from "src/store/chat/actions";
import AuthWebcam from "src/components/AuthWebcam/AuthWebcam";
import { useState } from "react";
import VideoCallHeader from "src/components/VIdeoCallHeader/VideoCallHeader";
import Peer from "simple-peer";
import { AUDIO_TYPE } from "src/configs/constants";
import { useStopwatch } from "react-timer-hook";
import { timerFormat } from "src/utils/timerFormat";

const Video = chakra("video", {
  baseStyle: {
    minWidth: "100%",
    minHeight: "100%",
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
  const [audioInputs, setAudioInputs] = useState([]);
  const [audioOutputs, setAudioOutputs] = useState([]);

  const { seconds, minutes, hours, start } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    const {
      callerSignal,
      inviteSignal,
      isInCall: isVidCall,
      isCallInitiator,
    } = location.state;

    SocketService.currentSocketRoom = currentRoom;
    SocketService.userInfo = userInfo;

    if (!isCallInitiator) {
      navigator.permissions
        .query({ name: "camera", name: "microphone" })
        .then((permission) => {
          if (permission.state === "denied") {
            toast({
              title: `Please turn on camera and microphone permission on the top of your browser!`,
              position: "top",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
            handleLeaveCall();
            SocketService.client.emit(Events.callLeaveUnexpected, {
              user: currentRoom,
              reason: `${userInfo.username} camera and microphone permission is denied!`,
            });
          }
        });
    }

    navigator.mediaDevices
      .enumerateDevices()
      .then(handleGetDevices)
      .catch((err) => console.log(err));

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
        return navigator.mediaDevices.enumerateDevices();
      })
      .then(handleGetDevices)
      .catch((err) => {
        if (!isInCall) {
          handleHangUp();
        } else {
          handleLeaveCall();
        }
        console.log(err);
      });

    SocketService.client.on(Events.callLeaveUnexpectedReceive, (signal) => {
      toast({
        title: signal.reason,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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
        sendCallFinishMess:
          location.state?.isCallInitiator || signal.isCloseTab ? true : false,
        content: signal.content,
      });
    });
    return () => {
      SocketService.client.off(Events.acceptCall);
      SocketService.client.off(Events.denyCallReceive);
      SocketService.client.off(Events.leaveCallReceive);
      location.state = undefined;
      setAudioInputs([]);
      setAudioOutputs([]);
    };
  }, []);

  const handleHangUp = () => {
    if (SocketService.authVideoStream) {
      SocketService.authVideoStream.getTracks().map((track) => track.stop());
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
    const content = Date.now();
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

  const handleGetDevices = (devices) => {
    let inputDevices = [];
    let outputDevices = [];
    devices.map((device, index) => {
      if (device.kind === "audioinput") {
        if (
          device.deviceId.length !== 0 &&
          device.deviceId !== "default" &&
          !inputDevices.find((input) => input.deviceId === device.deviceId)
        )
          inputDevices.push(device);
      } else if (device.kind === "audiooutput") {
        if (
          device.deviceId.length !== 0 &&
          device.deviceId !== "default" &&
          !outputDevices.find((output) => output.deviceId === device.deviceId)
        )
          outputDevices.push(device);
      }
    });
    setAudioInputs([...inputDevices]);
    setAudioOutputs([...outputDevices]);
  };

  const handleChangeAudioDevice = (e, type) => {
    switch (type) {
      case AUDIO_TYPE.INPUT: {
        handleSwitchInputAudio(e.target.value);
        break;
      }
      case AUDIO_TYPE.OUTPUT: {
        handleSwitchOutputAudio(e.target.value);
        break;
      }
      default:
        break;
    }
  };

  const handleSwitchOutputAudio = (deviceId) => {
    if (authVideoRef.current !== "undefined") {
      authVideoRef.current
        .setSinkId(deviceId)
        .then(() => {
          console.log("switch success");
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Error");
    }
  };

  const handleSwitchInputAudio = (deviceId) => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: { deviceId: deviceId ? { exact: deviceId } : "undefined" },
      })
      .then((stream) => {
        authVideoRef.current.srcObject = stream;
        SocketService.setAuthVideoStream(stream, authVideoRef);
        connectionRef.current.replaceTrack &&
          connectionRef.current.replaceTrack(
            connectionRef.current.streams[0].getAudioTracks()[0],
            stream.getAudioTracks()[0],
            connectionRef.current.streams[0]
          );
        return navigator.mediaDevices.enumerateDevices();
      })
      .then(handleGetDevices)
      .catch((err) => console.log(err));
  };

  return (
    <Flex
      flexDirection="column"
      position="relative"
      width="100%"
      alignItems="center"
      height="100vh"
      overflowX="hidden"
      overflowY="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
        bg="gray.900"
        flexDirection="column"
        overflowY="hidden"
        // pb={20}
      >
        <VideoCallHeader
          avatar={currentRoom?.avatar}
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
        <Video
          playsInline
          ref={userVideoRef}
          autoPlay
          position="absolute"
          overflowY="hidden"
        />
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
        audioInputs={audioInputs}
        audioOutputs={audioOutputs}
        handleChangeAudioDevice={handleChangeAudioDevice}
      />
    </Flex>
  );
};

export default VideoCall;
