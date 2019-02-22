import { UPDATE_BUSINESS, STORE_BUSINESS } from "../actions";
import { DELETE_BUSINESS_ACCOUNT } from "../actions";
import { updateState } from "../../utils";

const initialState = null;

export const business = (state = initialState, action) => {
  switch (action.type) {
    case STORE_BUSINESS:
      return updateState(state, action.data.business);

    case UPDATE_BUSINESS:
      return updateState(state, action.data);

    case DELETE_BUSINESS_ACCOUNT:
      const business = { ...state };
      business.accounts = business.accounts.filter(
        account => account.email !== action.user.email
      );
      return updateState(state, action.data);
    default:
      return state;
  }
};
