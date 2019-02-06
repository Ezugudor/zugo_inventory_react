import { getAccounts, getBranches, getBusinessId } from "../../store/selectors";
import { createNewMember, changeBranch } from "../../store/actions";
import { getCurrentUser } from "../../store/selectors";
import { deleteMember } from "../../store/actions";
import { TeamView } from "../../Components/Team";
import React, { Component } from "react";
import { connect } from "react-redux";
class Class extends Component {
  state = {
    showCreateMember: false,
    showDeleteMember: false,
    showChangeBranch: false,
    memberToDelete: {},
    newMember: {
      role: "worker",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      branch: ""
    },
    branchChangeDetails: {
      user: "",
      branch: ""
    }
  };

  /**
   * show create new member modal
   */
  toggleCreateMember = () => {
    this.setState(prevState => {
      return { showCreateMember: !prevState.showCreateMember };
    });
  };

  /**
   * build up new user properties
   * @param {string} key propterty name to set
   * @param {string} value the value set key to
   */
  setNewMemberDetail = (key, value) => {
    const newMember = { ...this.state.newMember };
    newMember[key] = value;
    this.setState({ newMember });
  };

  /**
   *create new team member
   */
  createMember = e => {
    e.preventDefault();
    const { currentUser } = this.props;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    if (
      !this.state.newMember.email ||
      !this.state.newMember.firstname ||
      !this.state.newMember.lastname ||
      !this.state.newMember.branch ||
      !this.state.newMember.phone
    ) {
      return alert("Required field is not set");
    }
    const { email, phone, role, branch } = this.state.newMember;
    const { firstname, lastname } = this.state.newMember;
    const origin = `${window.location.origin}/completesignup`;
    const name = `${firstname} ${lastname}`;
    const details = {
      email,
      name,
      phone,
      role,
      origin,
      branch,
      business: this.props.businessId
    };
    this.toggleCreateMember();
    this.props.createNewMember(details);
  };

  /**
   * show delete a member modal
   */
  toggleDeleteMember = () => {
    this.setState(prevState => {
      return { showDeleteMember: !prevState.showDeleteMember };
    });
  };

  /**
   * pick the user to delete
   * @param {object} user user account object to be deleted
   */
  setMemberToDelete = user => {
    this.setState({ memberToDelete: user });
    this.toggleDeleteMember();
  };

  /**
   * delete a team member
   */
  deleteMember = () => {
    this.toggleDeleteMember();
    const user = this.state.memberToDelete;
    const { currentUser } = this.props;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    if (user && user.role === "admin") {
      alert("You can't not delete Admin Account");
      return;
    } else if (user) {
      this.props.deleteMember(user);
      return;
    }
    alert("Unidentified operation");
  };

  /**
   * show change a member's branch modal
   */
  toggleChangeBranch = () => {
    this.setState(prevState => {
      return { showChangeBranch: !prevState.showChangeBranch };
    });
  };

  /**
   * Record details of the user whose branch need to be changed
   * @param {string} key
   * @param {string} value
   * @param {boolean} toggleModal
   */
  setNewBranchDetail = (key, value, toggleModal = false) => {
    const details = { ...this.state.branchChangeDetails };
    details[key] = value;
    this.setState({ branchChangeDetails: details });
    if (toggleModal) {
      this.toggleChangeBranch();
    }
  };

  /**
   * change a team member branch
   */
  changeUserBranch = () => {
    const { currentUser } = this.props;
    const { user, branch } = this.state.branchChangeDetails;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    if (user.role === "admin") {
      alert("You cannot change an admin branch", "error");
      return this.toggleChangeBranch();
    }
    if (!branch) {
      return alert("You need to pick new branch", "error");
    }
    const details = { userId: user.id, branch };
    this.toggleChangeBranch();
    this.props.changeBranch(details);
  };

  render() {
    return (
      <TeamView
        showChangeBranch={this.state.showChangeBranch}
        showCreateMember={this.state.showCreateMember}
        showDeleteMember={this.state.showDeleteMember}
        setNewBranchDetail={this.setNewBranchDetail}
        setNewMemberDetail={this.setNewMemberDetail}
        toggleCreateMember={this.toggleCreateMember}
        toggleChangeBranch={this.toggleChangeBranch}
        toggleDeleteMember={this.toggleDeleteMember}
        setMemberToDelete={this.setMemberToDelete}
        memberToDelete={this.state.memberToDelete}
        currentUser={this.props.currentUser}
        changeBranch={this.changeUserBranch}
        deleteMember={this.deleteMember}
        newMember={this.state.newMember}
        createMember={this.createMember}
        branches={this.props.branches}
        members={this.props.members}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state),
  members: getAccounts(state),
  branches: getBranches(state)
});

export const Team = connect(
  mapStateToProps,
  { createNewMember, changeBranch, deleteMember }
)(Class);
