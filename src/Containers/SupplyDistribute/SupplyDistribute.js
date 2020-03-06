import {
  addSupply,
  updateOutlet,
  deleteOutlet,
  updateOutletsData
} from "../../store/actions";
import { SupplyDistributeView } from "../../Components/SupplyDistribute";
import React, { Component } from "react";
import {
  getCurrentUser,
  getUploadedFileData,
  getUploadStatus
} from "../../store/selectors";
import { connect } from "react-redux";
import {
  getAllBusinesses,
  getApprovedBusinesses,
  getInactiveBusinesses,
  getBusinessId,
  getOutlets,
  getDrivers,
  getCustomers,
  getReceivings,
  getCurrentCode
} from "../../store/selectors";
import { themeMaker } from "../../utils";

class Class extends Component {
  state = {
    showNotification: false,
    showLoading: false,
    newEntityDetails: {
      is_outlet: false,
      receiver_name: "",
      receiver_id: "",
      mode: "mdd",
      driver_id: "",
      driver_name: "",
      driver_phone: "",
      truck_id: "",
      qty: "",
      source: "factory",
      payment_method: "full",
      amount: "",
      deposit: "",
      comment: ""
    },
    distribution: [],
    currentReceivings: ""
  };

  /**
   * open and close the the progress ui
   */
  toggleLoading = () => {
    this.setState(prevState => ({
      showLoading: !prevState.showLoading
    }));
  };

  componentDidMount() {
    const { businessId, businessColor } = this.props;

    const current = this.props.receivings.find(
      rec => rec.supply_code === this.props.currentCode
    );
    this.setState({ currentReceivings: current });
    this.props.updateOutletsData();
  }

  /**
   * set new entity field value
   * @param {string} key propterty name to set
   * @param {string} value the value set key to
   */

  setNewEntityDetail = (e, type, autoCompleteSelected = null) => {
    const value = autoCompleteSelected || e.target.value;
    const entityDetails = { ...this.state.newEntityDetails };
    entityDetails[type] = value;
    //prefill drivers info
    if (type === "driver_id") {
      const driver = this.props.drivers.find(
        dr => dr.id == autoCompleteSelected
      );
      entityDetails.driver_phone = driver.phone;
      entityDetails.truck_id = driver.truck_id;
    }
    this.setState({ newEntityDetails: entityDetails });
  };

  addTemporal = e => {
    e.preventDefault();
    e.stopPropagation();
    const newDetail = { ...this.state.newEntityDetails };
    const distribute = [...this.state.distribution, newDetail];
    this.setState({ distribution: distribute });
  };

  deleteTemporal = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const distribute = [...this.state.distribution];
    const newDist = distribute.filter((elem, index) => index !== id);
    this.setState({ distribution: newDist });
  };

  resetForm = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    // const distribute = [...this.state.distribution];
    // const newDist = distribute.filter((elem, index) => index !== id);
    this.setState({ newEntityDetails: {} });
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

  // addEntity = e => {
  //   e.preventDefault();
  //   this.toggleCreateEntity();
  //   const entity = this.state.newEntityDetails;
  //   console.log("new details", entity);
  //   this.props.addEntity(entity);
  //   return;
  // };
  addEntity = e => {
    e.preventDefault();

    const currentReceivings = this.state.currentReceivings;
    const distribution = this.state.distribution;
    const details = {
      current_receivings: currentReceivings,
      distribution: distribution
    };
    console.log("new details", details);
    this.props.addEntity(details, this.props.history);
    return;
  };

  render() {
    return (
      <SupplyDistributeView
        distributionData={this.state.distribution}
        outlets={this.props.outlets}
        customers={this.props.customers}
        currentReceivings={this.state.currentReceivings}
        drivers={this.props.drivers}
        currentUser={this.props.currentUser}
        currentEntity={this.state.currentEntity}
        setNewEntityDetail={this.setNewEntityDetail}
        addTemporal={this.addTemporal}
        deleteTemporal={this.deleteTemporal}
        resetForm={this.resetForm}
        addEntity={this.addEntity}
        updateEntity={this.updateEntity}
        deleteEntity={this.deleteEntity}
        newEntityDetails={this.state.newEntityDetails}
        showLoading={this.props.progress}
      />
    );
  }
}
// console.log("checking allt he biz", )
const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state),
  drivers: getDrivers(state),
  customers: getCustomers(state),
  outlets: getOutlets(state),
  receivings: getReceivings(state),
  currentCode: getCurrentCode(state)
});

export const SupplyDistribute = connect(
  mapStateToProps,
  {
    addEntity: addSupply,
    updateEntity: updateOutlet,
    deleteEntity: deleteOutlet,
    updateOutletsData
  }
)(Class);
