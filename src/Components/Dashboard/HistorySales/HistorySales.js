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
  const tableData = props.outlets;
  // const ppData = dataStruct.rows.map((res, index) => {
  let arr = [];
  const ppData = tableData.forEach((res, index) => {
    const rows = res.sales.map(dt => {
      const { id, customer, admin, price, qty } = dt;
      const rowData = {
        id,
        customer,
        qty,
        price: <span className="naira">{price}</span>,
        outlet: res.info.name,
        clickEvent: () => {
          props.togglePreviewSales();
        }
      };

      return rowData;
    });
    const newData = [...arr, ...rows];
    arr = newData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = arr;
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
