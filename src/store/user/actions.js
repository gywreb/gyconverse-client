import apiClient from "src/configs/apiClient";

export const GET_RANDOM_PEOPLE = "@USER/GET_RANDOM_PEOPLE";
export const GET_RANDOM_PEOPLE_REQUEST = "@USER/GET_RANDOM_PEOPLE_REQUEST";
export const GET_RANDOM_PEOPLE_FAILURE = "@USER/GET_RANDOM_PEOPLE_FAILURE";
export const UPDATE_PEOPLE_LIST = "@USER/UPDATE_PEOPLE_LIST";

const GET_RANDOM_PEOPLE_ROUTE = "/user";

export const updatePeopleList = (request) => (dispatch) => {
  dispatch({ type: UPDATE_PEOPLE_LIST, payload: { request } });
};

export const getRandomPeople = (toast) => async (dispatch) => {
  dispatch({ type: GET_RANDOM_PEOPLE_REQUEST });
  try {
    const {
      data: {
        data: { people },
      },
    } = await apiClient.get(GET_RANDOM_PEOPLE_ROUTE);
    dispatch({ type: GET_RANDOM_PEOPLE, payload: { people } });
  } catch (error) {
    console.log(error);
    toast({
      title:
        "Can't show anyone for to make friend right now! Please try again later :(",
      position: "top",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    dispatch({ type: GET_RANDOM_PEOPLE_FAILURE, payload: { error } });
  }
};
