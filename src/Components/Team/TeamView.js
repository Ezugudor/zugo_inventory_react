import { ChangeMember } from "./Members/ChangeMember";
import { DeleteMember } from "./Members/DeleteMember";
import { AdminLayout } from "../../Hoc/Layouts";
import { NewMember } from "./Members/NewMember";
import Styles from "./TeamView.module.css";
import { Controls } from "./Controls";
import { ActionBtns } from "./Members/ActionBtns";
import { MDBDataTable } from "mdbreact";
import { JQDatatable } from "../../plugins";
import { previewImage } from "../../store/actions/app";
import { dataStruct } from "./tableDataStructure";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import trashcanImage from "../../img/trash-can.svg";
import penImage from "../../img/pen.svg";
import { Notification, Loading, PopImage } from "../Utils";
import { White } from "../Utils/Buttons";
const moment = require("moment");
export const TeamVieww = props => (
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
        newMemberFormId={props.newMemberFormId}
        handleUpload={props.handleUpload}
        newMemberImageURL={props.newMemberImageURL}
      />
      <ChangeMember
        setUpdateUserDetail={props.setUpdateUserDetail}
        toggleUpdateUser={props.toggleUpdateUser}
        showUpdateUser={props.showUpdateUser}
        updateUser={props.updateUser}
        branches={props.branches}
        editMember={props.editMember}
        showNotification={props.showNotification}
        editMemberFormId={props.editMemberFormId}
        handleUpload={props.handleUpload}
        editMemberImageURL={props.editMemberImageURL}
      />
      <DeleteMember
        toggleDeleteMember={props.toggleDeleteMember}
        showDeleteMember={props.showDeleteMember}
        memberToDelete={props.memberToDelete}
        deleteMember={props.deleteMember}
      />
      <Loading showLoading={props.showLoading} />
      <Notification title={"Default Title"} message={"Default Body Message"} />
      <PopImage />
    </div>
  </AdminLayout>
);
const formatDate = rawDate => {
  return moment(rawDate).format("DD-MM-YYYY");
};
const showTeamMembers = props => {
  const { members } = props;
  const membersD = members.map(account => {
    const {
      branch,
      id,
      created,
      role,
      phone,
      name,
      email,
      shortId,
      imageURL
    } = account;
    const rowData = {
      avatar: (
        <div
          className={Styles.avatarCont}
          onClick={e => {
            props.callPreviewImage(account);
          }}
        >
          <img src={imageURL}></img>
        </div>
      ),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      role: role.charAt(0).toUpperCase() + role.slice(1),
      email,
      phone,
      id: shortId,
      created: formatDate(created),
      action: (
        <div>
          <ActionBtns
            trashcanImage={trashcanImage}
            penImage={penImage}
            setMemberToDelete={props.setMemberToDelete}
            populateUserDetail={props.populateUserDetail}
            account={account}
          />
        </div>
      )
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = membersD;
  ppDataS.title = `<i class="${Styles.tableTitleIcon} ion ion-ios-people"></i> <span class="${Styles.tableTitle}">Managers</span>`;
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

  return <JQDatatable hover data={ppDataS} />;
};

const mapDispatchToProps = dispatch => ({
  callPreviewImage(account) {
    dispatch(previewImage(account));
  }
});

export const TeamView = connect(
  null,
  mapDispatchToProps
)(TeamVieww);

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
