import { updateState } from "../../utils";
import {
  UPDATE_WORKSPACES,
  DELETE_WORKSPACE,
  SAVE_WORKSPACES
} from "../actions";

const initialState = {
  all: { Individual: [], Corporate: [] }
};
export const workspace = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_WORKSPACES:
      return updateState(state, { all: action.collection });

    case UPDATE_WORKSPACES:
      return updateState(state, {
        all: state.all.concat(action.workspace)
      });

    case DELETE_WORKSPACE:
      const workspaces = state.all.filter(ws => ws.id !== action.id);
      return updateState(state, { all: workspaces });

    default:
      return state;
  }
};
