import PropTypes from "prop-types";
import React, { Component } from "react";
import { dataStruct } from "./tableDataStructure";
import "../Tables.css";
import Style from "./HistoryPayment.module.css";
import { JQDatatableMini as JQDatatable } from "../../../plugins";
import { White, Red } from "../../Utils/Buttons";
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
export const HistoryPayment = props => (
  <section>
    <div className={Style.tableCont}>{showResponse(props)}</div>
  </section>
);
const formatDate = rawDate => {
  return moment(rawDate).format("DD-MM-YYYY");
};

const gotoRegister = (e, id) => {
  e.stopPropagation();
  return (window.location.href = `/payment`);
};

const getBusinessInfo = (id, businesses) => {
  const businessInfo = businesses.find(business => id == business._id);
  const { name, logoUrl, description, color, approved, deleted } = businessInfo;
  return { name, logoUrl, description, color, approved, deleted };
};
let Bizz;
const showResponse = props => {
  // const ppData = dataStruct.rows.map((res, index) => {
  const ppData = props.creditPayment.map((res, index) => {
    const { id, outlet, customer, amount, created_at } = res;
    const rowData = {
      id,
      outlet,
      customer,
      price: <span className="naira">{amount}</span>,
      date: created_at,
      clickEvent: () => {
        props.togglePreviewPayment();
      }
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-list"></i> Payment History`;
  ppDataS.newBtn = (
    <Red
      extStyle={Style.btn}
      className={Style.btn}
      click={e => gotoRegister(e)}
    >
      <span className={Style.btnText}> View All </span>
      <i className={`ion ion-ios-arrow-thin-right ${Style.controlIcon}`}></i>
    </Red>
  );

  return <JQDatatable tableId="pay" hover data={ppDataS} />;
};

HistoryPayment.propTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired
};
