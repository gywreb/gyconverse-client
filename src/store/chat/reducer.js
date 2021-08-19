import {
  LOAD_ROOM_HISTORY,
  LOAD_ROOM_HISTORY_FAILURE,
  LOAD_ROOM_HISTORY_REQUEST,
  SAVE_MESSAGE,
  SAVE_MESSAGE_FAILURE,
  SAVE_MESSAGE_REQUEST,
  SET_BACK_PREV_ROOM,
  SET_CURRENT_ROOM,
  SET_INCALLING_FRIENDS,
  SET_INVIDEOCALL_FRIENDS,
  SET_ONLINE_FRIENDS,
  SET_SOCKET_MESSAGE,
} from "./actions";

const initialState = {
  messages: [],
  currentRoom: null,
  prevRoom: null,
  loadingHistory: false,
  error: null,
  onlineFriends: [],
  inCallingFriends: [],
  inVidCallFriends: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROOM_HISTORY_REQUEST: {
      return { ...state, loadingHistory: true };
    }
    case LOAD_ROOM_HISTORY: {
      return {
        ...state,
        loadingHistory: false,
        messages: action.payload.messages,
        currentRoom: action.payload.currentRoom,
        error: null,
      };
    }
    case LOAD_ROOM_HISTORY_FAILURE: {
      return {
        ...state,
        loadingHistory: false,
        messages: [],
        currentRoom: null,
        error: action.payload.error,
      };
    }
    case SAVE_MESSAGE_REQUEST: {
      return { ...state };
    }
    case SAVE_MESSAGE: {
      return {
        ...state,
        error: null,
        messages: [...state.messages, action.payload.message],
      };
    }
    case SAVE_MESSAGE_FAILURE: {
      return { ...state, error: action.payload.error };
    }
    case SET_ONLINE_FRIENDS: {
      return { ...state, onlineFriends: action.payload.onlineFriends };
    }
    case SET_INCALLING_FRIENDS: {
      return { ...state, inCallingFriends: action.payload.inCallingFriends };
    }
    case SET_INVIDEOCALL_FRIENDS: {
      return { ...state, inVidCallFriends: action.payload.inVidCallFriends };
    }
    case SET_SOCKET_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    }
    case SET_CURRENT_ROOM: {
      return {
        ...state,
        currentRoom: action.payload.currentRoom,
        prevRoom: action.payload.prevRoom,
      };
    }
    case SET_BACK_PREV_ROOM: {
      return {
        ...state,
        currentRoom: action.payload.prevRoom,
        prevRoom: null,
      };
    }
    default: {
      return state;
    }
  }
}
