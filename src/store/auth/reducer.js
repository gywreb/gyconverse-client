import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actions";

const initialState = {
  userInfo: null,
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
    case LOGIN_REQUEST: {
      return { ...state, loading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        userInfo: action.payload.userInfo,
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
