import { getResponse, getCurrentUser } from "../../store/selectors";
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
    const { id, type } = this.props.match.params;
    const note = this.state.newNote;
    this.props.createNote(id, note, type);
    this.setState({ newNote: "", showNewNote: false });
  };

  deliverMessage = () => {
    alert("Functionality comming soon!");
  };

  process = () => {
    const { id } = this.props.match.params;
    const { history } = this.props;
    this.props.process(id, history);
  };

  render() {
    console.log(this.props.response);
    console.log(this.props.currentUser);
    return (
      <ResponseView
        setNewNoteText={this.setNewNoteText}
        showNewNote={this.state.showNewNote}
        deliverMessage={this.deliverMessage}
        toggleNoteView={this.toggleNewNote}
        newNoteText={this.state.newNote}
        createNote={this.createNote}
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id, type } = props.match.params;
  return {
    currentUser: getCurrentUser(state),
    response: getResponse(state, { id, type })
  };
};

export const Response = connect(
  mapStateToProps,
  { createNote, processResponse }
)(Class);
