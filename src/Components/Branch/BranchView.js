import { ChangeBranch } from "./Branches/ChangeBranch";
import { DeleteBranch } from "./Branches/DeleteBranch";
import { AdminLayout } from "../../Hoc/Layouts";
import { NewBranch } from "./Branches/NewBranch";
import styles from "./BranchView.module.css";
import { Controls } from "./Controls";
import { Branches } from "./Branches";
import PropTypes from "prop-types";
import React from "react";

export const BranchView = props => (
  <AdminLayout pageName="branch">
    <div className={styles.team}>
      <Controls
        toggleCreateBranch={props.toggleCreateBranch}
        currentUser={props.currentUser}
      />
      <Branches
        setNewBranchDetail={props.setNewBranchDetail}
        toggleDeleteBranch={props.toggleDeleteBranch}
        setBranchToDelete={props.setBranchToDelete}
        branches={props.branches}
      />
      <NewBranch
        setNewBranchDetail={props.setNewBranchDetail}
        toggleCreateBranch={props.toggleCreateBranch}
        showCreateBranch={props.showCreateBranch}
        setSelectedLGA={props.setSelectedLGA}
        LGA={props.LGA}
        createBranch={props.createBranch}
        newBranch={props.newBranch}
        branches={props.branches}
      />
      <ChangeBranch
        setNewBranchDetail={props.setNewBranchDetail}
        toggleChangeBranch={props.toggleChangeBranch}
        showChangeBranch={props.showChangeBranch}
        changeBranch={props.changeBranch}
        branches={props.branches}
      />
      <DeleteBranch
        toggleDeleteBranch={props.toggleDeleteBranch}
        showDeleteBranch={props.showDeleteBranch}
        branchToDelete={props.branchToDelete}
        deleteBranch={props.deleteBranch}
      />
    </div>
  </AdminLayout>
);

BranchView.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  toggleCreateBranch: PropTypes.func.isRequired,
  toggleChangeBranch: PropTypes.func.isRequired,
  toggleDeleteBranch: PropTypes.func.isRequired,
  setBranchToDelete: PropTypes.func.isRequired,
  showChangeBranch: PropTypes.bool.isRequired,
  showCreateBranch: PropTypes.bool.isRequired,
  showDeleteBranch: PropTypes.bool.isRequired,
  branchToDelete: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  deleteBranch: PropTypes.func.isRequired,
  newBranch: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired,
  branchs: PropTypes.array.isRequired
};
