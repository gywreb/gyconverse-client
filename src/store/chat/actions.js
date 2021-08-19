import apiClient from "src/configs/apiClient";
import { Events, SocketService } from "src/services/SocketService";

export const LOAD_ROOM_HISTORY = "@CHAT/LOAD_ROOM_HISTORY";
export const LOAD_ROOM_HISTORY_REQUEST = "@CHAT/LOAD_ROOM_HISTORY_REQUEST";
export const LOAD_ROOM_HISTORY_FAILURE = "@CHAT/LOAD_ROOM_HISTORY_FAILURE";
export const SAVE_MESSAGE = "@CHAT/SAVE_MESSAGE";
export const SAVE_MESSAGE_REQUEST = "@CHAT/SAVE_MESSAGE_REQUEST";
export const SAVE_MESSAGE_FAILURE = "@CHAT/SAVE_MESSAGE_FAILURE";
export const SET_ONLINE_FRIENDS = "@CHAT/SET_ONLINE_FRIENDS";
export const SET_SOCKET_MESSAGE = "@CHAT/SET_SOCKET_MESSAGE";
export const SET_CURRENT_ROOM = "@CHAT/SET_CURRENT_ROOM";
export const SET_BACK_PREV_ROOM = "@CHAT/SET_BACK_PREV_ROOM";
export const SET_INCALLING_FRIENDS = "@CHAT/SET_INCALLING_FRIENDS";
export const SET_INVIDEOCALL_FRIENDS = "@CHAT/SET_INVIDEOCALL_FRIENDS";

const LOAD_ROOM_HISTORY_ROUTE = "/message/history";
const SAVE_MESSAGE_ROUTE = "/message/save";

export const setOnlineFriends = (onlineUsers) => (dispatch, getState) => {
  const friends = getState().auth.userInfo?.friends;
  const onlineUsersIdArr = onlineUsers.map((user) => user._id);
  const onlineFriends = friends
    .filter((friend) => onlineUsersIdArr.includes(friend.id))
    .map((friend) => friend._id);
  dispatch({ type: SET_ONLINE_FRIENDS, payload: { onlineFriends } });
};

export const setInCallingFriends = (inCallingUsers) => (dispatch, getState) => {
  const friends = getState().auth.userInfo?.friends;
  const inCallingUsersIdArr = inCallingUsers.map((user) => user._id);
  const inCallingFriends = friends
    .filter((friend) => inCallingUsersIdArr.includes(friend.id))
    .map((friend) => friend._id);
  dispatch({ type: SET_INCALLING_FRIENDS, payload: { inCallingFriends } });
};

export const setInVidCallFriends = (inVidCallUsers) => (dispatch, getState) => {
  const friends = getState().auth.userInfo?.friends;
  const inVidCallUsersIdArr = inVidCallUsers.map((user) => user._id);
  const inVidCallFriends = friends
    .filter((friend) => inVidCallUsersIdArr.includes(friend.id))
    .map((friend) => friend._id);
  dispatch({ type: SET_INVIDEOCALL_FRIENDS, payload: { inVidCallFriends } });
};

export const setSocketMessage = (message) => (dispatch) => {
  dispatch({ type: SET_SOCKET_MESSAGE, payload: { message } });
};

export const saveMessage = (message, resetTimer) => async (dispatch) => {
  dispatch({ type: SAVE_MESSAGE_REQUEST });
  try {
    dispatch({ type: SAVE_MESSAGE, payload: { message } });
    SocketService.client.emit(Events.singleRoomChat, message);
    const {
      data: {
        data: { newMessage },
      },
    } = await apiClient.post(SAVE_MESSAGE_ROUTE, message);
  } catch (error) {
    console.log(error);
    dispatch({ type: SAVE_MESSAGE_FAILURE, payload: { error } });
  }
};

export const loadRoomHistory = (targetRoom) => async (dispatch) => {
  dispatch({ type: LOAD_ROOM_HISTORY_REQUEST });
  try {
    SocketService.currentSocketRoom = targetRoom;
    const {
      data: {
        data: { messages },
      },
    } = await apiClient.get(
      `${LOAD_ROOM_HISTORY_ROUTE}/${targetRoom.singleRoom}`
    );
    const inOrderMessages = messages.reverse();
    dispatch({
      type: LOAD_ROOM_HISTORY,
      payload: {
        messages: inOrderMessages,
        currentRoom: targetRoom,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOAD_ROOM_HISTORY, payload: { error } });
  }
};

export const setCurrentRoom = (selectedFriend, prevRoom) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_ROOM,
    payload: { currentRoom: selectedFriend, prevRoom },
  });
};
export const setBackPrevRoom = (prevRoom) => (dispatch) => {
  dispatch({
    type: SET_BACK_PREV_ROOM,
    payload: { prevRoom },
  });
};
