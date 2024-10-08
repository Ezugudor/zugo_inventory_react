import { White, Red } from "../../Utils/Buttons";
import Style from "./NewNote.module.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const NewNote = props => (
  <Modal show={props.showNewNote} click={props.toggleNoteView}>
    <section className={Style.newNote}>
      <h3 className={Style.Text}>Add New Note</h3>
      <div className={Style.InputBox}>
        <textarea
          onChange={props.setNewNoteText}
          value={props.newNoteText}
          placeholder="Write Here"
          className={Style.Input}
          type="text"
        />
      </div>
      <div className={Style.Controls}>
        <White click={props.toggleNoteView}>Cancel</White>
        <Red click={props.createNote}>Create Note</Red>
      </div>
    </section>
  </Modal>
);

NewNote.propTypes = {
  toggleNoteView: PropTypes.func.isRequired,
  setNewNoteText: PropTypes.func.isRequired,
  newNoteText: PropTypes.string.isRequired,
  showNewNote: PropTypes.bool.isRequired,
  createNote: PropTypes.func.isRequired
};
