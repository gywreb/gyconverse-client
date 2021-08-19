import _, { capitalize } from "lodash";
import { Events, SocketService } from "src/services/SocketService";
import apiClient from "../../configs/apiClient";
import { BASICAUTH_PASSWORD, BASICAUTH_USER } from "../../configs/apiConstants";
import { ROUTE_KEY } from "../../configs/routes";

export const REGISTER_REQUEST = "@AUTH/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "@AUTH/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "@AUTH/REGISTER_FAILURE";
export const LOGIN_REQUEST = "@AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@AUTH/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@AUTH/LOGIN_FAILURE";
export const GET_CURRENT_AUTH = "@AUTH/GET_CURRENT_AUTH";
export const GET_CURRENT_AUTH_REQUEST = "@AUTH/GET_CURRENT_AUTH_REQUEST";
export const GET_CURRENT_AUTH_FAILURE = "@AUTH/GET_CURRENT_AUTH_FAILURE";
export const SEND_FRIEND_REQUEST = "@AUTH/SEND_FRIEND_REQUEST";
export const SEND_FRIEND_REQUEST_LOADING = "@AUTH/SEND_FRIEND_REQUEST_LOADING";
export const UPDATE_FRIEND_REQUESTS = "@AUTH/UPDATE_FRIEND_REQUESTS";
export const ACCEPT_FRIEND_REQUEST = "@AUTH/ACCEPT_FRIEND_REQUEST";
export const ACCEPT_FRIEND_REQUEST_LOADING =
  "@AUTH/ACCEPT_FRIEND_REQUEST_LOADING";
export const UPDATE_FRIEND_LIST = "@AUTH/UPDATE_FRIEND_LIST";
export const SEND_CHAT_INVITE = "@AUTH/SEND_CHAT_INVITE";
export const SEND_CHAT_INVITE_LOADING = "@AUTH/SEND_CHAT_INVITE_LOADING";

const REGISTER_ROUTE = "/auth/register";
const LOGIN_ROUTE = "/auth/login";
const GET_CURRENT_ROUTE = "/auth/getCurrent";
const SEND_FRIEND_REQUEST_ROUTE = "/user/sendFriendRequest";
const ACCEPT_FRIEND_REQUEST_ROUTE = "/user/makeFriend";
const SEND_CHAT_INVITE_ROUTE = "/room/single";

export const updateFriendListByChatInvite = (invite) => async (dispatch) => {
  dispatch({
    type: UPDATE_FRIEND_LIST,
    payload: { updatedTargetUser: invite.updatedUserInfo },
  });
};

