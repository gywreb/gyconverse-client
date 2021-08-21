import React from "react";
import { io } from "socket.io-client";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://gyconverse-server.xyz";

export const Events = {
  connection: "connection",
  login: "login",
  getOnlineUsers: "getOnlineUsers",
  disconnect: "disconnect",
  singleRoomChat: "singleRoomChat",
  receiveSingleChat: "receiveSingleChat",
  singleRoomsInfo: "singleRoomsInfo",
  joinRoom: "joinRoom",
  leaveRoom: "leaveRoom",
  sendFriendRequest: "sendFriendRequest",
  receiveFriendRequest: "receiveFriendRequest",
  acceptFriendRequest: "acceptFriendRequest",
  alertAcceptFriendRequest: "alertAcceptFriendRequest",
  sendChatInvite: "sendChatInvite",
  receiveChatInvite: "receiveChatInvite",
  sendCall: "sendCall",
  receiveCall: "receiveCall",
  acceptCall: "acceptCall",
  answerCall: "answerCall",
  denyCall: "denyCall",
  denyCallReceive: "denyCallReceive",
  leaveCall: "leaveCall",
  leaveCallReceive: "leaveCallReceive",
  cancelCall: "cancelCall",
  cancelCallReceive: "cancelCallReceive",
  getInCallingUsers: "getInCallingUsers",
  getInVidCallUsers: "getInVidCallUsers",
  logout: "logout",
};

export class SocketService {
  static client = null;
  static currentSocketRoom = null;
  static authVideo = React.createRef(null);
  static authVideoStream = null;
  static userVideoStream = null;
  static authPeer = null;
  static userPeer = null;
  static isInitFREvents = false;

  static clientInit() {
    SocketService.client = io(baseURL);
  }
  static disconnect() {
    SocketService.client.emit(Events.disconnect);
  }
  static login(chatUser) {
    SocketService.client.emit(Events.login, chatUser);
  }
  static leaveRoom() {
    SocketService.client.emit(Events.leaveRoom);
  }
  static removeAllListeners() {
    SocketService.client.removeAllListeners();
  }

  static setAuthVideoStream(stream, authVideoRef) {
    SocketService.authVideo = authVideoRef;
    SocketService.authVideoStream = stream;
  }
}
