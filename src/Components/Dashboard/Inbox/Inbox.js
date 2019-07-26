import { getNote } from "../../../utils";
import { InboxHeader } from "./Header";
import { InboxItem } from "./Item";
import PropTypes from "prop-types";
import { MDBDataTable } from "mdbreact";
import React, { Component } from "react";
import { data } from "../data";
import { dataStruct } from "../tableDataStructure";
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
    {showResponse(props)}
  </section>
);

const showResponse = props => {
  switch (props.tabToShow) {
    case "partiallyProcessed":
      console.log("partially processed", props);
      const { partiallyProcessed } = props;
      const ppData = partiallyProcessed.result.map(res => {
        const { branche, id, createdAt } = res;
        const formName = res.form.name;
        const note = getNote(res);
        const rowData = {
          name: formName,
          notyte: note,
          id: id,
          branch: branche,
          date: createdAt,
          clickEvent: () => {
            window.location.href = `/response/partiallyProcessed/${id}`;
          }
        };

        return rowData;

        // console.log("gather data", note, branche, id, createdAt, formName);
        // <InboxItem
        //   formName={res.form.name}
        //   date={res.createdAt}
        //   note={getNote(res)}
        //   type="pending"
        //   key={res.id}
        //   id={res.id}
        // />
      });
      const ppDataS = { ...dataStruct };
      ppDataS.rows = ppData;
      console.log("gather data", ppDataS);
      return <MDBDataTable hover data={ppDataS} />;

    case "processed":
      const { processed } = props;
      const prData = processed.result.map(res => {
        const { branche, id, createdAt } = res;
        const formName = res.form.name;
        const note = getNote(res);
        const rowData = {
          name: formName,
          notyte: note,
          id: id,
          branch: branche,
          date: createdAt,
          clickEvent: () => {
            window.location.href = `/response/processed/${id}`;
          }
        };

        return rowData;

        // console.log("gather data", note, branche, id, createdAt, formName);
        // <InboxItem
        //   formName={res.form.name}
        //   date={res.createdAt}
        //   note={getNote(res)}
        //   type="pending"
        //   key={res.id}
        //   id={res.id}
        // />
      });
      const prDataS = { ...dataStruct };
      prDataS.rows = prData;
      console.log("gather data", prDataS);
      return <MDBDataTable hover data={prDataS} />;

    case "pending":
      const clickRow = id => {
        console.log("row event", id);
        window.location.href = `/response/pending/${id}`;
      };
      const { pending } = props;
      const datta = pending.result.map(res => {
        const { branche, id, createdAt } = res;
        const formName = res.form.name;
        const note = getNote(res);
        const rowData = {
          name: formName,
          notyte: note,
          id: id,
          branch: branche,
          date: createdAt,
          clickEvent: () => {
            window.location.href = `/response/pending/${id}`;
          }
        };

        return rowData;
      });
      const dataS = { ...dataStruct };
      dataS.rows = datta;
      console.log("gather data", dataS);
      return <MDBDataTable hover data={dataS} />;

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
