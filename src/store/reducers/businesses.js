import { updateState } from "../../utils";
import {
  SAVE_ALL_BUSINESSES,
  SAVE_APPROVED_BUSINESSES,
  SAVE_INACTIVE_BUSINESSES,
  UPDATE_RESPONSE_NOTE
} from "../actions";

const initialState = {
  allBusinesses: { result: [], count: 0, pages: 0 },
  approvedBusinesses: { result: [], count: 0, pages: 0 },
  inactiveBusinesses: { result: [], count: 0, pages: 0 }
};

export const businesses = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ALL_BUSINESSES:
      return updateState(state, { allBusinesses: action.data });
    case SAVE_APPROVED_BUSINESSES:
      return updateState(state, { approvedBusinesses: action.data });
    case SAVE_INACTIVE_BUSINESSES:
      return updateState(state, { inactiveBusinesses: action.data });
    case UPDATE_RESPONSE_NOTE:
      return findAndUpdate(state, action.data, action.stateType);
    default:
      return state;
  }
};

const findAndUpdate = (state, data, stateType) => {
  const category = { ...state[stateType] };
  const responseIndex = category.result.findIndex(resp => resp.id === data.id);
  category.result[responseIndex] = data;
  const newValue = {};
  newValue[stateType] = category;
  return updateState(state, newValue);
};
