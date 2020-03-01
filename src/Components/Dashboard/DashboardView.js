import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./DashboardView.module.css";
import { DashboardControls } from "./controls";
import PropTypes from "prop-types";
import { Inbox } from "./Inbox";
import { Notification, Loading, Prompt } from "../Utils";
import React from "react";
import { EditBusiness } from "./EditBusiness";
import { NewBusiness } from "./NewBusiness";
import { PreviewSale } from "./PreviewSale";
import { PreviewPayment } from "./PreviewPayment";
import { GenerateReport } from "./GenerateReport";
import { StatItems } from "./StatItems";
import { HistorySales } from "./HistorySales";
import { HistoryPayment } from "./HistoryPayment";
import { QuickLaunch } from "./QuickLaunch";

export const DashboardView = props => {
  return (
    <AdminLayout
      pageName="Dashboard"
      currentUser={props.currentUser}
      toggleGeneralReport={props.toggleGeneralReport}
    >
      <div className={Style.dashboard}>
        <div className={Style.StatCont}>
          <StatItems
            outlets={props.outlets}
            customerCredit={props.customerCredit}
            creditPayment={props.creditPayment}
            customers={props.customers}
          />
        </div>
        <div className={Style.TablesCont}>
          <div className={`${Style.TableSales} col-md-6`}>
            <HistorySales
              togglePreviewSales={props.togglePreviewSales}
              outlets={props.outlets}
              currentUser={props.currentUsers}
            />
          </div>
          <div className={`${Style.TablePayment} col-md-6`}>
            <HistoryPayment
              creditPayment={props.creditPayment}
              togglePreviewPayment={props.togglePreviewPayment}
            />
          </div>
        </div>
        <QuickLaunch />
        <PreviewSale
          showPreviewSales={props.showPreviewSales}
          togglePreviewSales={props.togglePreviewSales}
        />
        <PreviewPayment
          showPreviewPayment={props.showPreviewPayment}
          togglePreviewPayment={props.togglePreviewPayment}
        />
        <GenerateReport
          showGeneralReport={props.showGeneralReport}
          toggleGeneralReport={props.toggleGeneralReport}
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

DashboardView.propTypes = {
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
