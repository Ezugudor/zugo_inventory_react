import { updateState } from "../../utils";
import {
  SAVE_PARTIALLYPROCESSED_RESPONSES,
  SAVE_PROCESSED_RESPONSES,
  SAVE_PENDING_RESPONSES,
  UPDATE_RESPONSE_NOTE
} from "../actions";

const initialState = {
  partiallyprocessed: { result: [], count: 0, pages: 0 },
  processed: { result: [], count: 0, pages: 0 },
  pending: { result: [], count: 0, pages: 0 }
};

export const responses = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PARTIALLYPROCESSED_RESPONSES:
      return updateState(state, { partiallyprocessed: action.data });
    case SAVE_PROCESSED_RESPONSES:
      return updateState(state, { processed: action.data });
    case SAVE_PENDING_RESPONSES:
      return updateState(state, { pending: action.data });
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
