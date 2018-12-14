import { createNote, processResponse } from "../../store/actions";
import { ResponseView } from "../../Components/Response";
import { connect } from "react-redux";
import React, { Component } from "react";

export class Class extends Component {
  state = {
    showNewNote: false,
    newNote: ""
  };

  toggleNewNote = () => {
    this.setState(prevState => ({
      showNewNote: !prevState.showNewNote
    }));
  };

  setNewNoteText = e => {
    this.setState({ newNote: e.target.value });
  };

  createNote = () => {
    if (!this.state.newNote) {
      return alert("OOps! You have not left any note for the respondent");
    }
    const { id } = this.props.match.params;
    const note = this.state.newNote;
    this.props.createNote(id, note);
    this.setState({ noteText: "", showNewNote: false });
  };

  process = () => {
    const { id } = this.props.match.params;
    const { history } = this.props;
    this.props.process(id, history);
  };

  render() {
    return (
      <ResponseView
        setNewNoteText={this.setNewNoteText}
        showNewNote={this.state.showNewNote}
        toggleNoteView={this.toggleNewNote}
        newNoteText={this.state.newNote}
        createNote={this.createNote}
      />
    );
  }
}

export const Response = connect(
  null,
  { createNote, processResponse }
)(Class);
