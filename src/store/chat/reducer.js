import {
  LOAD_ROOM_HISTORY,
  LOAD_ROOM_HISTORY_FAILURE,
  LOAD_ROOM_HISTORY_REQUEST,
  SAVE_MESSAGE,
  SAVE_MESSAGE_FAILURE,
  SAVE_MESSAGE_REQUEST,
  SET_ONLINE_FRIENDS,
  SET_SOCKET_MESSAGE,
} from "./actions";

const initialState = {
  messages: [],
  currentRoom: null,
  loadingHistory: false,
  error: null,
  onlineFriends: [],
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
    case SET_SOCKET_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };
    }
    default: {
      return state;
    }
  }
}
