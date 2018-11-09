import { updateState } from "../../utils";
import { UPDATE_WORKSPACES } from "../actions";

const initialState = {
  all: { Individual: [], Corporate: [] }
};
export const workspace = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WORKSPACES:
      return updateState(state, {
        all: state.all.concat(action.workspace)
      });

    default:
      return state;
  }
};
