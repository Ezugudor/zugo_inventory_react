import { AdminLayout } from "../../Hoc/Layouts";
import { ResponseControls } from "./Controls";
import Style from "./Response.module.css";
import { Answers } from "./Answers";
import { NewNote } from "./NewNote";
import PropTypes from "prop-types";
import { Notes } from "./Notes";
import React from "react";

export const ResponseView = props => (
  <AdminLayout pageName="Account Opening">
    <div className={Style.response}>
      <ResponseControls
        deliverMessage={props.deliverMessage}
        handleNewNote={props.toggleNoteView}
      />
      <Notes />
      <Answers />
      <NewNote {...props} />
    </div>
  </AdminLayout>
);

ResponseView.propTypes = {
  toggleNoteView: PropTypes.func.isRequired,
  setNewNoteText: PropTypes.func.isRequired,
  deliverMessage: PropTypes.func.isRequired,
  newNoteText: PropTypes.string.isRequired,
  showNewNote: PropTypes.bool.isRequired,
  createNote: PropTypes.func.isRequired
};
