import { RESET_NAVIGATION, SET_ACTIVE_NAVIGATION } from "./actions";

const { navItems } = require("src/configs/navigation");

const initialState = {
  navigation: [...navItems],
  activeNav: navItems[0].id,
};

export default function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_NAVIGATION: {
      return { ...state, activeNav: action.payload.navId };
    }
    case RESET_NAVIGATION: {
      return { ...state, ...initialState };
    }
    default:
      return state;
  }
}
