import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import navigationReducer from "./navigation/reducer";
import chatReducer from "./chat/reducer";

const reducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  chat: chatReducer,
});

export default reducer;
