import { UNPRESERVE_NEW_FORM, UNPRESERVE_FORMBUILDER_STATE } from "./types";
import { PRESERVE_FORMBUILDER_STATE, PRESERVE_NEW_FORM } from "./types";
import { setNotificationMessage, startNetworkRequest } from "./app";
import { START_NEW_FORM, UPDATE_FORMS, SAVE_FORMS, EDIT_FORM } from "./types";
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

export const editForm = data => dispatach =>
  dispatach({
    type: EDIT_FORM,
    data
  });

export const clearFormBuilder = () => dispatach =>
  dispatach({
    type: UNPRESERVE_NEW_FORM
  });

export const fetchForms = (workspaceId, businessId) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.get(`forms/workspaces/${workspaceId}/${businessId}`)
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
            `${res.data.name} was created successfully`,
            "success",
            "Success"
          )
        );
        history.push(to, { params });
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const updateForm = (details, history, { to, params }) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put("forms", details)
      .then(res => {
        console.log("update form dispatcher form res", res);
        dispatch(stopNetworkRequest());
        const { formTypeId } = details;
        dispatch(updateForms(res.data), formTypeId);
        dispatch(unpreserveFormBuilderState());
        dispatch(unpreserveNewForm());
        dispatch(
          setNotificationMessage(
            `${res.data.name} updated successfully`,
            "success",
            "Success"
          )
        );
        history.push(to, { params });
      })
      .catch(err => {
        if (err.response.status == 502) {
          dispatch(stopNetworkRequest());
          dispatch(
            setNotificationMessage(
              "You have not really made any changes.",
              "success",
              "Nothing Changed"
            )
          );
          // history.push("/formtypes");
        }
        // handleError(err, dispatch);
      });
  };
};
