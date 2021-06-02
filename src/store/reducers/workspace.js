import { updateState } from "../../utils";
import { SAVE_WORKSPACES } from "../actions";

const initialState = {
  all: { Individual: [], Corporate: [] }
};
export const workspace = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_WORKSPACES:
      return updateState(state, { all: action.collection });

    default:
      return state;
  }
};
