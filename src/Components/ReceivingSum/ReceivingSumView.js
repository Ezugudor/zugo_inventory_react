import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./ReceivingSumView.module.css";
import PropTypes from "prop-types";
import { Notification, Loading, Prompt } from "../Utils";
import React from "react";
import "./Tables.css";
import { EntityTable } from "./EntityTable";
import { NewEntity } from "./NewEntity";
import { ProcessEntity } from "./ProcessEntity";
import { RowDetails } from "./RowDetails";
import { DeleteEntity } from "./DeleteEntity";
import { EditEntity } from "./EditEntity";

export const ReceivingSumView = props => {
  return (
    <AdminLayout
      pageName="Receivings"
      pageSubtitle="Manage Codes and supplies"
      currentUser={props.currentUser}
      toggleGeneralReport={props.toggleGeneralReport}
    >
      <div className={Style.dashboard}>
        <div className={Style.StatCont}></div>
        <div className={Style.TablesCont}>
          <EntityTable
            toggleProcessEntity={props.toggleProcessEntity}
            toggleCreateEntity={props.toggleCreateEntity}
            toggleDeleteEntity={props.toggleDeleteEntity}
            toggleRowDetails={props.toggleRowDetails}
            setCurrentRow={props.setCurrentRow}
            toggleEditEntity={props.toggleEditEntity}
            receivings={props.receivings}
          />
        </div>
        <NewEntity
          showCreateEntity={props.showCreateEntity}
          toggleCreateEntity={props.toggleCreateEntity}
          setNewEntityDetail={props.setNewEntityDetail}
          addCodeToken={props.addCodeToken}
          removeCodeToken={props.removeCodeToken}
          addEntity={props.addEntity}
          stocks={props.stocks}
        />
        <EditEntity
          showEditEntity={props.showEditEntity}
          toggleEditEntity={props.toggleEditEntity}
          currentEntity={props.currentEntity}
        />
        <ProcessEntity
          showProcessEntity={props.showProcessEntity}
          toggleProcessEntity={props.toggleProcessEntity}
          setProcessEntityDetail={props.setProcessEntityDetail}
          currentEntity={props.currentEntity}
          customers={props.customers}
          outlets={props.outlets}
          drivers={props.drivers}
          processCode={props.processCode}
        />
        <RowDetails
          showRowDetails={props.showRowDetails}
          toggleRowDetails={props.toggleRowDetails}
          currentEntity={props.currentEntity}
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

ReceivingSumView.propTypes = {
  filterResponse: PropTypes.func.isRequired
};
