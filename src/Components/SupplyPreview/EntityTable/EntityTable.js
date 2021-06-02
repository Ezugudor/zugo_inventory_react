import PropTypes from "prop-types";
import React, { Component } from "react";
import { dataStruct } from "./tableDataStructure";
import Style from "./EntityTable.module.css";
// import SharedStyle from "../Tables.module.css";
import { Table } from "../../../plugins";
import { White, Red } from "../../Utils/Buttons";
import { Money } from "../../../plugins";

import { ActionBtns } from "./ActionBtns";
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

const getBusinessInfo = (id, businesses) => {
  const businessInfo = businesses.find(business => id == business._id);
  const { name, logoUrl, description, color, approved, deleted } = businessInfo;
  return { name, logoUrl, description, color, approved, deleted };
};
let Bizz;
const showResponse = props => {
  console.log("distribute", props.distributionData);
  const ppData = props.currentCodeSupplies.map((res, index) => {
    const {
      id,
      customer_surname,
      customer_firstname,
      amount,
      driver_id,
      driver_surname,
      driver_firstname,
      driver_phone,
      source,
      mode,
      outlet_name,
      payment_method,
      deposit,
      comment,
      created_at
    } = res;
    const rowData = {
      index: index + 1,
      outlet: outlet_name || "-",
      customer: customer_firstname || customer_surname || "-",
      amount: <Money extStyle={Style.Money}>{amount}</Money>,
      deposit: <Money extStyle={Style.Money}>{deposit}</Money>,
      driver_name: driver_surname || driver_firstname || "-",
      driver_phone: driver_phone || "-",
      source,
      mode,
      payment_method,
      created_at,
      comment,
      action_btns: (
        <ActionBtns
          deleteTemporal={props.deleteTemporal}
          toggleEditEntity={props.toggleEditEntity}
          id={index}
        />
      ),
      clickEvent: e => {
        // props.toggleEditEntity(e, id);
      }
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-home"></i> Outlets`;
  ppDataS.newBtn = "";
  // ppDataS.newBtn = (
  //   <Red
  //     className={Style.btn}
  //     extStyle={Style.btn}
  //     // click={props.toggleCreateEntity}
  //     click={props.addEntity}
  //   >
  //     <i className={`ion ion-android-add ${Style.controlIcon}`}></i>
  //     <span className={Style.btnText}> Submit </span>
  //   </Red>
  // );

  return (
    <Table
      tableId="distribute"
      hover
      data={ppDataS}
      sortByColumn={10}
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
