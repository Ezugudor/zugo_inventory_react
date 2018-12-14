import { updateState } from "../../utils";
import {
  UPDATE_BUSINESS,
  DELETE_USER,
  SAVE_STATS,
  SAVE_USER
} from "../actions";

const initialState = {
  currentUser: null,
  business: null,
  token: null,
  stats: []
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return updateState(state, {
        business: action.data.business,
        token: action.data.token,
        currentUser: action.data.user
      });

    case SAVE_STATS:
      return updateState(state, { stats: action.stats });

    case UPDATE_BUSINESS:
      return updateState(state, {
        business: action.data
      });

    case DELETE_USER:
      const business = { ...state.business };

      business.accounts = business.accounts.filter(
        account => account.email !== action.user.email
      );

      return updateState(state, {
        business: business
      });
    default:
      return state;
  }
};
