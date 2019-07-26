import { ChangeBranch } from "./Members/ChangeBranch";
import { DeleteMember } from "./Members/DeleteMember";
import { AdminLayout } from "../../Hoc/Layouts";
import { NewMember } from "./Members/NewMember";
import styles from "./TeamView.module.css";
import { Controls } from "./Controls";
import { Delete, Change } from "./Members/ActionBtns";
import { MDBDataTable } from "mdbreact";
import { data } from "../Dashboard/data";
import { dataStruct } from "./tableDataStructure";
import PropTypes from "prop-types";
import React from "react";
import trashcanImage from "../../img/trash-can.svg";
import penImage from "../../img/pen.svg";

export const TeamView = props => (
  <AdminLayout pageName="team">
    <div className={styles.team}>
      <Controls
        toggleCreateMember={props.toggleCreateMember}
        currentUser={props.currentUser}
      />
      {showTeamMembers(props)}
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
        editMember={props.editMember}
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

const showTeamMembers = props => {
  console.log("show members", props);
  console.log("partially processed", props);
  const { members } = props;
  const membersD = members.map(res => {
    const { branch, id, created, role, phone, name, email } = res;
    const rowData = {
      name,
      role,
      email,
      branch,
      phone,
      id,
      created,
      action: (
        <div>
          <Delete trashcanImage={trashcanImage} />{" "}
          <Change penImage={penImage} />
        </div>
      )
    };

    return rowData;

    // console.log("gather data", note, branche, id, createdAt, formName);
    // <InboxItem
    //   formName={res.form.name}
    //   date={res.createdAt}
    //   note={getNote(res)}
    //   type="pending"
    //   key={res.id}
    //   id={res.id}
    // />
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = membersD;
  console.log("gather data", ppDataS);
  return <MDBDataTable hover data={ppDataS} />;
};

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
