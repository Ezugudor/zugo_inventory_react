import PropTypes from "prop-types";
import React, { Component } from "react";
import { dataStruct } from "./tableDataStructure";
import Style from "./HistorySales.module.css";
// import SharedStyle from "../Tables.module.css";
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
export const HistorySales = props => (
  <section>
    <div className={Style.tableCont}>{showResponse(props)}</div>
  </section>
);
const gotoRegister = (e, id) => {
  e.stopPropagation();
  return (window.location.href = `/outlets`);
};
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
  const ppData = dataStruct.rows.map((res, index) => {
    const { id, outlet, customer, quantity, price } = res;
    const rowData = {
      id,
      outlet,
      customer,
      quantity,
      price,
      clickEvent: () => {
        props.togglePreviewSales();
      }
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-home"></i> Outlet Sales`;
  ppDataS.newBtn = (
    <Red
      className={Style.btn}
      extStyle={Style.btn}
      click={e => gotoRegister(e)}
    >
      <span className={Style.btnText}> View All </span>
      <i className={`ion ion-ios-arrow-thin-right ${Style.controlIcon}`}></i>
    </Red>
  );

  return <JQDatatable tableId="sales" hover data={ppDataS} />;
};

HistorySales.propTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired
};
