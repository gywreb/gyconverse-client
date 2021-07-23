import _, { capitalize } from "lodash";
import apiClient from "../../configs/apiClient";
import { BASICAUTH_PASSWORD, BASICAUTH_USER } from "../../configs/apiConstants";
import { ROUTE_KEY } from "../../configs/routes";

export const REGISTER_REQUEST = "@AUTH/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "@AUTH/REGISTER_SUCCESS";
export const REGISTER_FAILURE = "@AUTH/REGISTER_FAILURE";
export const LOGIN_REQUEST = "@AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "@AUTH/LOGIN_SUCCESS";
export const LOGIN_FAILURE = "@AUTH/LOGIN_FAILURE";

const REGISTER_ROUTE = "/auth/register";
const LOGIN_ROUTE = "/auth/login";

export const login =
  (payload, history, toast, resetForm) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const {
        data: {
          data: { userInfo },
        },
      } = await apiClient.post(LOGIN_ROUTE, payload, {
        auth: {
          username: BASICAUTH_USER,
          password: BASICAUTH_PASSWORD,
        },
      });
      toast({
        title: `Welcome back ${userInfo.username}!`,
        description: "Have fun chatting.",
        position: "top",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: { userInfo } });
      resetForm();
      history.push({
        pathname: ROUTE_KEY.Home,
      });
    } catch (error) {
      console.log(error?.response?.data);
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
        payload: { erorr: error?.response?.data || "error" },
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
