import { AdminLayout } from "../../Hoc/Layouts";
import Style from "./StocksView.module.css";
import PropTypes from "prop-types";
import { Inbox } from "./Inbox";
import { Notification, Loading, Prompt } from "../Utils";
import React from "react";
import { EditBusiness } from "./EditBusiness";
import "./Tables.css";
import { NewBusiness } from "./NewBusiness";
import { PreviewPayment } from "./PreviewPayment";
import { StockTable } from "./StockTable";
import { NewStock } from "./NewStock";
import { DeleteStock } from "./DeleteStock";
import { EditStock } from "./EditStock";

export const StocksView = props => {
  return (
    <AdminLayout
      pageName="Stocks"
      currentUser={props.currentUser}
      toggleGeneralReport={props.toggleGeneralReport}
    >
      <div className={Style.dashboard}>
        <div className={Style.StatCont}></div>
        <div className={Style.TablesCont}>
          <StockTable
            toggleCreateEntity={props.toggleCreateEntity}
            toggleDeleteEntity={props.toggleDeleteEntity}
            toggleEditEntity={props.toggleEditEntity}
            stocks={props.stocks}
          />
        </div>

        <PreviewPayment
          showPreviewPayment={props.showPreviewPayment}
          togglePreviewPayment={props.togglePreviewPayment}
        />
        <NewStock
          showCreateEntity={props.showCreateEntity}
          toggleCreateEntity={props.toggleCreateEntity}
          setNewEntityDetail={props.setNewEntityDetail}
          createEntity={props.addEntity}
        />
        <EditStock
          showEditEntity={props.showEditEntity}
          toggleEditEntity={props.toggleEditEntity}
          setEditEntityDetail={props.setEditEntityDetail}
          updateEntity={props.updateEntity}
          editEntityDetails={props.editEntityDetails}
        />
        <DeleteStock
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

StocksView.propTypes = {
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
