import { AdminLayout } from "../../Hoc/Layouts";
import { ResponsesControls } from "./Controls";
import Style from "./ResponsesView.module.css";
import { ResponseAside } from "./Aside";
import { Ansewers } from "./Answers";
import PropTypes from "prop-types";
import { Info } from "./Info";
import { Notification } from "../Utils";
import React from "react";

export const ResponsesView = props => (
  <AdminLayout pageName="Responses">
    <div className={Style.responses}>
      <ResponsesControls />
      <Info />
      <section className={Style.responseContent}>
        <ResponseAside />
        <div className={Style.answers}>
          <Ansewers />
        </div>
      </section>
    </div>
    <Notification
      showNotification={props.showNotification}
      timer={props.popupTimer}
      toggleLoading={props.toggleNotification}
      title={"Default Title"}
      message={"Default Body Message"}
    />
  </AdminLayout>
);
ResponsesView.propTypes = {
  toggleNoteView: PropTypes.func.isRequired,
  setNewNoteText: PropTypes.func.isRequired,
  showNewNote: PropTypes.bool.isRequired
};
