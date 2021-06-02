import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./SupplyPreviewView.module.css";
import PropTypes from "prop-types";
import { Notification, Loading, Prompt } from "../Utils";
import React from "react";
import "./Tables.css";
import { EntityTable } from "./EntityTable";

export const SupplyPreviewView = props => {
  return (
    <AdminLayout
      pageName="Supply details for:"
      pageSubtitle={
        <span className={Style.SubTitle}>
          <span className={Style.SubTitle1}>
            {props.currentReceivings.supply_code}
          </span>
          <span className={Style.SubTitle2}>
            {`( ${props.currentReceivings.size}Tons )`}
          </span>
        </span>
      }
      currentUser={props.currentUser}
      toggleGeneralReport={props.toggleGeneralReport}
    >
      <div className={Style.dashboard}>
        <div className={Style.TablesCont}>
          <EntityTable
            toggleCreateEntity={props.toggleCreateEntity}
            toggleDeleteEntity={props.toggleDeleteEntity}
            toggleEditEntity={props.toggleEditEntity}
            outlets={props.outlets}
            distributionData={props.distributionData}
            addEntity={props.addEntity}
            deleteTemporal={props.deleteTemporal}
            currentCodeSupplies={props.currentCodeSupplies}
          />
        </div>

        <Loading showLoading={props.showLoading} />
        <Notification
          title={"Default Title"}
          message={"Default Body Message"}
        />
      </div>
    </AdminLayout>
  );
};

SupplyPreviewView.propTypes = {
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
