import _, { capitalize } from "lodash";
import { SocketService } from "src/services/SocketService";
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

const REGISTER_ROUTE = "/auth/register";
const LOGIN_ROUTE = "/auth/login";
const GET_CURRENT_ROUTE = "/auth/getCurrent";

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
      history.push({
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
      history.push({
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
