import { responses, workspace, form, user, app, file } from "./reducers";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { saveStateToStorage, loadStateFromStorage } from "../utils";
import thunkMiddleware from "redux-thunk";

const reducers = combineReducers({
  uploadedFile: file,
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
