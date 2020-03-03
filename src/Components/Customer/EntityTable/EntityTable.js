import PropTypes from "prop-types";
import React, { Component } from "react";
import { dataStruct } from "./tableDataStructure";
import Style from "./EntityTable.module.css";
// import SharedStyle from "../Tables.module.css";
import { JQDatatable } from "../../../plugins";
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
  const ppData = props.customers.map((res, index) => {
    const {
      sn,
      id,
      avatar,
      firstname,
      surname,
      email,
      phone,
      address,
      created_at
    } = res;
    const rowData = {
      sn,
      id,
      avatar: avatar || "-",
      firstname: firstname || "-",
      surname: surname || "-",
      email: email || "-",
      phone: phone || "-",
      address: address || "-",
      date: created_at,
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
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-home"></i> Customers`;
  ppDataS.newBtn = (
    <Red
      className={Style.btn}
      extStyle={Style.btn}
      click={props.toggleCreateEntity}
    >
      <i className={`ion ion-android-add ${Style.controlIcon}`}></i>
      <span className={Style.btnText}> New Customer </span>
    </Red>
  );

  return (
    <JQDatatable
      sortByColumn={6}
      sortDir="DESC"
      tableId="customers"
      hover
      data={ppDataS}
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