export const sendChatInvite =
  (userInfo, friend, room, toast) => async (dispatch) => {
    dispatch({ type: SEND_CHAT_INVITE_LOADING, payload: { friend } });
    try {
      const {
        data: {
          data: { newRoom, updatedAuthInfo, updatedUserInfo },
        },
      } = await apiClient.post(SEND_CHAT_INVITE_ROUTE, room);
      dispatch({ type: SEND_CHAT_INVITE, payload: { updatedAuthInfo } });
      SocketService.client.emit(Events.sendChatInvite, {
        receiveId: friend.id,
        singleRoom: newRoom._id,
        newRoom,
        username: userInfo?.username,
        updatedUserInfo,
      });
      toast({
        title: `You now can chat with ${friend.username}`,
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: capitalize(error.reponse?.data?.message || "Error"),
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

export const updateFriendList = (request) => async (dispatch) => {
  dispatch({
    type: UPDATE_FRIEND_LIST,
    payload: { updatedTargetUser: request.updatedTargetUser },
  });
};

export const acceptFriendRequest =
  (userInfo, request, toast) => async (dispatch) => {
    dispatch({ type: ACCEPT_FRIEND_REQUEST_LOADING, payload: { request } });
    try {
      const {
        data: {
          data: { message, updatedAuthUser, updatedTargetUser },
        },
      } = await apiClient.patch(`${ACCEPT_FRIEND_REQUEST_ROUTE}/${request.id}`);
      console.log(updatedAuthUser, updatedTargetUser);
      dispatch({
        type: ACCEPT_FRIEND_REQUEST,
        payload: { updatedAuthUser, request },
      });
      SocketService.client.emit(Events.acceptFriendRequest, {
        receiveId: request.id,
        username: userInfo?.username,
        updatedTargetUser,
      });
      toast({
        title: capitalize(message),
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: capitalize(error.reponse?.data?.message || "Error"),
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

export const updateFriendRequests = (request) => (dispatch) => {
  dispatch({ type: UPDATE_FRIEND_REQUESTS, payload: { request } });
};

export const sendFriendRequest =
  (userInfo, person, toast) => async (dispatch) => {
    dispatch({ type: SEND_FRIEND_REQUEST_LOADING, payload: { person } });
    try {
      const {
        data: { data },
      } = await apiClient.patch(`${SEND_FRIEND_REQUEST_ROUTE}/${person._id}`);
      dispatch({ type: SEND_FRIEND_REQUEST, payload: { person } });
      SocketService.client.emit(Events.sendFriendRequest, {
        receiveId: person._id,
        id: userInfo?._id,
        username: userInfo?.username,
        avatar: userInfo?.avatar ? userInfo.avatar : null,
      });
      toast({
        title: capitalize(data),
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: capitalize(error.reponse?.data?.message || "Error"),
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

export const getCurrent = (history, toast) => async (dispatch) => {
  delete apiClient.defaults.headers.common["Authorization"];
  dispatch({ type: GET_CURRENT_AUTH_REQUEST });
  const token = localStorage.getItem("jwt");
  try {
    const {
      data: {
        data: { userInfo },
      },
    } = await apiClient.get(GET_CURRENT_ROUTE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("jwt", token);
    SocketService.login(userInfo);
    toast({
      title: `Welcome back ${userInfo.username}!`,
      description: "Have fun chatting.",
      position: "top",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    dispatch({ type: GET_CURRENT_AUTH, payload: { userInfo, token } });
  } catch (error) {
    console.log(error);
    delete apiClient.defaults.headers.common["Authorization"];
    dispatch({
      type: GET_CURRENT_AUTH_FAILURE,
      payload: { error: error?.response?.data || "error" },
    });
  }
};

export const login =
  (payload, history, toast, resetForm) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const {
        data: {
          data: { userInfo, token },
        },
      } = await apiClient.post(LOGIN_ROUTE, payload, {
        auth: {
          username: BASICAUTH_USER,
          password: BASICAUTH_PASSWORD,
        },
      });
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("jwt", token);
      SocketService.login(userInfo);
      toast({
        title: `Welcome back ${userInfo.username}!`,
        description: "Have fun chatting.",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: { userInfo, token } });
      resetForm();
      history.replace({
        pathname: ROUTE_KEY.Home,
      });
    } catch (error) {
      console.log(error?.response?.data);
      delete apiClient.defaults.headers.common["Authorization"];
      toast({
        title: capitalize(
          error?.response?.data?.message?.email ||
            error?.response?.data?.message?.password ||
            error?.response?.data?.message ||
            "login error"
        ),
        description: `Error code: ${error?.response?.data?.code || 500}`,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error: error?.response?.data || "error" },
      });
    }
  };

export const register =
  (payload, history, toast, resetForm) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const {
        data: { newUser },
      } = await apiClient.post(REGISTER_ROUTE, payload, {
        auth: {
          username: BASICAUTH_USER,
          password: BASICAUTH_PASSWORD,
        },
      });
      toast({
        title: "Your persona is successfully created!",
        description: "Sign-in and ready to have fun conversations :).",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: REGISTER_SUCCESS });
      resetForm();
      history.replace({
        pathname: ROUTE_KEY.Login,
        search: `?email=${payload.email}`,
      });
    } catch (error) {
      console.log(error?.response?.data);
      toast({
        title: capitalize(
          error?.response?.data?.message?.username ||
            error?.response?.data?.message?.email ||
            error?.response?.data?.message?.password ||
            error?.response?.data?.message ||
            "register error"
        ),
        description: `Error code: ${error?.response?.data?.code || 500}`,
        position: "top",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch({
        type: REGISTER_FAILURE,
        payload: { erorr: error?.response?.data || "error" },
      });
    }
  };
