import PropTypes from "prop-types";
import React, { Component } from "react";
import { dataStruct } from "./tableDataStructure";
import Style from "./StockTable.module.css";
// import SharedStyle from "../Tables.module.css";
import { JQDatatable } from "../../../plugins";
import { Money } from "../../../plugins";
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
export const StockTable = props => (
  <section>
    {console.log("logging stocks ", props.stocks)}
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
  const ppData = props.stocks.map((res, index) => {
    const {
      id,
      product_name,
      product_type,
      cp,
      price,
      stock_qty,
      expiry,
      admin_surname,
      admin_firstname,
      created_at
    } = res;
    const rowData = {
      id,
      product_name,
      product_type,
      cp: <Money extStyle={Style.Money}>{cp}</Money>,
      price: <Money extStyle={Style.Money}>{price}</Money>,
      stock_qty,
      expiry,
      created_by: admin_surname || admin_firstname,
      created_at,
      action_btns: (
        <ActionBtns
          toggleDeleteEntity={props.toggleDeleteEntity}
          toggleEditEntity={props.toggleEditEntity}
          id={id}
        />
      ),
      clickEvent: e => {
        props.toggleEditEntity(e, id);
      }
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-home"></i> Stock Listings`;
  ppDataS.newBtn = (
    <Red
      className={Style.btn}
      extStyle={Style.btn}
      click={props.toggleCreateEntity}
    >
      <i className={`ion ion-android-add ${Style.controlIcon}`}></i>
      <span className={Style.btnText}> Add Stock </span>
    </Red>
  );

  return (
    <JQDatatable
      tableId="sales"
      hover
      data={ppDataS}
      sortByColumn={0}
      sortDir={"desc"}
    />
  );
};

StockTable.propTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired
};
