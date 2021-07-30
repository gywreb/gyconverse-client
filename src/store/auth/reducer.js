import {
  GET_CURRENT_AUTH,
  GET_CURRENT_AUTH_FAILURE,
  GET_CURRENT_AUTH_REQUEST,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actions";

const initialState = {
  token: null,
  userInfo: null,
  getCurrentLoading: false,
  loading: false,
  error: null,
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
    default: {
      return state;
    }
  }
}
