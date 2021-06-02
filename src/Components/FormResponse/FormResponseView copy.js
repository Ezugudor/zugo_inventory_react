import { OfficailSignatories } from "./OfficialSignatories";
import { OfficialSignoff } from "./OfficialSignoff";
import style from "./FormResponseView.module.css";
import { AdminLayout } from "../../Hoc/Layouts";
import { ResponseControls } from "./Controls";
import { Answers } from "./Answers";
import { NewNote } from "./NewNote";
import PropTypes from "prop-types";
import { Notes } from "./Notes";
import React from "react";

export const FormResponseView = props => (
  <AdminLayout pageName="Account Opening" currentUser={props.currentUser}>
    <div className={style.response}>
      <ResponseControls
        toggleOfficialSectionUI={props.toggleOfficialSectionUI}
        processors={props.response.processors}
        handleNewNote={props.toggleNoteView}
        response={props.response}
        currentUser={props.currentUser}
      />

      {props.response.notes.length ? (
        <Notes notes={props.response.notes} currentUser={props.currentUser} />
      ) : null}
      <div className={style.mainArea}>
        <Answers answers={props.response.content} />
        <OfficailSignatories processors={props.response.processors} />
      </div>
      <OfficialSignoff
        toggleOfficialSectionUI={props.toggleOfficialSectionUI}
        showOfficialSectionUI={props.showOfficialSectionUI}
        responseType={props.responseType}
        responseId={props.response.id}
      />
      <NewNote {...props} />
    </div>
  </AdminLayout>
);

FormResponseView.propTypes = {
  toggleOfficialSectionUI: PropTypes.func.isRequired,
  showOfficialSectionUI: PropTypes.bool.isRequired,
  responseType: PropTypes.string.isRequired,
  toggleNoteView: PropTypes.func.isRequired,
  setNewNoteText: PropTypes.func.isRequired,
  newNoteText: PropTypes.string.isRequired,
  currentUser: PropTypes.object.isRequired,
  showNewNote: PropTypes.bool.isRequired,
  createNote: PropTypes.func.isRequired,
  response: PropTypes.object.isRequired
};
