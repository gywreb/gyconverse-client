import {
  GET_RANDOM_PEOPLE,
  GET_RANDOM_PEOPLE_FAILURE,
  GET_RANDOM_PEOPLE_REQUEST,
  UPDATE_PEOPLE_LIST,
} from "./actions";

const initialState = {
  people: [],
  loading: false,
  error: "",
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RANDOM_PEOPLE_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_RANDOM_PEOPLE: {
      return {
        ...state,
        loading: false,
        people: [...action.payload.people],
        error: "",
      };
    }
    case GET_RANDOM_PEOPLE_FAILURE: {
      return {
        ...state,
        loading: false,
        people: [],
        error: action.payload.error,
      };
    }
    case UPDATE_PEOPLE_LIST: {
      let updatedPeopleList = state.people.filter(
        (person) => person.username !== action.payload.request.username
      );
      return { ...state, people: [...updatedPeopleList] };
    }
    default: {
      return state;
    }
  }
}
