import { combineReducers, createStore, applyMiddleware } from "redux";
import { saveStateToStorage, loadStateFromStorage } from "../utils";
import { responses, workspace, form, user, app } from "./reducers";
import thunkMiddleware from "redux-thunk";

const reducers = combineReducers({
  workspace,
  responses,
  form,
  user,
  app
});

const stateFromStore = loadStateFromStorage();

const store = createStore(
  reducers,
  stateFromStore,
  applyMiddleware(thunkMiddleware)
);

store.subscribe(() => saveStateToStorage(store.getState()));

export default store;
