import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./CustomerView.module.css";
import PropTypes from "prop-types";
import { Notification, Loading, Prompt } from "../Utils";
import React from "react";
import "./Tables.css";
import { EntityTable } from "./EntityTable";
import { NewEntity } from "./NewEntity";
import { DeleteEntity } from "./DeleteEntity";
import { EditEntity } from "./EditEntity";

export const CustomerView = props => {
  return (
    <AdminLayout
      pageName="Customers"
      pageSubtitle="List"
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
            customers={props.customers}
          />
        </div>
        <NewEntity
          showCreateEntity={props.showCreateEntity}
          toggleCreateEntity={props.toggleCreateEntity}
          setNewEntityDetail={props.setNewEntityDetail}
          addEntity={props.addEntity}
        />
        <EditEntity
          showEditEntity={props.showEditEntity}
          toggleEditEntity={props.toggleEditEntity}
          setEditEntityDetail={props.setEditEntityDetail}
          updateEntity={props.updateEntity}
          editEntityDetails={props.editEntityDetails}
        />
        <DeleteEntity
          showDeleteEntity={props.showDeleteEntity}
          toggleDeleteEntity={props.toggleDeleteEntity}
          currentEntity={props.currentEntity}
          deleteEntity={props.deleteEntity}
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

CustomerView.propTypes = {
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
