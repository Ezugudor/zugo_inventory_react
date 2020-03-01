import { updateState } from "../../utils";
import { STORE_USER } from "../actions";

const initialState = {
  currentUser: null,
  token: null
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case STORE_USER:
      return updateState(state, {
        token: `Bearer ${action.data.token}`,
        currentUser: action.data.current_user
      });
    default:
      return state;
  }
};
