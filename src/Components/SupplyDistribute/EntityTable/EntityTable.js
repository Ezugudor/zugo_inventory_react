import PropTypes from "prop-types";
import React, { Component } from "react";
import { dataStruct } from "./tableDataStructure";
import Style from "./EntityTable.module.css";
// import SharedStyle from "../Tables.module.css";
import { Table } from "../../../plugins";
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

const getBusinessInfo = (id, businesses) => {
  const businessInfo = businesses.find(business => id == business._id);
  const { name, logoUrl, description, color, approved, deleted } = businessInfo;
  return { name, logoUrl, description, color, approved, deleted };
};
let Bizz;
const showResponse = props => {
  console.log("distribute", props.distributionData);
  const ppData = props.distributionData.map((res, index) => {
    const {
      id,
      receiver_id,
      receiver_name,
      amount,
      driver_id,
      driver_name,
      driver_phone,
      source,
      mode,
      qty,
      truck_id,
      is_outlet,
      payment_method,
      deposit,
      comment
    } = res;
    const rowData = {
      index: index + 1,
      outlet: is_outlet ? receiver_name : "-",
      customer: !is_outlet ? receiver_name : "-",
      amount: <Money extStyle={Style.Money}>{amount}</Money>,
      deposit: <Money extStyle={Style.Money}>{deposit}</Money>,
      driver_name,
      driver_phone,
      source,
      mode,
      qty,
      truck_id,
      payment_method,
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
  ppDataS.newBtn = (
    <Red
      className={Style.btn}
      extStyle={Style.btn}
      // click={props.toggleCreateEntity}
      click={props.addEntity}
    >
      <i className={`ion ion-android-add ${Style.controlIcon}`}></i>
      <span className={Style.btnText}> Submit </span>
    </Red>
  );

  return (
    <Table
      tableId="distribute"
      hover
      data={ppDataS}
      sortByColumn={0}
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
