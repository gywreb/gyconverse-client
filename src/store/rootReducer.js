import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import navigationReducer from "./navigation/reducer";

const reducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
});

export default reducer;
