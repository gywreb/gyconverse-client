import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import navigationReducer from "./navigation/reducer";
import chatReducer from "./chat/reducer";
import userReducer from "./user/reducer";

const reducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  chat: chatReducer,
  user: userReducer,
});

export default reducer;
