import {
  getAccounts,
  getBranches,
  getBusinessId,
  getBusinessColor
} from "../../store/selectors";
import { createNewMember, updateUser } from "../../store/actions";
import { getCurrentUser } from "../../store/selectors";
import { deleteMember } from "../../store/actions";
import { TeamView } from "../../Components/Team";
import React, { Component } from "react";
import { connect } from "react-redux";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    showCreateMember: false,
    showDeleteMember: false,
    showUpdateUser: false,
    showNotification: false,
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
      name: "",
      state: "",
      area: "",
      address: ""
    },
    userEditDetails: {
      user: "",
      role: "worker",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      branch: ""
    }
  };

  componentDidMount() {
    const { businessColor } = this.props;
    themeMaker(businessColor);
  }

  popupTimer = props => {
    if (props.closeTime) {
      setTimeout(() => {
        this.toggleNotification();
      }, props.closeTime);
    }
  };

  /**
   * open and close the the progress ui
   */
  toggleNotification = () => {
    this.setState(prevState => ({
      showNotification: !prevState.showNotification
    }));
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
  setNewMemberDetail = (key, value, elem) => {
    var regex = /^[0-9]+$/;
    if (key == "phone" && !value.match(regex) && value.length > 0) {
      alert("Only integer values are allowed in this field.");
      return;
    }
    elem.classList.remove("invalid");
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
      console.log(this.state.newMember);
      const mInputs = this.state.newMember;
      for (var aa in mInputs) {
        if (mInputs[aa].length <= 0) {
          console.log("fieldname", aa, "field value", mInputs[aa]);
          let elem = document.querySelector("input.email");
          if (aa == "email") {
            elem = document.querySelector("input.email");
          } else if (aa == "firstname") {
            elem = document.querySelector("input.firstname");
          } else if (aa == "lastname") {
            elem = document.querySelector("input.lastname");
          } else if (aa == "phone") {
            elem = document.querySelector("input.phone");
          } else if (aa == "role") {
            elem = document.querySelector("select.role");
          } else if (aa == "branch") {
            elem = document.querySelector("select.branch");
          }

          elem.classList.add("invalid");
        }
      }
      return alert("Required field is not set");
    }
    const { email, phone, role, branch } = this.state.newMember;
    const { firstname, lastname } = this.state.newMember;
    const origin = `${window.location.origin}/completesignup`;
    const name = `${firstname} ${lastname}`;
    const details = {
      email,
      name,
      firstname,
      lastname,
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
  toggleUpdateUser = () => {
    this.setState(prevState => {
      return { showUpdateUser: !prevState.showUpdateUser };
    });
  };

  /**
   * Record details of the user whose branch need to be changed
   * @param {string} key
   * @param {string} value
   * @param {boolean} toggleModal
   */

  setUpdateUserDetail = (key, value, toggleModal = false) => {
    console.log("detail to populate selected user fields", value);
    if (key !== "user") {
      var details = { ...this.state.userEditDetails };
      details[key] = value;
    } else {
      var details = { ...value };
      details["user"] = value;
    }
    console.log("detail after populstion", details);
    const fewDetails = {
      ...details,
      ...{ created: undefined, name: undefined, user: undefined }
    };
    this.setState({ userEditDetails: fewDetails });

    if (toggleModal) {
      this.toggleUpdateUser();
    }
  };
  setNewBranchDetail = (key, value, toggleModal = false) => {
    console.log("props in editelements", this.state);
    const details = { ...this.state.branchChangeDetails };
    details[key] = value;
    this.setState({ branchChangeDetails: details });
    if (toggleModal) {
      this.toggleUpdateUser();
    }
  };

  /**
   * change a team member branch
   */
  validateAndUpdateUser = () => {
    const { currentUser } = this.props;
    const {
      user,
      branch,
      firstname,
      lastname,
      email,
      phone,
      role
    } = this.state.userEditDetails;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    if (role === "admin") {
      alert("You cannot change an admin branch", "error");
      return this.toggleUpdateUser();
    }
    if (
      !branch &&
      !firstname &&
      !lastname &&
      !email &&
      !phone &&
      role == "worker"
    ) {
      return alert("You have not changed anything", "error");
    }
    const details = this.state.userEditDetails;
    this.toggleUpdateUser();
    this.props.updateUser(details);
  };

  render() {
    console.log("check the props", this.props);
    console.log("check the state", this.state);
    return (
      <TeamView
        showUpdateUser={this.state.showUpdateUser}
        showCreateMember={this.state.showCreateMember}
        showNotification={this.state.showNotification}
        popupTimer={this.popupTimer}
        showDeleteMember={this.state.showDeleteMember}
        setNewBranchDetail={this.setNewBranchDetail}
        setUpdateUserDetail={this.setUpdateUserDetail}
        setNewMemberDetail={this.setNewMemberDetail}
        toggleCreateMember={this.toggleCreateMember}
        toggleUpdateUser={this.toggleUpdateUser}
        toggleDeleteMember={this.toggleDeleteMember}
        setMemberToDelete={this.setMemberToDelete}
        memberToDelete={this.state.memberToDelete}
        currentUser={this.props.currentUser}
        updateUser={this.validateAndUpdateUser}
        deleteMember={this.deleteMember}
        newMember={this.state.newMember}
        editMember={this.state.userEditDetails}
        editBranch={this.state.branchChangeDetails.user}
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
  businessColor: getBusinessColor(state),
  members: getAccounts(state),
  branches: getBranches(state)
});

export const Team = connect(
  mapStateToProps,
  { createNewMember, updateUser, deleteMember }
)(Class);
