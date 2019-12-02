import { ChangeBranch } from "./Branches/ChangeBranch";
import { DeleteBranch } from "./Branches/DeleteBranch";
import { AdminLayout } from "../../Hoc/Layouts";
import { NewBranch } from "./Branches/NewBranch";
import styles from "./BranchView.module.css";
import { Controls } from "./Controls";
import { Branches } from "./Branches";
import { ActionBtns } from "./Branches/ActionBtns";
import { dataStruct } from "./tableDataStructure";
import { JQDatatable } from "../../plugins";
import PropTypes from "prop-types";
import React from "react";
import { White } from "../Utils/Buttons";
import { Notification, Loading } from "../Utils";

export const BranchView = props => (
  <AdminLayout pageName="branch">
    <div className={styles.team}>
      {/* <Controls
        toggleCreateBranch={props.toggleCreateBranch}
        currentUser={props.currentUser}
      /> */}
      <div className={styles.tableCont}>{showTeamMembers(props)}</div>
      {/* <Branches
        setNewBranchDetail={props.setNewBranchDetail}
        toggleDeleteBranch={props.toggleDeleteBranch}
        setBranchToDelete={props.setBranchToDelete}
        branches={props.branches}
      /> */}

      <NewBranch
        setNewBranchDetail={props.setNewBranchDetail}
        toggleCreateBranch={props.toggleCreateBranch}
        showCreateBranch={props.showCreateBranch}
        setSelectedLGA={props.setSelectedLGA}
        LGA={props.LGA}
        createBranch={props.createBranch}
        newBranch={props.newBranch}
        branches={props.branches}
        stripState={props.stripState}
        getArrangedState={props.getArrangedState}
      />
      <ChangeBranch
        setNewBranchDetail={props.setNewBranchDetail}
        setEditBranchDetail={props.setEditBranchDetail}
        toggleChangeBranch={props.toggleChangeBranch}
        showChangeBranch={props.showChangeBranch}
        setSelectedLGA={props.setSelectedLGA}
        LGA={props.LGA}
        changeBranch={props.changeBranch}
        branches={props.branches}
        branchToChange={props.branchToChange}
        stripState={props.stripState}
        getArrangedState={props.getArrangedState}
      />
      <DeleteBranch
        toggleDeleteBranch={props.toggleDeleteBranch}
        showDeleteBranch={props.showDeleteBranch}
        branchToDelete={props.branchToDelete}
        deleteBranch={props.deleteBranch}
      />
      <Loading showLoading={props.showLoading} />
      <Notification title={"Default Title"} message={"Default Body Message"} />
    </div>
  </AdminLayout>
);

const showTeamMembers = props => {
  const { branches } = props;
  const membersD = branches.map(branch => {
    const { name, address, state, area } = branch;
    const rowData = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      address: address.charAt(0).toUpperCase() + address.slice(1),
      state,
      area: area.charAt(0).toUpperCase() + area.slice(1),
      action: (
        <div>
          <ActionBtns
            setNewBranchDetail={props.setNewBranchDetail}
            toggleDeleteBranch={props.toggleDeleteBranch}
            toggleChangeBranch={props.toggleChangeBranch}
            setBranchToDelete={props.setBranchToDelete}
            setBranchToChange={props.setBranchToChange}
            branch={branch}
          />
        </div>
      )
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = membersD;
  ppDataS.title = `<i class="${styles.tableTitleIcon} ion ion-ios-location-outline"></i> Branches`;
  ppDataS.newBtn = (
    <White
      className={styles.btn}
      disabled={props.currentUser.role !== "admin" ? true : false}
      click={props.toggleCreateBranch}
    >
      <i className={`ion ion-ios-plus ${styles.controlIcon}`}></i>
      <span className={styles.btnText}>New Branch</span>
    </White>
  );

  return <JQDatatable hover data={ppDataS} />;
};

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
