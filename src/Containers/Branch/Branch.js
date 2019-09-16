import {
  getAccounts,
  getBranches,
  getBusinessId,
  getBusinessColor
} from "../../store/selectors";
import { createNewBranch, changeBranch } from "../../store/actions";
import { getCurrentUser } from "../../store/selectors";
// import { deleteBranch } from "../../store/actions";
import { deleteBranch } from "../../store/actions/business";
import { BranchView } from "../../Components/Branch";
import { countryStates } from "../../utils";
import React, { Component } from "react";
import { connect } from "react-redux";
import { themeMaker } from "../../utils";
class Class extends Component {
  state = {
    showCreateBranch: false,
    showDeleteBranch: false,
    showChangeBranch: false,
    showNotification: false,
    branchToDelete: {},
    branchToChange: {},
    LGA: [],
    newBranch: {
      name: "",
      state: "",
      area: "",
      address: "",
      stateId: ""
    },
    branchChangeDetails: {
      user: "",
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
   * show create new branch modal
   */
  toggleCreateBranch = () => {
    this.setState(prevState => {
      return { showCreateBranch: !prevState.showCreateBranch };
    });
  };

  /**
   * build up new user properties
   * @param {string} key propterty name to set
   * @param {string} value the value set key to
   */
  setNewBranchDetail = info => {
    const newBranch = { ...this.state.newBranch };
    info.forEach(branchInfo => {
      let key = Object.keys(branchInfo)[0];
      let value = Object.values(branchInfo)[0];
      newBranch[key] = value;
    });
    this.setState({ newBranch });
  };

  /**
   * build up edit user properties
   * @param {string} key propterty name to set
   * @param {string} value the value set key to
   */
  setEditBranchDetail = (name, value) => {
    const newBranch = { ...this.state.branchToChange };

    newBranch[name] = value;
    this.setState({ branchToChange: newBranch });
  };

  getStateLGA = stateID => {
    return countryStates.find(o => {
      return o.state.id == stateID;
    }).state.locals;
  };

  getStateName = stateID => {
    return countryStates.find(o => {
      return o.state.id == stateID;
    }).state.name;
  };
  /**
   * set LGAs of a selected state
   * @param {string} stateId propterty name to set
   * Ezugudor addendum
   */
  setSelectedLGA = (stateId, mode = null) => {
    const LGA = this.getStateLGA(stateId);
    const stateName = this.getStateName(stateId);
    if (mode) {
      const newBranch = { ...this.state.branchToChange };
      newBranch["state"] = stateName;
      // newBranch["area"] = LGA;
      this.setState({ branchToChange: newBranch, LGA });
    } else {
      this.setNewBranchDetail([{ stateId: stateId }, { state: stateName }]);
      this.setState({ LGA });
    }
  };

  /**
   *create new team branch
   */
  createBranch = e => {
    e.preventDefault();
    const { currentUser } = this.props;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }
    if (
      !this.state.newBranch.name ||
      !this.state.newBranch.address ||
      !this.state.newBranch.area ||
      !this.state.newBranch.stateId ||
      !this.state.newBranch.state
    ) {
      return alert("Required field is not set");
    }
    const { name, state, area, address, stateId } = this.state.newBranch;
    const origin = `${window.location.origin}/branch`;
    const details = {
      name,
      area,
      address,
      state,
      stateId,
      origin,
      business: this.props.businessId
    };
    this.toggleCreateBranch();
    this.props.createNewBranch(details);
  };

  /**
   * show delete a branch modal
   */
  toggleDeleteBranch = () => {
    this.setState(prevState => {
      return { showDeleteBranch: !prevState.showDeleteBranch };
    });
  };

  /**
   * pick the user to delete
   * @param {object} branch branch object to be deleted
   */
  setBranchToDelete = branch => {
    this.setState({ branchToDelete: branch });
    this.toggleDeleteBranch();
  };

  /**
   * pick the branch to edit
   * @param {object} branch branch object to be deleted
   */
  setBranchToChange = branch => {
    console.log("toggle branch dteails", branch);
    const LGA = this.getStateLGA(branch.stateId);
    this.setState({ branchToChange: branch, LGA });
    this.toggleChangeBranch();
  };

  /**
   * delete a team branch
   */
  deleteBranch = () => {
    this.toggleDeleteBranch();
    const branch = this.state.branchToDelete;
    const { currentUser } = this.props;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }

    this.props.deleteBranch(branch);

    // alert("Unidentified operation");
  };

  /**
   * show change a branch's branch modal
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
  // setNewBranchDetail = (key, value, toggleModal = false) => {
  //   const details = { ...this.state.branchChangeDetails };
  //   details[key] = value;
  //   this.setState({ branchChangeDetails: details });
  //   if (toggleModal) {
  //     this.toggleChangeBranch();
  //   }
  // };

  /**
   * change a team branch branch
   */
  changeUserBranch = () => {
    const { currentUser } = this.props;
    const branch = { ...this.state.branchToChange };
    // console.log("propz.. final form info", this.state.newBranch);
    // console.log("propz.. final form ff", this.state.branchToChange);
    console.log("propz.. final form branchz");
    console.log("propz.. final form branch", branch);
    console.log("propz.. final form user", currentUser);
    // return;
    if (currentUser.role !== "admin") {
      return alert("You don't have access to perform this operation");
    }

    if (!branch) {
      // return alert("You need to pick new branch", "error");
    }

    const origin = `${window.location.origin}/branch`;
    const { deletedBy, _id, ...selectedDetails } = branch;
    const details = {
      business: this.props.businessId,
      origin,
      id: _id,
      ...selectedDetails
    };
    this.toggleChangeBranch();
    this.props.changeBranch(details);
  };

  render() {
    return (
      <BranchView
        showChangeBranch={this.state.showChangeBranch}
        showCreateBranch={this.state.showCreateBranch}
        showDeleteBranch={this.state.showDeleteBranch}
        showNotification={this.state.showNotification}
        setNewBranchDetail={this.setNewBranchDetail}
        setEditBranchDetail={this.setEditBranchDetail}
        setSelectedLGA={this.setSelectedLGA}
        LGA={this.state.LGA}
        popupTimer={this.popupTimer}
        toggleCreateBranch={this.toggleCreateBranch}
        toggleChangeBranch={this.toggleChangeBranch}
        toggleDeleteBranch={this.toggleDeleteBranch}
        setBranchToDelete={this.setBranchToDelete}
        setBranchToChange={this.setBranchToChange}
        branchToDelete={this.state.branchToDelete}
        branchToChange={this.state.branchToChange}
        currentUser={this.props.currentUser}
        changeBranch={this.changeUserBranch}
        deleteBranch={this.deleteBranch}
        newBranch={this.state.newBranch}
        createBranch={this.createBranch}
        branches={this.props.branches}
        branchs={this.props.branchs}
      />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  businessId: getBusinessId(state),
  businessColor: getBusinessColor(state),
  branchs: getAccounts(state),
  branches: getBranches(state)
});

export const Branch = connect(
  mapStateToProps,
  { createNewBranch, changeBranch, createNewBranch, deleteBranch }
)(Class);
