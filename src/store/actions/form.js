import { UNPRESERVE_NEW_FORM, UNPRESERVE_FORMBUILDER_STATE } from "./types";
import { PRESERVE_FORMBUILDER_STATE, PRESERVE_NEW_FORM } from "./types";
import { setNotificationMessage, startNetworkRequest } from "./app";
import { START_NEW_FORM, UPDATE_FORMS, SAVE_FORMS } from "./types";
import { SwypPartnerApi } from "../../core/api";
import { stopNetworkRequest } from "./app";
import { handleError } from "../../utils";

const saveForms = (collection, id) => ({ type: SAVE_FORMS, collection, id });
const updateForms = (form, id) => ({ type: UPDATE_FORMS, form, id });
const unpreserveNewForm = () => ({
  type: UNPRESERVE_NEW_FORM
});

const unpreserveFormBuilderState = () => ({
  type: UNPRESERVE_FORMBUILDER_STATE
});

export const preserveFormBuilderState = newState => dispatch => {
  dispatch({ type: PRESERVE_FORMBUILDER_STATE, newState });
};

export const preserveNewForm = elements => dispatach =>
  dispatach({
    type: PRESERVE_NEW_FORM,
    elements
  });

export const startNewForm = data => dispatach =>
  dispatach({
    type: START_NEW_FORM,
    data
  });

export const fetchForms = workspaceId => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`forms/workspaces/${workspaceId}`)
      .then(res => {
        dispatch(stopNetworkRequest());
        dispatch(saveForms(res.data, workspaceId));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const createForm = (details, history, { to, params }) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("forms", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        const { formTypeId } = details;
        dispatch(updateForms(res.data), formTypeId);
        dispatch(unpreserveFormBuilderState());
        dispatch(unpreserveNewForm());
        dispatch(
          setNotificationMessage(
            `${res.data.name} Form was created successfully`,
            "success"
          )
        );
        history.push(to, { params });
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};
