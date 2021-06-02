import {
  UPDATE_BUSINESS,
  STORE_BUSINESS,
  UPDATE_OUTLETS,
  UPDATE_CUSTOMERS,
  UPDATE_CREDIT,
  UPDATE_PAYMENT,
  UPDATE_DRIVERS,
  UPDATE_RECEIVINGS,
  UPDATE_STOCKS
} from "../actions";
import { updateState } from "../../utils";

const initialState = null;

export const business = (state = initialState, action) => {
  switch (action.type) {
    case STORE_BUSINESS:
      return updateState(state, action.data.business);

    case UPDATE_OUTLETS:
      return updateState(state, { outlets: action.data.outlets });

    case UPDATE_CUSTOMERS:
      return updateState(state, {
        business_customers: action.data.business_customers
      });

    case UPDATE_DRIVERS:
      return updateState(state, {
        business_drivers: action.data.business_drivers
      });

    case UPDATE_RECEIVINGS:
      return updateState(state, {
        business_receivings_sum: action.data.business_receivings_sum
      });

    case UPDATE_STOCKS:
      return updateState(state, {
        business_stocks: action.data.business_stocks
      });

    case UPDATE_CREDIT:
      return updateState(state, {
        business_customer_credits: action.data.business_customer_credits
      });

    case UPDATE_PAYMENT:
      return updateState(state, {
        business_credit_payments: action.data.business_credit_payments
      });

    case UPDATE_BUSINESS:
      return updateState(state, action.data);

    default:
      return state;
  }
};
