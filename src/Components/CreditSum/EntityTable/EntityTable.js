import PropTypes from "prop-types";
import React, { Component } from "react";
import { dataStruct } from "./tableDataStructure";
import Style from "./EntityTable.module.css";
// import SharedStyle from "../Tables.module.css";
import { JQDatatable } from "../../../plugins";
import { White, Red } from "../../Utils/Buttons";
import { ActionBtns } from "./ActionBtns";
import { Money } from "../../../plugins";

const moment = require("moment");
export class Class extends Component {
  state = {
    showNewForm: false,
    newFormName: ""
  };

  componentWillMount() {
    this.formType = this.props.history.location.state.params;
  }
}
export const EntityTable = props => (
  <section>
    <div className={Style.tableCont}>{showResponse(props)}</div>
  </section>
);
const formatDate = rawDate => {
  return moment(rawDate).format("DD-MM-YYYY");
};
const getStatus = (id, balance, props) => {
  return balance > 0 ? (
    <a
      href="#"
      className={Style.depositBtn}
      onClick={e => props.chooseToProcess(e, id)}
    >
      Deposit
    </a>
  ) : (
    <span className={Style.complete}>Completed</span>
  );
};

const getBusinessInfo = (id, businesses) => {
  const businessInfo = businesses.find(business => id == business._id);
  const { name, logoUrl, description, color, approved, deleted } = businessInfo;
  return { name, logoUrl, description, color, approved, deleted };
};
let Bizz;
const showResponse = props => {
  const ppData = props.credits.map((res, index) => {
    const {
      id,
      customer_surname,
      customer_firstname,
      is_outlet,
      outlet_name,
      total_amount,
      balance,
      sku_code,
      is_auto_generated,
      author,
      comment,
      created_at
    } = res;
    const rowData = {
      id,
      customer: is_outlet == 0 ? customer_surname || customer_firstname : "-",
      outlet: is_outlet == 1 ? outlet_name : "-",
      amount: <Money extStyle={Style.Money}>{total_amount}</Money>,
      balance: <Money extStyle={Style.Money}>{balance}</Money>,
      sku_code: sku_code || "-",
      author,
      comment,
      status: getStatus(id, balance, props),
      created_at,
      action_btns:
        is_auto_generated !== "1" ? (
          <ActionBtns
            toggleDeleteEntity={props.toggleDeleteEntity}
            toggleEditEntity={props.toggleEditEntity}
            id={id}
          />
        ) : (
          <span className={Style.defaultText}>auto</span>
        ),
      clickEvent: e => {
        // return is_auto_generated !== "1" ? props.toggleEditEntity(e, id) : null;
      }
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-home"></i> Credit List`;
  ppDataS.newBtn = (
    <Red
      className={Style.btn}
      extStyle={Style.btn}
      click={props.toggleCreateEntity}
    >
      <i className={`ion ion-android-add ${Style.controlIcon}`}></i>
      <span className={Style.btnText}> Add Credit </span>
    </Red>
  );

  return (
    <JQDatatable
      tableId="sales"
      hover
      data={ppDataS}
      sortByColumn={7}
      sortDir="DESC"
    />
  );
};

EntityTable.propTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired
};
