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
  return moment(rawDate).format("h:ma/Do-MMM-YY");
};

const getBusinessInfo = (id, businesses) => {
  const businessInfo = businesses.find(business => id == business._id);
  const { name, logoUrl, description, color, approved, deleted } = businessInfo;
  return { name, logoUrl, description, color, approved, deleted };
};
let Bizz;
const showResponse = props => {
  const ppData = props.payments.map((res, index) => {
    const {
      sn,
      id,
      customer,
      outlet,
      amount,
      payment_type,
      payment_desc,
      receipt,
      author,
      created_at
    } = res;
    const rowData = {
      sn,
      id,
      customer: customer || "-",
      outlet: outlet || "-",
      amount: <Money>{amount}</Money>,
      payment_type,
      desc: payment_desc || "-",
      receipt,
      author,
      date: formatDate(created_at),
      action_btns: (
        <ActionBtns
          toggleDeleteEntity={props.toggleDeleteEntity}
          toggleEditEntity={props.toggleEditEntity}
        />
      ),
      clickEvent: () => {
        // props.toggleEditEntity();
      }
    };

    return rowData;
  }, this);
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-home"></i> Payment History`;
  ppDataS.newBtn = "";
  // ppDataS.newBtn = (
  //   <Red
  //     className={Style.btn}
  //     extStyle={Style.btn}
  //     click={props.toggleCreateEntity}
  //   >
  //     <i className={`ion ion-android-add ${Style.controlIcon}`}></i>
  //     <span className={Style.btnText}> Add Payment </span>
  //   </Red>
  // );

  return (
    <JQDatatable
      tableId="sales"
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
