import { ChangeBranch } from "./Members/ChangeBranch";
import { DeleteMember } from "./Members/DeleteMember";
import { AdminLayout } from "../../Hoc/Layouts";
import { NewMember } from "./Members/NewMember";
import styles from "./TeamView.module.css";
import { Controls } from "./Controls";
import { Members } from "./Members";
import PropTypes from "prop-types";
import React from "react";

export const TeamView = props => (
  <AdminLayout pageName="team">
    <div className={styles.team}>
      <Controls
        toggleCreateMember={props.toggleCreateMember}
        currentUser={props.currentUser}
      />
      <Members
        setNewBranchDetail={props.setNewBranchDetail}
        toggleDeleteMember={props.toggleDeleteMember}
        setMemberToDelete={props.setMemberToDelete}
        members={props.members}
      />
      <NewMember
        setNewMemberDetail={props.setNewMemberDetail}
        toggleCreateMember={props.toggleCreateMember}
        showCreateMember={props.showCreateMember}
        createMember={props.createMember}
        newMember={props.newMember}
        branches={props.branches}
      />
      <ChangeBranch
        setNewBranchDetail={props.setNewBranchDetail}
        toggleChangeBranch={props.toggleChangeBranch}
        showChangeBranch={props.showChangeBranch}
        changeBranch={props.changeBranch}
        branches={props.branches}
      />
      <DeleteMember
        toggleDeleteMember={props.toggleDeleteMember}
        showDeleteMember={props.showDeleteMember}
        memberToDelete={props.memberToDelete}
        deleteMember={props.deleteMember}
      />
    </div>
  </AdminLayout>
);

TeamView.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setNewMemberDetail: PropTypes.func.isRequired,
  toggleCreateMember: PropTypes.func.isRequired,
  toggleChangeBranch: PropTypes.func.isRequired,
  toggleDeleteMember: PropTypes.func.isRequired,
  setMemberToDelete: PropTypes.func.isRequired,
  showChangeBranch: PropTypes.bool.isRequired,
  showCreateMember: PropTypes.bool.isRequired,
  showDeleteMember: PropTypes.bool.isRequired,
  memberToDelete: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  createMember: PropTypes.func.isRequired,
  deleteMember: PropTypes.func.isRequired,
  newMember: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired
};
