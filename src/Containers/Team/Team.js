import {
  getAccounts,
  getBranches,
  getBusinessId,
  getBusinessColor,
  getProgressIndicator,
  getUploadedFileData,
  getUploadStatus
} from "../../store/selectors";
import { createNewMember, updateUser, uploadLogo } from "../../store/actions";
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
    popImage: { show: false, url: "", title: "" },
    memberToDelete: {},
    newMember: {
      role: "worker",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      branch: "",
      imageURL: "",
      formId: "new-member"
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
      branch: "",
      imageURL: "",
      formId: "edit-member"
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
   * validate integer fields only
   * @param {string} key propterty name to set
   * @param {string} value the value set key to
   */
  validateIntegerField = (key, value) => {
    var regex = /^[0-9]+$/;
    if (key == "phone" && !value.match(regex) && value.length > 0) {
      alert("Only integer values are allowed in this field.");
      return false;
    }
    return true;
  };
  /**
   * build up new user properties
   * @param {string} key propterty name to set
   * @param {string} value the value set key to
   */
  setNewMemberDetail = (key, value, elem) => {
    if (!this.validateIntegerField(key, value)) return;

    elem.classList.remove("invalid");
    const newMember = { ...this.state.newMember };
    newMember[key] = value;
    this.setState({ newMember });
  };

  /**
   *create new team member
   */
  highlightInvalidFields = state => {
    if (
      !state.email ||
      !state.email.match(/^.+@[a-z]+\..+/) ||
      !state.firstname ||
      !state.lastname ||
      !state.branch ||
      !state.phone
    ) {
      const mInputs = state;
      for (var aa in mInputs) {
        if (mInputs[aa].length <= 0) {
          let elem = document.querySelector(`#${state.formId} input.email`);
          if (aa == "email") {
            elem = document.querySelector(`#${state.formId} input.email`);
          } else if (aa == "firstname") {
            elem = document.querySelector(`#${state.formId} input.firstname`);
          } else if (aa == "lastname") {
            elem = document.querySelector(`#${state.formId} input.lastname`);
          } else if (aa == "phone") {
            elem = document.querySelector(`#${state.formId} input.phone`);
          } else if (aa == "role") {
            elem = document.querySelector(`#${state.formId} select.role`);
          } else if (aa == "branch") {
            elem = document.querySelector(`#${state.formId} select.branch`);
          }

          elem.classList.add("invalid");
        }
      }
      return false;
    }
    return true;
  };
  /**
   *create new team member
   */
  createMember = e => {
    e.preventDefault();
    const { currentUser } = this.props;
    const { created, user, name, id, ...needed } = this.state.newMember;

    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    if (!this.highlightInvalidFields(needed)) {
      alert("Required field is not set");
      return;
    }
    const { email, phone, role, branch } = this.state.newMember;
    const { firstname, lastname, imageURL } = this.state.newMember;
    const origin = `${window.location.origin}/completesignup`;
    const namee = `${firstname} ${lastname}`;
    const details = {
      email,
      name: namee,
      firstname,
      lastname,
      phone,
      role,
      origin,
      branch,
      imageURL,
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
   * toggle image preview modal
   */
  togglePopImage = () => {
    this.setState(prevState => {
      const { popImage: clonePopImage } = prevState;
      clonePopImage.show = !prevState.popImage.show;
      return { popImage: clonePopImage };
    });
  };

  /**
   * prefill image preview modal and activate
   */
  setPopImage = ({ name, imageURL }) => {
    const popImage = { ...this.state.popImage };
    popImage.url = imageURL;
    popImage.title = name;
    this.setState({ popImage });
    this.togglePopImage();
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
      alert("You cannot delete an admin account");
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

  setUpdateUserDetail = (key, value, elem) => {
    if (!this.validateIntegerField(key, value)) return;

    elem.classList.remove("invalid");
    var details = { ...this.state.userEditDetails };
    details[key] = value;
    this.setState({ userEditDetails: details });
  };

  populateUserDetail = account => {
    var details = { ...this.state.userEditDetails, ...account };
    this.setState({ userEditDetails: details });
    this.toggleUpdateUser();
  };

  setNewBranchDetail = (key, value, toggleModal = false) => {
    const details = { ...this.state.branchChangeDetails };
    details[key] = value;
    this.setState({ branchChangeDetails: details });
    if (toggleModal) {
      this.toggleUpdateUser();
    }
  };

  /**
   * send file to be uploaded to S3 bucket
   * @param {object} file file to be uploaded
   */
  uploadImage = (file, mode) => {
    const formData = new FormData();
    const fileName = `userlogo`;
    formData.append("logo", file);
    this.props.uploadLogo(formData, fileName, this).then(() => {
      const { newMember, userEditDetails } = this.state;
      console.log("checking for mode after upload", mode);
      if (mode === "new") {
        newMember.imageURL = this.props.uploadedFile.imageUrl;
        this.setState({ newMember });
      } else {
        userEditDetails.imageURL = this.props.uploadedFile.imageUrl;
        this.setState({ userEditDetails });
      }
    });
  };

  /**
   * change a team member branch
   */
  validateAndUpdateUser = e => {
    e.preventDefault();
    const { created, user, name, id, ...needed } = this.state.userEditDetails;

    if (!this.highlightInvalidFields(needed)) {
      alert("Required field is not set");
      return;
    }
    const { currentUser } = this.props;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    const {
      branch,
      firstname,
      lastname,
      email,
      phone,
      role
    } = this.state.userEditDetails;

    if (role === "admin" && currentUser.role !== "admin") {
      alert("You don't have the permission to change this account", "error");
      return this.toggleUpdateUser();
    }
    if (
      !branch &&
      !firstname &&
      !phone &&
      !lastname &&
      !email &&
      role == "worker"
    ) {
      return alert("You have not changed anything", "error");
    }
    const {
      user: U,
      formId,
      created: C,
      ...others
    } = this.state.userEditDetails;
    this.toggleUpdateUser();
    others.business = this.props.businessId;
    this.props.updateUser(others);
  };

  render() {
    return (
      <TeamView
        showUpdateUser={this.state.showUpdateUser}
        showCreateMember={this.state.showCreateMember}
        showNotification={this.state.showNotification}
        showPopImage={this.state.popImage.show}
        popImageURL={this.state.popImage.url}
        popImageTitle={this.state.popImage.title}
        togglePopImage={this.togglePopImage}
        setPopImage={this.setPopImage}
        newMemberImageURL={this.state.newMember.imageURL}
        editMemberImageURL={this.state.userEditDetails.imageURL}
        popupTimer={this.popupTimer}
        showDeleteMember={this.state.showDeleteMember}
        setNewBranchDetail={this.setNewBranchDetail}
        setUpdateUserDetail={this.setUpdateUserDetail}
        populateUserDetail={this.populateUserDetail}
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
        newMemberFormId={this.state.newMember.formId}
        editMemberFormId={this.state.userEditDetails.formId}
        showLoading={this.props.progress}
        handleUpload={this.uploadImage}
      />
    );
  }
}

const mapStateToProps = state => ({
  uploadedFile: getUploadedFileData(state),
  uploadStatus: getUploadStatus(state),
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state),
  businessColor: getBusinessColor(state),
  members: getAccounts(state),
  branches: getBranches(state),
  progress: getProgressIndicator(state)
});

export const Team = connect(
  mapStateToProps,
  { uploadLogo, createNewMember, updateUser, deleteMember }
)(Class);
