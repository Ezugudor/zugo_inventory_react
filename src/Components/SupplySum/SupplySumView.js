import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./SupplySumView.module.css";
import PropTypes from "prop-types";
import { Notification, Loading, Prompt } from "../Utils";
import React from "react";
import "./Tables.css";
import { EntityTable } from "./EntityTable";
import { NewEntity } from "./NewEntity";
import { DeleteEntity } from "./DeleteEntity";
import { EditEntity } from "./EditEntity";

export const SupplySumView = props => {
  return (
    <AdminLayout
      pageName="Supply"
      pageSubtitle="Aggregate"
      currentUser={props.currentUser}
      toggleGeneralReport={props.toggleGeneralReport}
    >
      <div className={Style.dashboard}>
        <div className={Style.StatCont}></div>
        <div className={Style.TablesCont}>
          <EntityTable
            toggleCreateEntity={props.toggleCreateEntity}
            toggleDeleteEntity={props.toggleDeleteEntity}
            toggleEditEntity={props.toggleEditEntity}
          />
        </div>
        <NewEntity
          showCreateEntity={props.showCreateEntity}
          toggleCreateEntity={props.toggleCreateEntity}
        />
        <EditEntity
          showEditEntity={props.showEditEntity}
          toggleEditEntity={props.toggleEditEntity}
        />
        <DeleteEntity
          showDeleteEntity={props.showDeleteEntity}
          toggleDeleteEntity={props.toggleDeleteEntity}
          currentEntity={props.currentEntity}
        />
        {/* <GenerateReport
          showGeneralReport={props.showGeneralReport}
          toggleGeneralReport={props.toggleGeneralReport}
        /> */}

        {/* <Inbox
          allBusiness={props.allBusiness}
          approvedBusiness={props.approvedBusiness}
          inactiveBusiness={props.inactiveBusiness}
          tabToShow={props.tabToShow}
          switchTab={props.switchTab}
          handleDateChange={props.handleDateChange}
          filterResponse={props.filterResponse}
          startDate={props.startDate}
          endDate={props.endDate}
          populateEditBusiness={props.populateEditBusiness}
          toggleCreateBusiness={props.toggleCreateBusiness}
          promptSelectorApprove={props.promptSelectorApprove}
          promptSelectorActivate={props.promptSelectorActivate}
        /> */}
        {/* <NewBusiness
          setNewBusinessDetail={props.setNewBusinessDetail}
          toggleCreateBusiness={props.toggleCreateBusiness}
          showCreateBusiness={props.showCreateBusiness}
          createBusiness={props.createBusiness}
          newBusinessDetails={props.newBusinessDetails}
          newBusinessFormId={props.newBusinessFormId}
          handleUpload={props.handleUpload}
          newBusinessImageURL={props.newBusinessImageURL}
        />
        <EditBusiness
          setUpdateUserDetail={props.setUpdateUserDetail}
          toggleEditBusiness={props.toggleEditBusiness}
          showEditBusiness={props.showEditBusiness}
          updateUser={props.updateUser}
          branches={props.branches}
          editBusinessDetails={props.editBusinessDetails}
          showNotification={props.showNotification}
          editBusinessFormId={props.editBusinessFormId}
          handleUpload={props.handleUpload}
          editBusinessImageURL={props.editBusinessImageURL}
        /> */}
        {/* <DeleteBusiness
        toggleDeleteBusiness={props.toggleDeleteBusiness}
        showDeleteBusiness={props.showDeleteBusiness}
        businessToDelete={props.businessToDelete}
        deleteBusiness={props.deleteBusiness}
      /> */}
        {/* <Loading showLoading={props.showLoading} />
        <Notification
          title={"Default Title"}
          message={"Default Body Message"}
        /> */}
        {/* <Prompt
          title="Approve Business"
          togglePrompt={props.toggleApproved}
          showPrompt={props.showApproved}
          form={"props.form"}
          type="approve"
          confirmAction={props.confirmPrompt}
        />
        <Prompt
          title="Disapprove Business"
          togglePrompt={props.toggleDisapproved}
          showPrompt={props.showDisapproved}
          form={"props.form"}
          type="approve"
          confirmAction={props.confirmPrompt}
        />
        <Prompt
          title="Activate this Business"
          togglePrompt={props.toggleActive}
          showPrompt={props.showActive}
          form={props.form}
          type="activate"
          confirmAction={props.confirmPrompt}
        />
        <Prompt
          title="Deactivate this Business"
          togglePrompt={props.toggleInactive}
          showPrompt={props.showInactive}
          form={props.form}
          type="activate"
          confirmAction={props.confirmPrompt}
        /> */}
      </div>
    </AdminLayout>
  );
};

SupplySumView.propTypes = {
  allBusiness: PropTypes.object.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  filterResponse: PropTypes.func.isRequired,
  approvedBusiness: PropTypes.object.isRequired,
  startDate: PropTypes.string.isRequired,
  tabToShow: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  inactiveBusiness: PropTypes.object.isRequired
};
