import {
  filterByDate,
  registerBusiness,
  uploadLogo,
  updateReceivingsData,
  addEntity,
  processCode
} from "../../store/actions";
import { ReceivingSumView } from "../../Components/ReceivingSum";
import React, { Component } from "react";
import {
  getCurrentUser,
  getReceivings,
  getCustomers,
  getDrivers,
  getStocks,
  getOutlets,
  getUploadedFileData,
  getUploadStatus
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
    showNotification: false,
    showLoading: false,
    showCreateEntity: false,
    showProcessEntity: false,
    showEditEntity: false,
    showRowDetails: false,
    showDeleteEntity: false,
    currentEntity: { name: "default text" },
    newEntityDetails: {
      codes: [],
      item: "",
      size: ""
    },
    processEntityDetails: {
      is_outlet: false,
      receiver: "",
      mode: "mdd",
      driver: "",
      driver_phone: "",
      truck_id: "",
      source: "factory"
    },
    editEntityDetails: {
      name: "",
      description: "",
      color: "",
      approved: "",
      deleted: "",
      logoUrl: "",
      formId: "edit-business"
    }
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
    // themeMaker(businessColor);
    this.props.updateReceivingsData(this.props.businessId);
  }

  popupTimer = props => {
    if (props.closeTime) {
      setTimeout(() => {
        this.toggleNotification();
      }, props.closeTime);
    }
  };

  /**
   * set new entity field value
   * @param {string} key propterty name to set
   * @param {string} value the value set key to
   */

  setNewEntityDetail = (e, type, autoCompleteSelected = null) => {
    const value = autoCompleteSelected || e.target.value;
    const entityDetails = { ...this.state.newEntityDetails };
    entityDetails[type] = value;
    this.setState({ newEntityDetails: entityDetails });
  };

  setProcessEntityDetail = (e, type, autoCompleteSelected = null) => {
    const value = autoCompleteSelected || e.target.value;
    const entityDetails = { ...this.state.processEntityDetails };
    entityDetails[type] = value;
    this.setState({ processEntityDetails: entityDetails });
  };

  addCodeToken = (e, value, txt) => {
    const entityDetails = { ...this.state.newEntityDetails };
    const newCodes = [...entityDetails.codes, value];
    entityDetails["codes"] = newCodes;
    this.setState({ newEntityDetails: entityDetails });
  };

  removeCodeToken = (e, value, txt) => {
    const entityDetails = { ...this.state.newEntityDetails };
    const { codes } = entityDetails;
    const newCodes = codes.filter(code => code !== value);
    entityDetails["codes"] = newCodes;

    this.setState({ newEntityDetails: entityDetails });
  };

  addEntity = e => {
    e.preventDefault();
    this.toggleCreateEntity();
    const entity = this.state.newEntityDetails;
    console.log("new details", entity);
    this.props.addEntity(entity);
    return;
  };
  processCode = (e, id) => {
    e.preventDefault();
    this.toggleProcessEntity(e);
    const entity = this.state.processEntityDetails;
    console.log("process details", entity);
    this.props.processCode(entity, id);
    return;
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
  toggleCreateEntity = () => {
    this.setState(prevState => {
      return { showCreateEntity: !prevState.showCreateEntity };
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
    // if (type == "approve") this.props.approveBusiness(businessId, details);
    // if (type == "activate") this.props.activateBusiness(businessId, details);
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
    this.toggleDeleteEntity();
  };

  /**
   * delete a team member
   */
  deleteBusiness = () => {
    this.toggleDeleteEntity();
    const entity = this.state.currentEntity;
    const { currentUser } = this.props;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }

    this.props.deleteEntity(entity);
    return;
  };

  /**
   * show change a member's branch modal
   */
  toggleProcessEntity = (e, id = null) => {
    e.preventDefault();
    e.stopPropagation();
    if (id) this.setCurrentRow(id);
    this.setState(prevState => {
      return { showProcessEntity: !prevState.showProcessEntity };
    });
  };
  toggleEditEntity = (e, id = null) => {
    e.preventDefault();
    e.stopPropagation();
    if (id) this.setCurrentRow(id);
    this.setState(prevState => {
      return { showEditEntity: !prevState.showEditEntity };
    });
  };
  setCurrentRow = id => {
    const receivings = [...this.props.receivings];
    const current = receivings.find(elem => elem.id == id);

    this.setState({ currentEntity: current });
  };
  toggleRowDetails = (e, id = null) => {
    e.preventDefault();
    e.stopPropagation();
    if (id) this.setCurrentRow(id);
    this.setState(prevState => {
      return { showRowDetails: !prevState.showRowDetails };
    });
  };

  toggleDeleteEntity = (e, id = null) => {
    e.preventDefault();
    e.stopPropagation();
    if (id) this.setCurrentRow(id);
    this.setState(prevState => {
      return { showDeleteEntity: !prevState.showDeleteEntity };
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
      <ReceivingSumView
        addEntity={this.addEntity}
        processCode={this.processCode}
        setNewEntityDetail={this.setNewEntityDetail}
        setProcessEntityDetail={this.setProcessEntityDetail}
        addCodeToken={this.addCodeToken}
        removeCodeToken={this.removeCodeToken}
        receivings={this.props.receivings}
        customers={this.props.customers}
        drivers={this.props.drivers}
        stocks={this.props.stocks}
        outlets={this.props.outlets}
        currentUser={this.props.currentUser}
        currentEntity={this.state.currentEntity}
        createBusiness={this.createBusiness}
        showNotification={this.state.showNotification}
        showDeleteEntity={this.state.showDeleteEntity}
        showProcessEntity={this.state.showProcessEntity}
        showCreateEntity={this.state.showCreateEntity}
        showEditEntity={this.state.showEditEntity}
        showRowDetails={this.state.showRowDetails}
        showLoading={this.props.progress}
        popupTimer={this.popupTimer}
        showPreviewSales={this.state.showPreviewSales}
        showPreviewPayment={this.state.showPreviewPayment}
        toggleProcessEntity={this.toggleProcessEntity}
        toggleCreateEntity={this.toggleCreateEntity}
        toggleEditEntity={this.toggleEditEntity}
        toggleRowDetails={this.toggleRowDetails}
        toggleDeleteEntity={this.toggleDeleteEntity}
        setCurrentRow={this.setCurrentRow}
        //selector
        promptSelectorActivate={this.promptSelectorActivate}
        //confirm prompt
        confirmPrompt={this.confirmPrompt}
      />
    );
  }
}
// console.log("checking allt he biz", )
const mapStateToProps = state => ({
  drivers: getDrivers(state),
  customers: getCustomers(state),
  stocks: getStocks(state),
  outlets: getOutlets(state),
  receivings: getReceivings(state),
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state)
});

export const ReceivingSum = connect(
  mapStateToProps,
  {
    updateReceivingsData,
    addEntity,
    processCode,
    filterByDate,
    registerBusiness,
    uploadLogo
  }
)(Class);
