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
import { Notification, PopImage } from "../Utils";

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

      <div className={style.mainArea}>
        <div className={style.answerCont}>
          <Answers answers={props.response.content} />
        </div>
        <div className={style.detailCont}>
          <div className={style.commentCont}>
            {props.response.notes.length ? (
              <Notes
                notes={props.response.notes}
                currentUser={props.currentUser}
              />
            ) : (
              <div className={style.emptyMessage}>No Comment on this form.</div>
            )}
          </div>
          <div className={style.signatoryCont}>
            <OfficailSignatories processors={props.response.processors} />
          </div>
          <div className={style.clearfix}></div>
        </div>
        <div className={style.clearfix}></div>
      </div>
      <OfficialSignoff
        toggleOfficialSectionUI={props.toggleOfficialSectionUI}
        showOfficialSectionUI={props.showOfficialSectionUI}
        responseType={props.responseType}
        responseId={props.response.id}
      />
      <NewNote {...props} />
      <Notification
        showNotification={props.showNotification}
        timer={props.popupTimer}
        toggleLoading={props.toggleNotification}
        title={"Default Title"}
        message={"Default Body Message"}
      />
      <PopImage />
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
