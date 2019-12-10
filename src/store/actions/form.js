import { UNPRESERVE_NEW_FORM, UNPRESERVE_FORMBUILDER_STATE } from "./types";
import {
  PRESERVE_FORMBUILDER_STATE,
  PRESERVE_NEW_FORM,
  TOGGLE_PUBLISHED
} from "./types";
import {
  setNotificationMessage,
  setAutoSaveNotificationMessage,
  startNetworkRequest,
  startAutoSaveNetworkRequest,
  stopNetworkRequest,
  stopAutoSaveNetworkRequest
} from "./app";
import { START_NEW_FORM, UPDATE_FORMS, SAVE_FORMS, EDIT_FORM } from "./types";
import { SwypPartnerApi } from "../../core/api";
import { handleError } from "../../utils";

const saveForms = (collection, id) => ({ type: SAVE_FORMS, collection, id });
const updateForms = (form, id) => ({ type: UPDATE_FORMS, form, id });
const unpreserveNewForm = () => ({
  type: UNPRESERVE_NEW_FORM
});

const togglePublished = () => ({
  type: TOGGLE_PUBLISHED
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
        console.log("res data", res.data);
        dispatch(stopNetworkRequest());
        dispatch(saveForms(res.data, workspaceId));
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const publishForm = (formId, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.put(`forms/publish/${formId}`, details)
      .then(res => {
        dispatch(stopNetworkRequest());
        if (res.data.updated) {
          dispatch(togglePublished());
        }
        dispatch(
          setNotificationMessage(
            `Action completed successfully`,
            "success",
            "Success"
          )
        );
        return true;
      })
      .catch(err => {
        handleError(err, dispatch);
        return "sf";
      });
  };
};

export const deleteForm = (formId, details) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.delete(`forms/${formId}`, { data: details })
      .then(res => {
        dispatch(stopNetworkRequest());
        const { workspace } = details;
        dispatch(saveForms(res.data, workspace.id));
        dispatch(
          setNotificationMessage(
            `Form successfully deleted`,
            "success",
            "Form Deleted"
          )
        );
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const createForm = (details, history) => {
  return dispatch => {
    dispatch(startNetworkRequest());
    SwypPartnerApi.post("forms", details)
      .then(res => {
        dispatch(stopNetworkRequest());
        const { id } = details.workspace;
        dispatch(updateForms(res.data, id));
        dispatch(unpreserveFormBuilderState());
        dispatch(unpreserveNewForm());
        dispatch(
          setNotificationMessage(
            `Switching to builder mode.`,
            "success",
            `${res.data.name} created`
          )
        );

        const detail = {
          formType: details.workspace,
          name: res.data.name,
          formId: res.data.id,
          isLive: false,
          elements: []
        };
        dispatch(clearFormBuilder());
        dispatch(startNewForm(detail));
        history.push("/formbuilder");
      })
      .catch(err => {
        handleError(err, dispatch);
      });
  };
};

export const updateForm = (details, history, { to, params }, autoSave) => {
  return dispatch => {
    autoSave
      ? dispatch(startAutoSaveNetworkRequest())
      : dispatch(startNetworkRequest());

    SwypPartnerApi.put("forms", details)
      .then(res => {
        if (autoSave) {
          dispatch(stopAutoSaveNetworkRequest());
          const { formTypeId } = details;
          dispatch(updateForms(res.data, formTypeId));
          dispatch(
            setAutoSaveNotificationMessage(
              `${res.data.name} saved successfully`,
              "success",
              "Saved"
            )
          );
          return;
        }
        dispatch(stopNetworkRequest());
        dispatch(unpreserveFormBuilderState());
        dispatch(unpreserveNewForm());
        const { formTypeId } = details;
        dispatch(updateForms(res.data, formTypeId));
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
          if (!autoSave) {
            dispatch(
              setNotificationMessage(
                "You have not really made any changes.",
                "success",
                "Nothing Changed"
              )
            );
          }
        }
      });
  };
};
