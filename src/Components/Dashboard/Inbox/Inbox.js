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
import { DatePicker, InboxPagination } from "../../Utils";
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
      partiallyProcessedCount={props.partiallyProcessed.count}
      processedCount={props.processed.count}
      pendingCount={props.pending.count}
      selectedTab={props.tabToShow}
      switchTab={props.switchTab}
    />
    <div className={Style.tableCont}>{showResponse(props)}</div>
  </section>
);
const formatDate = rawDate => {
  return moment(rawDate).format("DD-MM-YYYY");
};
const showResponse = props => {
  switch (props.tabToShow) {
    case "partiallyProcessed":
      const { partiallyProcessed } = props;
      const ppData = partiallyProcessed.result.map(res => {
        const { branche, id, shortId, createdAt } = res;
        const formName = res.form.name;
        const note = getNote(res);
        const rowData = {
          name: formName,
          notyte: note ? (
            <span className={Style.commentCont}>
              <i
                className={`ion ion-chatbubble-working ${Style.commentIcon}`}
              ></i>
              <span className={Style.commentText}>{note}</span>
            </span>
          ) : (
            note
          ),
          id: shortId,
          branch: branche,
          date: formatDate(createdAt),
          clickEvent: () => {
            window.location.href = `/response/partiallyProcessed/${id}`;
          }
        };

        return rowData;
      });
      const ppDataS = { ...dataStruct };
      ppDataS.rows = ppData;
      ppDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-speedometer-outline"></i> Dashboard`;
      ppDataS.newBtn = (
        <DatePicker
          handleDateChange={props.handleDateChange}
          filterResponse={props.filterResponse}
          startDate={props.startDate}
          endDate={props.endDate}
        />
      );

      return <JQDatatable hover data={ppDataS} />;

    case "processed":
      const { processed } = props;
      const prData = processed.result.map(res => {
        const { branche, id, shortId, createdAt } = res;
        const formName = res.form.name;
        const note = getNote(res);
        const rowData = {
          name: formName,
          notyte: note ? (
            <span className={Style.commentCont}>
              <i
                className={`ion ion-chatbubble-working ${Style.commentIcon}`}
              ></i>
              <span className={Style.commentText}>{note}</span>
            </span>
          ) : (
            note
          ),
          id: shortId,
          branch: branche,
          date: formatDate(createdAt),
          clickEvent: () => {
            window.location.href = `/response/processed/${id}`;
          }
        };

        return rowData;
      });
      const prDataS = { ...dataStruct };
      prDataS.rows = prData;
      prDataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-speedometer-outline"></i> Dashboard`;
      prDataS.newBtn = (
        <DatePicker
          handleDateChange={props.handleDateChange}
          filterResponse={props.filterResponse}
          startDate={props.startDate}
          endDate={props.endDate}
        />
      );

      return <JQDatatable hover data={prDataS} />;

    case "pending":
      const clickRow = id => {
        window.location.href = `/response/pending/${id}`;
      };
      const { pending } = props;
      const datta = pending.result.map(res => {
        const { branche, id, shortId, createdAt } = res;
        const formName = res.form.name;
        const note = getNote(res);
        const rowData = {
          name: formName,
          notyte: note ? (
            <span className={Style.commentCont}>
              <i
                className={`ion ion-chatbubble-working ${Style.commentIcon}`}
              ></i>
              <span className={Style.commentText}>{note}</span>
            </span>
          ) : (
            note
          ),
          id: shortId,
          branch: branche,
          date: formatDate(createdAt),
          clickEvent: () => {
            window.location.href = `/response/pending/${id}`;
          }
        };

        return rowData;
      });
      const dataS = { ...dataStruct };
      dataS.rows = datta;
      dataS.title = `<i class="${Style.tableTitleIcon} ion ion-ios-speedometer-outline"></i> Dashboard`;
      dataS.newBtn = (
        <DatePicker
          handleDateChange={props.handleDateChange}
          filterResponse={props.filterResponse}
          startDate={props.startDate}
          endDate={props.endDate}
        />
      );
      return <JQDatatable hover data={dataS} />;

    default:
      return null;
  }
};

Inbox.ropTypes = {
  partiallyProcessed: PropTypes.object.isRequired,
  tabToShow: PropTypes.string.isRequired,
  processed: PropTypes.object.isRequired,
  switchTab: PropTypes.func.isRequired,
  unread: PropTypes.object.isRequired
};
