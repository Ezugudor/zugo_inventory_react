import {
  updateBusinessDataFromServer,
  filterByDate,
  registerBusiness,
  uploadLogo,
  approveBusiness,
  activateBusiness
} from "../../store/actions";
import { DashboardView } from "../../Components/Dashboard";
import React, { Component } from "react";
import {
  getCurrentUser,
  getUploadedFileData,
  getUploadStatus,
  getOutlets,
  getCreditPayment,
  getCustomerCredit,
  getCustomers
} from "../../store/selectors";
import { connect } from "react-redux";
import {
  getAllBusinesses,
  getApprovedBusinesses,
  getInactiveBusinesses,
  getBusinessId,
  getBusinessColor,
  getProgressIndicator
} from "../../store/selectors";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    endDate: "",
    startDate: "",
    responseTabToShow: "all",
    showApproved: false,
    showDisapproved: false,
    showActive: false,
    showInactive: false,
    showNotification: false,
    showLoading: false,
    showCreateBusiness: false,
    showPreviewSales: false,
    showPreviewPayment: false,
    showGeneralReport: false,
    showEditBusiness: false,
    popImage: { show: false, url: "", title: "" },
    memberToDelete: {},
    newBusinessDetails: { imageURL: null },
    branchChangeDetails: {
      name: "",
      state: "",
      area: "",
      address: ""
    },
    editBusinessDetails: {
      name: "",
      description: "",
      color: "",
      approved: "",
      deleted: "",
      logoUrl: "",
      formId: "edit-business"
    },
    selectedRow: { id: null, state: null }
    // prompts: {
    //   approve: {
    //     activating: {
    //       title: "Approve Business",
    //       visible: false
    //     },
    //     deactivating: {
    //       title: "Disapprove Business",
    //       visible: false
    //     }
    //   },
    //   inactive: {
    //     activating: {
    //       title: "Activate this Business",
    //       visible: false
    //     },
    //     deactivating: {
    //       title: "Deactivate this Business",
    //       visible: false
    //     }
    //   }
    // }
  };

  /**
   * open and close the the progress ui
   */
  toggleLoading = () => {
    this.setState(prevState => ({
      showLoading: !prevState.showLoading
    }));
  };

  switchResponseTab = tabName => {
    this.setState({ responseTabToShow: tabName });
  };

  handleDateChange = e => {
    const data = e.target.dataset;
    const state = { ...this.state };
    const val = e.target.value;

    state[data.dateType] = val;
    this.setState(state);
    let nonEmpty = 0;
    const elems = document.querySelectorAll("input[type=date]");
    elems.forEach(elem => {
      if (elem.value !== "") {
        nonEmpty++;
      }
    });

    if (nonEmpty === 0) {
      //timeout function is important important
      setTimeout(() => {
        this.filterResponse();
      }, 10);
    }
  };

  componentDidMount() {
    const { businessId, businessColor } = this.props;
    this.props.updateBusinessDataFromServer(this.props.businessId);
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

  filterResponse = () => {
    const { startDate, endDate } = this.state;
    if (startDate > endDate) {
      alert("Wrong date range selected", "error");
      return;
    }

    // this.toggleLoading();
    const { businessId } = this.props;
    this.props.filterByDate(businessId, startDate, endDate);
    // this.setState({ endDate: "", startDate: "" });
  };

  /**
   * show create new member modal
   */
  toggleCreateBusiness = () => {
    this.setState(prevState => {
      return { showCreateBusiness: !prevState.showCreateBusiness };
    });
  };

  /**
   * perform the correct publish action
   */
  confirmPrompt = type => {
    const user = this.props.currentUser;
    const { id: businessId, state } = this.state.selectedRow;
    const details = { user, state };

    switch (true) {
      case this.state.showActive:
        this.toggleActive();
        break;
      case this.state.showInactive:
        this.toggleInactive();
        break;
      case this.state.showApproved:
        this.toggleApproved();
        break;
      case this.state.showDisapproved:
        this.toggleDisapproved();
        break;

      default:
        break;
    }
    if (type == "approve") this.props.approveBusiness(businessId, details);
    if (type == "activate") this.props.activateBusiness(businessId, details);
  };

  /**
   * open the appropriate Publish/Unpublish modal
   */
  promptSelectorActivate = (e, promptState, businessId) => {
    this.setState({ selectedRow: { id: businessId, state: promptState } });
    if (promptState) {
      this.toggleInactive();
      return;
    }
    this.toggleActive();
  };

  promptSelectorApprove = (e, promptState, businessId) => {
    this.setState({ selectedRow: { id: businessId, state: promptState } });
    if (promptState) {
      this.toggleDisapproved();
      return;
    }
    this.toggleApproved();
  };

  /**
   * open and close the Publish/Live UI
   */
  toggleActive = () => {
    this.setState(prevState => ({
      showActive: !prevState.showActive
    }));
  };

  toggleInactive = () => {
    this.setState(prevState => ({
      showInactive: !prevState.showInactive
    }));
  };

  toggleApproved = () => {
    this.setState(prevState => ({
      showApproved: !prevState.showApproved
    }));
  };

  toggleDisapproved = () => {
    this.setState(prevState => ({
      showDisapproved: !prevState.showDisapproved
    }));
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

  setNewBusinessDetail = (e, type) => {
    const value = e.target.value;
    const bizDetails = { ...this.state.newBusinessDetails };
    bizDetails[type] = value;
    this.setState({ newBusinessDetails: bizDetails });
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
  // /**
  //  *create new team member
  //  */
  // createBusiness = e => {
  //   e.preventDefault();
  //   const { currentUser } = this.props;
  //   const {
  //     created,
  //     user,
  //     name,
  //     id,
  //     ...needed
  //   } = this.state.newBusinessDetails;

  //   if (currentUser.role !== "admin") {
  //     return alert("You don't have access to perform this operation");
  //   }
  //   if (!this.highlightInvalidFields(needed)) {
  //     alert("Required field is not set");
  //     return;
  //   }
  //   const { email, phone, role, branch } = this.state.newBusinessDetails;
  //   const { firstname, lastname, imageURL } = this.state.newBusinessDetails;
  //   const origin = `${window.location.origin}/completesignup`;
  //   const namee = `${firstname} ${lastname}`;
  //   const details = {
  //     email,
  //     name: namee,
  //     firstname,
  //     lastname,
  //     phone,
  //     role,
  //     origin,
  //     branch,
  //     imageURL,
  //     business: this.props.businessId
  //   };
  //   this.toggleCreateBusiness();
  //   this.props.createNewBusiness(details);
  // };

  /**
   * show delete a member modal
   */
  togglePreviewSales = () => {
    this.setState(prevState => {
      return { showPreviewSales: !prevState.showPreviewSales };
    });
  };

  togglePreviewPayment = () => {
    this.setState(prevState => {
      return { showPreviewPayment: !prevState.showPreviewPayment };
    });
  };
  toggleGeneralReport = () => {
    this.setState(prevState => {
      return { showGeneralReport: !prevState.showGeneralReport };
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
  setBusinessToDelete = user => {
    this.setState({ memberToDelete: user });
    this.toggleDeleteBusiness();
  };

  /**
   * delete a team member
   */
  deleteBusiness = () => {
    this.toggleDeleteBusiness();
    const user = this.state.memberToDelete;
    const { currentUser } = this.props;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    if (user && user.role === "admin") {
      alert("You cannot delete an admin account");
      return;
    } else if (user) {
      this.props.deleteBusiness(user);
      return;
    }
    alert("Unidentified operation");
  };

  /**
   * show change a member's branch modal
   */
  toggleEditBusiness = () => {
    this.setState(prevState => {
      return { showEditBusiness: !prevState.showEditBusiness };
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
    var details = { ...this.state.editBusinessDetails };
    details[key] = value;
    this.setState({ editBusinessDetails: details });
  };

  populateEditBusiness = (e, business) => {
    e.preventDefault();
    e.stopPropagation();
    var details = { ...this.state.editBusinessDetails, ...business };
    this.setState({ editBusinessDetails: details });
    this.toggleEditBusiness();
  };

  setNewBranchDetail = (key, value, toggleModal = false) => {
    const details = { ...this.state.branchChangeDetails };
    details[key] = value;
    this.setState({ branchChangeDetails: details });
    if (toggleModal) {
      this.toggleEditBusiness();
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
      const { newBusinessDetails, editBusinessDetails } = this.state;
      if (mode === "new") {
        newBusinessDetails.imageURL = this.props.uploadedFile.imageUrl;
        this.setState({ newBusinessDetails });
      } else {
        editBusinessDetails.imageURL = this.props.uploadedFile.imageUrl;
        this.setState({ editBusinessDetails });
      }
    });
  };

  /**
   *create new business
   */
  createBusiness = e => {
    console.log("seeing");
    const newBizDetails = { ...this.state.newBusinessDetails };

    // if (currentUser.role !== "admin") {
    //   return alert("You don't have access to perform this operation");
    // }
    // if (!this.highlightInvalidFields(needed)) {
    //   alert("Required field is not set");
    //   return;
    // }
    // const origin = `${window.location.origin}/completesignup`;
    const history = this.props.history;

    const details = {
      account: {
        branch: "HQ",
        role: "admin",
        firstname: newBizDetails.firstname,
        lastname: newBizDetails.lastname,
        email: newBizDetails.email,
        phone: newBizDetails.phone,
        password: newBizDetails.password,
        imageURL: newBizDetails.imageURL
      },
      name: newBizDetails.business_name
    };
    this.toggleCreateBusiness();
    this.props.registerBusiness(details, history);
  };

  render() {
    return (
      <DashboardView
        outlets={this.props.outlets}
        creditPayment={this.props.creditPayment}
        customerCredit={this.props.customerCredit}
        customers={this.props.customers}
        approvedBusiness={this.props.approvedBusiness}
        inactiveBusiness={this.props.inactiveBusiness}
        handleDateChange={this.handleDateChange}
        handleUpload={this.uploadImage}
        tabToShow={this.state.responseTabToShow}
        filterResponse={this.filterResponse}
        switchTab={this.switchResponseTab}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        currentUser={this.props.currentUsers}
        createBusiness={this.createBusiness}
        showNotification={this.state.showNotification}
        showEditBusiness={this.state.showEditBusiness}
        showCreateBusiness={this.state.showCreateBusiness}
        showLoading={this.props.progress}
        popupTimer={this.popupTimer}
        showPreviewSales={this.state.showPreviewSales}
        showPreviewPayment={this.state.showPreviewPayment}
        showGeneralReport={this.state.showGeneralReport}
        setNewBranchDetail={this.setNewBranchDetail}
        setUpdateUserDetail={this.setUpdateUserDetail}
        populateEditBusiness={this.populateEditBusiness}
        setNewBusinessDetail={this.setNewBusinessDetail}
        toggleCreateBusiness={this.toggleCreateBusiness}
        toggleEditBusiness={this.toggleEditBusiness}
        togglePreviewSales={this.togglePreviewSales}
        togglePreviewPayment={this.togglePreviewPayment}
        toggleGeneralReport={this.toggleGeneralReport}
        setBusinessToDelete={this.setBusinessToDelete}
        memberToDelete={this.state.memberToDelete}
        editBusinessDetails={this.state.editBusinessDetails}
        newBusinessDetails={this.state.newBusinessDetails}
        // prompts states
        showActive={this.state.showActive}
        showInactive={this.state.showInactive}
        showApproved={this.state.showApproved}
        showDisapproved={this.state.showDisapproved}
        // prompts togglers
        toggleActive={this.toggleActive}
        toggleInactive={this.toggleInactive}
        toggleApproved={this.toggleApproved}
        toggleDisapproved={this.toggleDisapproved}
        //selector
        promptSelectorApprove={this.promptSelectorApprove}
        promptSelectorActivate={this.promptSelectorActivate}
        //confirm prompt
        confirmPrompt={this.confirmPrompt}
      />
    );
  }
}
// console.log("checking allt he biz", )
const mapStateToProps = state => ({
  // allBusiness: getAllBusinesses(state),
  // approvedBusiness: getApprovedBusinesses(state),
  // inactiveBusiness: getInactiveBusinesses(state),
  currentUsers: getCurrentUser(state),
  outlets: getOutlets(state),
  creditPayment: getCreditPayment(state),
  customerCredit: getCustomerCredit(state),
  customers: getCustomers(state),
  businessId: getBusinessId(state)
  // businessColor: getBusinessColor(state),
  // progress: getProgressIndicator(state),
  // uploadedFile: getUploadedFileData(state),
  // uploadStatus: getUploadStatus(state)
});

export const Dashboard = connect(
  mapStateToProps,
  {
    updateBusinessDataFromServer,
    approveBusiness,
    activateBusiness,
    filterByDate,
    registerBusiness,
    uploadLogo
  }
)(Class);
