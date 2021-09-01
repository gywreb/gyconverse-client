import {
  ACCEPT_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST_LOADING,
  GET_CURRENT_AUTH,
  GET_CURRENT_AUTH_FAILURE,
  GET_CURRENT_AUTH_REQUEST,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SEND_CHAT_INVITE,
  SEND_CHAT_INVITE_LOADING,
  SEND_FRIEND_REQUEST,
  SEND_FRIEND_REQUEST_LOADING,
  UPDATE_FRIEND_LIST,
  UPDATE_FRIEND_REQUESTS,
} from "./actions";

const initialState = {
  token: null,
  userInfo: null,
  getCurrentLoading: false,
  loading: false,
  error: null,
  frLoading: false,
  afrLoading: false,
  inviteLoading: false,
  requestingId: null,
  acceptingId: null,
  invitingId: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, loading: true };
    }
    case REGISTER_SUCCESS: {
      return { ...state, loading: false, error: null };
    }
    case REGISTER_FAILURE: {
      return { ...state, loading: false, error: action.payload.error };
    }
    case GET_CURRENT_AUTH_REQUEST: {
      return { ...state, getCurrentLoading: true };
    }
    case GET_CURRENT_AUTH: {
      return {
        ...state,
        getCurrentLoading: false,
        error: null,
        userInfo: action.payload.userInfo,
        token: action.payload.token,
      };
    }
    case GET_CURRENT_AUTH_FAILURE: {
      return {
        ...state,
        getCurrentLoading: false,
        error: action.payload.error,
        userInfo: null,
        token: null,
      };
    }
    case LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: action.payload.userInfo,
        token: action.payload.token,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        userInfo: null,
      };
    }
    case SEND_FRIEND_REQUEST_LOADING: {
      return {
        ...state,
        frLoading: true,
        requestingId: action.payload.person._id,
      };
    }
    case SEND_FRIEND_REQUEST: {
      // get pending list
      let pendingList = state.userInfo.pendingRequests
        ? [...state.userInfo.pendingRequests]
        : [];

      // update pending list for ui
      pendingList.push(action.payload.person._id);
      let updatedUserInfo = {
        ...state.userInfo,
        pendingRequests: [...pendingList],
      };

      return {
        ...state,
        frLoading: false,
        userInfo: { ...updatedUserInfo },
        requestingId: null,
      };
    }

    case UPDATE_FRIEND_REQUESTS: {
      let requestList = state.userInfo.friendRequests
        ? [...state.userInfo.friendRequests]
        : [];
      requestList.push(action.payload.request);
      let updatedUserInfo = {
        ...state.userInfo,
        friendRequests: [...requestList],
      };
      return { ...state, userInfo: { ...updatedUserInfo } };
    }

    case ACCEPT_FRIEND_REQUEST_LOADING: {
      return {
        ...state,
        afrLoading: true,
        acceptingId: action.payload.request.id,
      };
    }

    case ACCEPT_FRIEND_REQUEST: {
      let updatedUserInfo = {
        ...state.userInfo,
        friends: [...action.payload.updatedAuthUser.friends],
        friendRequests: [...action.payload.updatedAuthUser.friendRequests],
      };
      return {
        ...state,
        afrLoading: false,
        userInfo: updatedUserInfo,
        acceptingId: null,
      };
    }

    case UPDATE_FRIEND_LIST: {
      let updatedUserInfo = {
        ...state.userInfo,
        friends: [...action.payload.updatedTargetUser.friends],
        pendingRequests: [...action.payload.updatedTargetUser.pendingRequests],
      };
      return { ...state, userInfo: { ...updatedUserInfo } };
    }

    case SEND_CHAT_INVITE_LOADING: {
      return {
        ...state,
        inviteLoading: true,
        invitingId: action.payload.friend.id,
      };
    }

    case SEND_CHAT_INVITE: {
      let updatedUserInfo = {
        ...state.userInfo,
        friends: [...action.payload.updatedAuthInfo.friends],
      };
      return {
        ...state,
        inviteLoading: false,
        userInfo: { ...updatedUserInfo },
        invitingId: null,
      };
    }

    case LOGOUT: {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
}
