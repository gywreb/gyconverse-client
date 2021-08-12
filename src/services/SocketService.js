import { io } from "socket.io-client";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://139.180.196.41:8686";

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
};

export class SocketService {
  static client = null;
  static currentSocketRoom = null;
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
}
