import { fileUri } from "src/configs/apiClient";
import { MESSAGE_TYPE } from "src/configs/constants";
import {
  LOAD_ROOM_HISTORY,
  LOAD_ROOM_HISTORY_FAILURE,
  LOAD_ROOM_HISTORY_REQUEST,
  SAVE_IMAGE_MESSAGE,
  SAVE_MESSAGE,
  SAVE_MESSAGE_FAILURE,
  SAVE_MESSAGE_REQUEST,
  SET_BACK_PREV_ROOM,
  SET_CURRENT_ROOM,
  SET_INCALLING_FRIENDS,
  SET_INVIDEOCALL_FRIENDS,
  SET_ONLINE_FRIENDS,
  SET_SINGLE_ROOMS,
  SET_SOCKET_MESSAGE,
} from "./actions";

const initialState = {
  messages: [],
  gallery: [],
  currentRoom: null,
  prevRoom: null,
  loadingHistory: false,
  loadingSendMess: false,
  error: null,
  onlineFriends: [],
  inCallingFriends: [],
  inVidCallFriends: [],
  singleRooms: [],
};

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROOM_HISTORY_REQUEST: {
      return { ...state, loadingHistory: true };
    }
    case LOAD_ROOM_HISTORY: {
      const { messages } = action.payload;
      let gallery = messages
        .filter((message) => message.type === MESSAGE_TYPE.IMAGE)
        .map((image) => fileUri(image.content));
      return {
        ...state,
        loadingHistory: false,
        messages,
        gallery,
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
      return { ...state, loadingSendMess: true };
    }
    case SAVE_MESSAGE: {
      const { type, content } = action.payload.message;
      let newGallery =
        type === MESSAGE_TYPE.IMAGE
          ? [...state.gallery, fileUri(content)]
          : [...state.gallery];
      let newMessageList =
        type === MESSAGE_TYPE.IMAGE
          ? state.messages.filter(
              (message) => message.type !== MESSAGE_TYPE.IS_UPLOAD_IMAGE
            )
          : [...state.messages];
      return {
        ...state,
        error: null,
        messages: [...newMessageList, action.payload.message],
        gallery: newGallery,
        loadingSendMess: false,
      };
    }
    case SAVE_IMAGE_MESSAGE: {
      const { message, base64Data } = action.payload;
      const isUploadMessage = { ...message };
      isUploadMessage.content = base64Data;
      isUploadMessage.type = MESSAGE_TYPE.IS_UPLOAD_IMAGE;
      return { ...state, messages: [...state.messages, isUploadMessage] };
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
      const { type, content } = action.payload.message;
      let newGallery =
        type === MESSAGE_TYPE.IMAGE
          ? [...state.gallery, fileUri(content)]
          : [...state.gallery];
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        gallery: newGallery,
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
    case SET_SINGLE_ROOMS: {
      return { ...state, singleRooms: action.payload.singleRooms };
    }
    default: {
      return state;
    }
  }
}
