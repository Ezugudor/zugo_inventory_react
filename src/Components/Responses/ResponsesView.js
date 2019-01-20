import { AdminLayout } from "../../Hoc/Layouts";
import { ResponsesControls } from "./Controls";
import Style from "./ResponsesView.module.css";
import { ResponseAside } from "./Aside";
// import PropTypes from "prop-types";
import { Ansewer } from "./Answer";
import { Info } from "./Info";
import React from "react";

export const ResponsesView = props => (
  <AdminLayout pageName="Responses">
    <div className={Style.responses}>
      <ResponsesControls />
      <Info />
      <section className={Style.responseContent}>
        <ResponseAside />
        <div className={Style.answers}>
          <Ansewer />
        </div>
      </section>
    </div>
  </AdminLayout>
);
// ResponsesView.propTypes = {
//   toggleNoteView: PropTypes.func.isRequired,
//   setNewNoteText: PropTypes.func.isRequired,
//   showNewNote: PropTypes.bool.isRequired
// };