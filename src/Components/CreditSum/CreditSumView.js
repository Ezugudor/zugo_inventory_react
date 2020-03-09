import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./CreditSumView.module.css";
import PropTypes from "prop-types";
import { Notification, Loading, Prompt } from "../Utils";
import React from "react";
import "./Tables.css";
import { EntityTable } from "./EntityTable";
import { NewEntity } from "./NewEntity";
import { DeleteEntity } from "./DeleteEntity";
import { EditEntity } from "./EditEntity";
import { Deposit } from "./Deposit";

export const CreditSumView = props => {
  return (
    <AdminLayout
      pageName="Credit Book"
      pageSubtitle="Keeps record of debts."
      currentUser={props.currentUser}
      toggleGeneralReport={props.toggleGeneralReport}
    >
      <div className={Style.dashboard}>
        <div className={Style.StatCont}></div>
        <div className={Style.TablesCont}>
          <EntityTable
            toggleCreateEntity={props.toggleCreateEntity}
            chooseToProcess={props.chooseToProcess}
            toggleDeleteEntity={props.toggleDeleteEntity}
            toggleEditEntity={props.toggleEditEntity}
            credits={props.credits}
          />
        </div>
        <NewEntity
          showCreateEntity={props.showCreateEntity}
          toggleCreateEntity={props.toggleCreateEntity}
          setNewEntityDetail={props.setNewEntityDetail}
          addEntity={props.addEntity}
          customers={props.customers}
          outlets={props.outlets}
        />
        <EditEntity
          showEditEntity={props.showEditEntity}
          toggleEditEntity={props.toggleEditEntity}
          setEditEntityDetail={props.setEditEntityDetail}
          updateEntity={props.updateEntity}
          editEntityDetails={props.editEntityDetails}
          currentEntity={props.currentEntity}
          customers={props.customers}
          outlets={props.outlets}
          defaultCustomer={props.defaultCustomer}
          toggleReceiver={props.toggleReceiver}
        />
        <DeleteEntity
          showDeleteEntity={props.showDeleteEntity}
          toggleDeleteEntity={props.toggleDeleteEntity}
          currentEntity={props.currentEntity}
          deleteEntity={props.deleteEntity}
        />
        <Deposit
          showProcessEntity={props.showProcessEntity}
          toggleProcessEntity={props.toggleProcessEntity}
          currentEntity={props.currentEntity}
          setProcessEntityDetail={props.setProcessEntityDetail}
          processEntity={props.processEntity}
        />
        <Loading showLoading={props.showLoading} />
        <Notification
          title={"Default Title"}
          message={"Default Body Message"}
        />
      </div>
    </AdminLayout>
  );
};

CreditSumView.propTypes = {
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
