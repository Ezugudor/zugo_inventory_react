import { updateState } from "../../utils";
import { SELECTED_CODE, SELECTED_CODE_SUPPLIES } from "../actions";

const initialState = {
  currentCode: null,
  supplies: []
};

export const receivings = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_CODE:
      return updateState(state, {
        currentCode: action.data
      });
    case SELECTED_CODE_SUPPLIES:
      return updateState(state, {
        supplies: action.data
      });
    default:
      return state;
  }
};
