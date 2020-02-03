import { UPDATE_BUSINESS, STORE_BUSINESS } from "../actions";
import { DELETE_BUSINESS_ACCOUNT } from "../actions";
import { DELETE_BUSINESS_BRANCH, END_NOTIFICATION } from "../actions/types";
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

    case DELETE_BUSINESS_BRANCH:
      const biz = { ...state };
      console.log("logging biz inside reducer", biz);
      console.log("logging action inside reducer", action);
      console.log("logging action data inside reducer", action.data);
      biz.branches = biz.branches.filter(
        branch => branch.name !== action.data.name
      );
      return updateState(state, biz);
    default:
      return state;
  }
};
