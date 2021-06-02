import { getNote } from "../../../utils";
import { InboxHeader } from "./Header";
import { InboxItem } from "./Item";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import React, { Component } from "react";
import { data } from "../data";
import { dataStruct } from "../tableDataStructure";
import Style from "./Inbox.module.css";
import { JQDatatable } from "../../../plugins";
import { DatePicker, InboxPagination, Toggle } from "../../Utils";
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
export const Inbox = props => (
  <section>
    <InboxHeader
      allBusinessCount={props.allBusiness.count}
      approvedBusinessCount={props.approvedBusiness.count}
      inactiveBusinessCount={props.inactiveBusiness.count}
      selectedTab={props.tabToShow}
      switchTab={props.switchTab}
    />
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
  switch (props.tabToShow) {
    case "all":
      const { allBusiness: ab1 } = props;
      Bizz = ab1;
      break;

    case "approved":
      const { approvedBusiness: ab2 } = props;
      Bizz = ab2;
      break;

    case "inactive":
      const { inactiveBusiness: ab3 } = props;
      Bizz = ab3;
      break;

    default:
      const { allBusiness: ab4 } = props;
      Bizz = ab4;
      break;
  }

  const ppData = Bizz.result.map((res, index) => {
    const {
      id,
      name,
      logo_url,
      approved,
      total_branches,
      total_forms,
      total_responses,
      total_users,
      color,
      inactive,
      business_info
    } = res;
    const rowData = {
      name: <span style={{ color }}>{name}</span>,
      approved: (
        <div className={`${Style.toggleApprove}`}>
          <Toggle
            trigger={props.promptSelectorApprove}
            active={approved}
            id={id}
            keyy={index}
            group="approve"
          />
        </div>
      ),
      inactive: (
        <div className={`${Style.toggleApprove}`}>
          <Toggle
            trigger={props.promptSelectorActivate}
            active={!inactive}
            id={id}
            keyy={index}
            group="inactive"
          />
        </div>
      ),
      id,
      total_branches,
      color,
      total_forms,
      total_responses,
      total_users,
      logo: <img src={logo_url} className={Style.bizLogo} />,
      clickEvent: () => {
        window.location.href = `/`;
      },
      action_btns: (
        <ActionBtns
          businessInfo={getBusinessInfo(id, business_info)}
          populateEditBusiness={props.populateEditBusiness}
          id={id}
        />
      )
    };

    return rowData;
  });
  const ppDataS = { ...dataStruct };
  ppDataS.rows = ppData;
  ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-list-outline"></i> Businesses`;
  ppDataS.newBtn = (
    <Red className={Style.btn} click={props.toggleCreateBusiness}>
      <i className={`ion ion-ios-plus ${Style.controlIcon}`}></i>
      <span className={Style.btnText}> New Business</span>
    </Red>
  );

  return <JQDatatable hover data={ppDataS} />;
};

Inbox.ropTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired
};
