import {
  getResponse,
  getCurrentUser,
  getBusinessColor
} from "../../store/selectors";
import { FormResponseView } from "../../Components/FormResponse";
import { createNote } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { themeMaker } from "../../utils";

export class Class extends Component {
  state = {
    showOfficialSectionUI: false,
    showNewNote: false,
    newNote: ""
  };

  componentDidMount() {
    const { businessColor } = this.props;
    themeMaker(businessColor);
  }

  /**
   * show model for a user to add note on a user
   * response
   */
  toggleNewNote = () => {
    this.setState(prevState => ({
      showNewNote: !prevState.showNewNote
    }));
  };

  /**
   * Show modal for collecting official signatures
   * for a user response
   */
  toggleOfficialSection = () => {
    const { showOfficialSectionUI } = this.state;
    const { currentUser, response } = this.props;
    if (!showOfficialSectionUI) {
      if (
        (currentUser.role === "admin" || currentUser.role === "approver") &&
        !response.processors.initiator.email
      ) {
        alert("An initiator need to sign off before you can.");
        return;
      }
    }
    this.setState(prevState => ({
      showOfficialSectionUI: !prevState.showOfficialSectionUI
    }));
  };

  /**
   * collect text user enters as note
   */
  setNewNoteText = e => {
    this.setState({ newNote: e.target.value });
  };

  /**
   * push note text to upstream server
   */
  createNote = () => {
    if (!this.state.newNote) {
      return alert("OOps! You have not left any note for the respondent");
    }
    const { id, type } = this.props.match.params;
    const note = this.state.newNote;
    this.props.createNote(id, note, type);
    this.setState({ newNote: "", showNewNote: false });
  };

  /**
   * render UI on the screen
   */
  render() {
    const { type } = this.props.match.params;
    return (
      <FormResponseView
        showOfficialSectionUI={this.state.showOfficialSectionUI}
        toggleOfficialSectionUI={this.toggleOfficialSection}
        setNewNoteText={this.setNewNoteText}
        currentUser={this.props.currentUser}
        showNewNote={this.state.showNewNote}
        toggleNoteView={this.toggleNewNote}
        newNoteText={this.state.newNote}
        response={this.props.response}
        createNote={this.createNote}
        responseType={type}
      />
    );
  }
}

/**
 * connection component to state
 * @param {*} state
 * @param {*} props
 */
const mapStateToProps = (state, props) => {
  const { id, type } = props.match.params;
  return {
    currentUser: getCurrentUser(state),
    response: getResponse(state, { id, type }),
    businessColor: getBusinessColor(state)
  };
};

export const FormResponse = connect(
  mapStateToProps,
  { createNote }
)(Class);
