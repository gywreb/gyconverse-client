export const SET_ACTIVE_NAVIGATION = "@NAVIGATION/SET_ACTIVE_NAVIGATION";
export const RESET_NAVIGATION = "@NAVIGATION/RESET_NAVIGATION";

export const setActiveNavigation = (id) => (dispatch) => {
  dispatch({ type: SET_ACTIVE_NAVIGATION, payload: { navId: id } });
};

export const resetNavigation = () => (dispatch) => {
  dispatch({ type: RESET_NAVIGATION });
};
