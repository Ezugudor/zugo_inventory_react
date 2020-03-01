import { workspace, user, app, file } from "./reducers";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { saveStateToStorage, loadStateFromStorage } from "../utils";
import thunkMiddleware from "redux-thunk";
import { business } from "./reducers";

const reducers = combineReducers({
  uploadedFile: file,
  workspace,
  business,
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
