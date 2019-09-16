import { ChangeMember } from "./Members/ChangeMember";
import { DeleteMember } from "./Members/DeleteMember";
import { AdminLayout } from "../../Hoc/Layouts";
import { NewMember } from "./Members/NewMember";
import Styles from "./TeamView.module.css";
import { Controls } from "./Controls";
import { ActionBtns } from "./Members/ActionBtns";
import { MDBDataTable } from "mdbreact";
import { JQDatatable } from "../../plugins";
// import { data } from "../Dashboard/data";
import { dataStruct } from "./tableDataStructure";
import PropTypes from "prop-types";
import React from "react";
import trashcanImage from "../../img/trash-can.svg";
import penImage from "../../img/pen.svg";
import { Notification } from "../Utils";
import { White } from "../Utils/Buttons";

export const TeamView = props => (
  <AdminLayout pageName="team" currentUser={props.currentUser}>
    <div className={Styles.team}>
      {/* <Controls
        toggleCreateMember={props.toggleCreateMember}
        currentUser={props.currentUser}
      /> */}
      <div className={Styles.tableCont}>{showTeamMembers(props)}</div>

      <NewMember
        setNewMemberDetail={props.setNewMemberDetail}
        toggleCreateMember={props.toggleCreateMember}
        showCreateMember={props.showCreateMember}
        createMember={props.createMember}
        newMember={props.newMember}
        branches={props.branches}
      />
      <ChangeMember
        setUpdateUserDetail={props.setUpdateUserDetail}
        toggleUpdateUser={props.toggleUpdateUser}
        showUpdateUser={props.showUpdateUser}
        updateUser={props.updateUser}
        branches={props.branches}
        editMember={props.editMember}
        showNotification={props.showNotification}
      />
      <DeleteMember
        toggleDeleteMember={props.toggleDeleteMember}
        showDeleteMember={props.showDeleteMember}
        memberToDelete={props.memberToDelete}
        deleteMember={props.deleteMember}
      />
      <Notification
        showNotification={props.showNotification}
        timer={props.popupTimer}
        toggleLoading={props.toggleNotification}
        title={"Default Title"}
        message={"Default Body Message"}
      />
    </div>
  </AdminLayout>
);

const showTeamMembers = props => {
  console.log("show members", props);
  console.log("partially processed", props);
  const { members } = props;
  const membersD = members.map(account => {
    const { branch, id, created, role, phone, name, email } = account;
    const rowData = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      role: role.charAt(0).toUpperCase() + role.slice(1),
      email,
      branch: branch.charAt(0).toUpperCase() + branch.slice(1),
      phone,
      id,
      created,
      action: (
        <div>
          <ActionBtns
            trashcanImage={trashcanImage}
            penImage={penImage}
            setMemberToDelete={props.setMemberToDelete}
            setMemberDetail={props.setUpdateUserDetail}
            account={account}
          />
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
  ppDataS.title = `<i class="${Styles.tableTitleIcon} ion ion-ios-people-outline"></i> Team`;
  ppDataS.newBtn = (
    <White
      className={Styles.btn}
      disabled={props.currentUser.role !== "admin" ? true : false}
      click={props.toggleCreateMember}
    >
      <i className={`ion ion-ios-plus ${Styles.controlIcon}`}></i>
      <span className={Styles.btnText}>New Member</span>
    </White>
  );
  console.log("gather data", ppDataS);
  return <JQDatatable hover data={ppDataS} />;
};

TeamView.propTypes = {
  setNewBranchDetail: PropTypes.func.isRequired,
  setNewMemberDetail: PropTypes.func.isRequired,
  toggleCreateMember: PropTypes.func.isRequired,
  toggleUpdateUser: PropTypes.func.isRequired,
  toggleDeleteMember: PropTypes.func.isRequired,
  setMemberToDelete: PropTypes.func.isRequired,
  showUpdateUser: PropTypes.bool.isRequired,
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
