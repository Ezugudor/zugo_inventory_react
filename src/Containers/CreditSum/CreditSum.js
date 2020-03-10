import {
  filterByDate,
  registerBusiness,
  uploadLogo,
  addCredit,
  addPayment,
  updateCredit,
  deleteCredit,
  updateCreditsData,
  approveBusiness,
  activateBusiness
} from "../../store/actions";
import { CreditSumView } from "../../Components/CreditSum";
import React, { Component } from "react";
import {
  getCurrentUser,
  getCustomerCredit,
  getCustomers,
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
    defaultCustomer: true,
    showLoading: false,
    showCreateEntity: false,
    showEditEntity: false,
    showDeleteEntity: false,
    showProcessEntity: false,
    currentEntity: { name: "default text" },
    newEntityDetails: {
      is_outlet: false,
      receiver_name: "",
      receiver_id: "",
      amount: "",
      comment: ""
    },
    editEntityDetails: {
      is_outlet: false,
      receiver_name: "",
      receiver_id: "",
      amount: "",
      comment: ""
    },
    processEntityDetails: {
      is_outlet: false,
      receipt_id: null,
      payment_method: "cash",
      amount: "",
      comment: ""
    }
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
    this.props.updateCreditsData();
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
  toggleCreateEntity = () => {
    this.setState(prevState => {
      return { showCreateEntity: !prevState.showCreateEntity };
    });
  };

  /**
   * show create process modal
   */
  toggleProcessEntity = () => {
    this.setState(prevState => {
      return { showProcessEntity: !prevState.showProcessEntity };
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
  toggleEditEntity = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(prevState => {
      return { showEditEntity: !prevState.showEditEntity };
    });
  };

  toggleDeleteEntity = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
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

  /**
   * show change a member's branch modal
   */
  toggleEditEntity = (e, id = null) => {
    e.preventDefault();
    e.stopPropagation();
    //for close button togglers
    if (id == null) {
      this.setState(prevState => {
        return {
          showEditEntity: !prevState.showEditEntity
        };
      });
      return;
    }
    if (id) this.setCurrentRow(id);
    const entity = [...this.props.credits];
    const current = entity.find(elem => elem.id == id);
    if (current.is_outlet == "1") {
      this.setState(prevState => {
        return {
          showEditEntity: !prevState.showEditEntity,
          defaultCustomer: false
        };
      });
    } else {
      this.setState(prevState => {
        return {
          showEditEntity: !prevState.showEditEntity,
          defaultCustomer: true
        };
      });
    }
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

  setNewEntityDetail = (e, type, autoCompleteSelected = null) => {
    const value = autoCompleteSelected || e.target.value;
    const entityDetails = { ...this.state.newEntityDetails };
    entityDetails[type] = value;
    this.setState({ newEntityDetails: entityDetails });
  };

  setEditEntityDetail = (e, type, autoCompleteSelected = null) => {
    const value = autoCompleteSelected || e.target.value;
    const entityDetails = { ...this.state.editEntityDetails };
    entityDetails[type] = value;
    this.setState({ editEntityDetails: entityDetails });
  };

  addEntity = e => {
    e.preventDefault();
    this.toggleCreateEntity();
    const entity = this.state.newEntityDetails;
    // console.log("new details", entity);
    this.props.addEntity(entity);
    return;
  };

  updateEntity = e => {
    e.preventDefault();
    this.toggleEditEntity(e);
    const entity = this.state.editEntityDetails;
    // console.log("edit details", entity);
    // console.log("edit details", this.state.currentEntity.id);
    this.props.updateEntity(this.state.currentEntity.id, entity);
    return;
  };

  deleteEntity = e => {
    e.preventDefault();
    this.toggleDeleteEntity(e);
    const entity = this.state.currentEntity;
    const { currentUser } = this.props;
    if (currentUser.role !== 3) {
      return alert("You don't have access to perform this operation");
    }
    this.props.deleteEntity(entity);
    return;
  };

  chooseToProcess = (e, id) => {
    e.preventDefault();
    this.setCurrentRow(id);
    this.prefillProcessDetail(id);
    this.toggleProcessEntity(e);
    return;
  };

  processEntity = (e, id) => {
    e.preventDefault();
    this.toggleProcessEntity(e);
    const entity = this.state.processEntityDetails;
    // console.log("process entity details", entity);
    this.props.processEntity(entity, id);
    return;
  };

  prefillProcessDetail = id => {
    const entity = [...this.props.credits];
    const current = entity.find(elem => elem.id == id);
    const {
      id: entityId,
      is_outlet,
      outlet_id,
      customer_id,
      comment,
      balance
    } = current;
    const entityDetail = { ...this.state.processEntityDetails };
    entityDetail.id = entityId;
    entityDetail.customer_id = customer_id;
    entityDetail.comment = comment;
    entityDetail.outlet_id = outlet_id;
    entityDetail.is_outlet = is_outlet;
    entityDetail.balance = balance;
    this.setState({ processEntityDetails: entityDetail });
  };

  setCurrentRow = id => {
    const entity = [...this.props.credits];
    const current = entity.find(elem => elem.id == id);
    const {
      id: entityId,
      is_outlet,
      outlet_id,
      customer_id,
      comment,
      balance
    } = current;
    const editDetail = { ...this.state.editEntityDetails };
    editDetail.id = entityId;
    editDetail.customer_id = customer_id;
    // editDetail.amount = amount;
    editDetail.balance = balance;
    editDetail.comment = comment;
    editDetail.outlet_id = outlet_id;
    editDetail.is_outlet = is_outlet;
    this.setState({ currentEntity: current, editEntityDetails: editDetail });
  };

  toggleReceiver = e => {
    e.preventDefault();
    this.setState(prevState => ({
      defaultCustomer: !prevState.defaultCustomer
    }));
  };

  render() {
    return (
      <CreditSumView
        credits={this.props.credits}
        customers={this.props.customers}
        outlets={this.props.outlets}
        chooseToProcess={this.chooseToProcess}
        processEntity={this.processEntity}
        currentUser={this.props.currentUser}
        currentEntity={this.state.currentEntity}
        addEntity={this.addEntity}
        updateEntity={this.updateEntity}
        deleteEntity={this.deleteEntity}
        editEntityDetails={this.state.editEntityDetails}
        setNewEntityDetail={this.setNewEntityDetail}
        setEditEntityDetail={this.setEditEntityDetail}
        setProcessEntityDetail={this.setProcessEntityDetail}
        createBusiness={this.createBusiness}
        showNotification={this.state.showNotification}
        showDeleteEntity={this.state.showDeleteEntity}
        showCreateEntity={this.state.showCreateEntity}
        showEditEntity={this.state.showEditEntity}
        showProcessEntity={this.state.showProcessEntity}
        showLoading={this.props.progress}
        popupTimer={this.popupTimer}
        showPreviewSales={this.state.showPreviewSales}
        showPreviewPayment={this.state.showPreviewPayment}
        toggleProcessEntity={this.toggleProcessEntity}
        toggleCreateEntity={this.toggleCreateEntity}
        toggleEditEntity={this.toggleEditEntity}
        toggleDeleteEntity={this.toggleDeleteEntity}
        toggleReceiver={this.toggleReceiver}
        defaultCustomer={this.state.defaultCustomer}
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
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state),
  credits: getCustomerCredit(state),
  customers: getCustomers(state),
  outlets: getOutlets(state)
});

export const CreditSum = connect(
  mapStateToProps,
  {
    processEntity: addPayment,
    addEntity: addCredit,
    updateEntity: updateCredit,
    deleteEntity: deleteCredit,
    updateCreditsData,
    uploadLogo
  }
)(Class);
