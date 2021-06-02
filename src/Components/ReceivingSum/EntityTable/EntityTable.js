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

const getStatus = (props, id, status) => {
  return (
    <div className={Style.memberControls}>
      {status === "1" ? (
        <div
          // onClick={e => props.populateEditBusiness(e, props.businessInfo)}
          className={`${Style.iconHolder} ${Style.bgDanger}`}
        >
          <i
            className={`ion ion-android-close ${Style.icon} ${Style.danger}`}
          ></i>
          used
        </div>
      ) : (
        <div
          // onClick={e => props.toggleProcessEntity(e, id)}
          onClick={e => props.setCode(e, id)}
          className={`${Style.iconHolder} ${Style.bgSuccess}`}
        >
          <i className={`ion ion-android-checkmark-circle ${Style.icon}`}></i>{" "}
          use
        </div>
      )}
    </div>
  );
};

const getBusinessInfo = (id, businesses) => {
  const businessInfo = businesses.find(business => id == business._id);
  const { name, logoUrl, description, color, approved, deleted } = businessInfo;
  return { name, logoUrl, description, color, approved, deleted };
};
let Bizz;
const showResponse = props => {
  const ppData = props.receivings.map((res, index) => {
    const {
      id,
      supply_code,
      size,
      qty,
      amount,
      product_name,
      driver_firstname,
      driver_lastname,
      is_outlet,
      outlet,
      customer_firstname,
      customer_lastname,
      driver_phone,
      truck_id,
      mode,
      source,
      created_at,
      used,
      date_used
    } = res;
    const rowData = {
      id,
      code: supply_code,
      size,
      qty,
      amount,
      item: product_name,
      driver: driver_firstname || driver_lastname || "-",
      driver_phone,
      truck_id,
      supplied_to: outlet || customer_firstname || customer_lastname || "-",
      mode: mode || "-",
      source,
      date_used: date_used || "Not Used Yet",
      date: created_at,
      status: getStatus(props, supply_code, used),
      action_btns: (
        <ActionBtns
          toggleDeleteEntity={props.toggleDeleteEntity}
          toggleEditEntity={props.toggleEditEntity}
          id={id}
          toggleProcessEntity={props.toggleProcessEntity}
          processed={used === "1" ? true : false}
        />
      ),
      clickEvent: e => {
        // props.toggleRowDetails(e, id);
        props.toggleRowDetails(e, supply_code);
      }
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-home"></i> Receivings`;
  ppDataS.newBtn = (
    <Red
      className={Style.btn}
      extStyle={Style.btn}
      click={props.toggleCreateEntity}
    >
      <i className={`ion ion-android-add ${Style.controlIcon}`}></i>
      <span className={Style.btnText}> Add Code </span>
    </Red>
  );

  return (
    <JQDatatable
      tableId="sales"
      hover
      data={ppDataS}
      sortByColumn={5}
      sortDir={"desc"}
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
