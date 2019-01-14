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
      <Notes notes={props.response.notes} currentUser={props.currentUser} />
      <Answers answers={props.response.content} />
      <NewNote {...props} />
    </div>
  </AdminLayout>
);

ResponseView.propTypes = {
  toggleNoteView: PropTypes.func.isRequired,
  setNewNoteText: PropTypes.func.isRequired,
  deliverMessage: PropTypes.func.isRequired,
  newNoteText: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  showNewNote: PropTypes.bool.isRequired,
  createNote: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired
};
