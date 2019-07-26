import { getAccounts, getBranches, getBusinessId } from "../../store/selectors";
import { createNewBranch, changeBranch } from "../../store/actions";
import { getCurrentUser } from "../../store/selectors";
// import { deleteBranch } from "../../store/actions";
import { deleteBranch } from "../../store/actions/business";
import { BranchView } from "../../Components/Branch";
import { countryStates } from "../../utils";
import React, { Component } from "react";
import { connect } from "react-redux";
class Class extends Component {
  state = {
    showCreateBranch: false,
    showDeleteBranch: false,
    showChangeBranch: false,
    branchToDelete: {},
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
   * set LGAs of a selected state
   * @param {string} stateId propterty name to set
   * Ezugudor addendum
   */
  setSelectedLGA = stateId => {
    const state = countryStates.find(o => {
      return o.state.id == stateId;
    }).state;
    const LGA = state.locals;
    const stateName = state.name;
    this.setNewBranchDetail([{ stateId: stateId }, { state: stateName }]);
    this.setState({ LGA });
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
      <BranchView
        showChangeBranch={this.state.showChangeBranch}
        showCreateBranch={this.state.showCreateBranch}
        showDeleteBranch={this.state.showDeleteBranch}
        setNewBranchDetail={this.setNewBranchDetail}
        setSelectedLGA={this.setSelectedLGA}
        LGA={this.state.LGA}
        toggleCreateBranch={this.toggleCreateBranch}
        toggleChangeBranch={this.toggleChangeBranch}
        toggleDeleteBranch={this.toggleDeleteBranch}
        setBranchToDelete={this.setBranchToDelete}
        branchToDelete={this.state.branchToDelete}
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
  branchs: getAccounts(state),
  branches: getBranches(state)
});

export const Branch = connect(
  mapStateToProps,
  { createNewBranch, changeBranch, createNewBranch, deleteBranch }
)(Class);