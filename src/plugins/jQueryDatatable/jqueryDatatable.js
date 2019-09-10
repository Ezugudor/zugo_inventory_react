import React, { Component } from "react";
import $ from "jquery";
import "datatables";
// import "./datatables/media/js/jquery.dataTables";
import "./datatables/media/css/jquery.dataTables.css";
import "./myDatatable.css";
import Style from "./JqueryDatatable.module.css";
import ReactDOM from "react-dom";

export class JQDatatable extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.dTOptions = "";
    this.dataTableHandle = "";
  }
  componentDidMount() {
    const _this = this;

    this.dTOptions = {
      dom:
        '<"table-filter-cont tfc-top" <"tresponsive" <"tf-title"> <"tf-addbtn"> <"tf-length"<"fancy-select"l>><"tf-filter"f><"bulk-action"><"clearfix">>><"tf-table"t><"table-filter-cont tfc-bottom" <"tresponsive" <"tf-info"i><"tf-paging"p><"clearfix">>>',
      initComplete: function() {
        console.log("propppaa", _this.props);
        let tfTitle = `<span class="table-name"></span> <span class="table-class">${_this.props.data.title}</span> `;
        let btn = <span>{_this.props.data.newBtn}</span>;

        $(".tf-title").html(tfTitle);
        ReactDOM.render(btn, document.querySelector(".tf-addbtn"));
      },
      drawCallback: function() {}
    };
    this.$el = $(this.el);
    this.dataTableHandle = this.$el.dataTable(this.dTOptions);
  }

  componentWillUnmount() {
    // alert("unmounting");
    console.log("handler", this.dataTableHandle);
    this.dataTableHandle.fnDestroy(false);
  }

  componentWillUpdate(a, b) {
    this.dataTableHandle.fnDestroy(false);
  }

  componentDidUpdate() {
    this.$el = $(this.el);
    this.$el.dataTable(this.dTOptions);
  }

  generateColumns() {
    console.log("data", this.props);
    const { columns } = this.props.data;
    const res = columns.map((col, index) => {
      return <th>{col.label}</th>;
    });
    console.log("xxx columns", columns);
    return res;
  }

  generateRows() {
    const { rows } = this.props.data;
    const { columns } = this.props.data;
    console.log("xxx rows", rows);
    const res = rows.map(row => {
      const aaa = columns.map((column, index) => {
        const currentField = column.field;
        return index == 0 ? (
          <td>
            <span className={Style.id}>{row[currentField]}</span>
          </td>
        ) : (
          <td>{row[currentField]}</td>
        );
      });
      return <tr onClick={row.clickEvent}>{aaa}</tr>;
    });
    console.log("res", res);
    return res;
  }

  getTable() {
    console.log("generated row", this.generateRows());
    return (
      <table
        ref={el => (this.el = el)}
        className={`${this.props.hover ? "table-hover" : null}`}
      >
        <thead>
          <tr>{this.generateColumns()}</tr>
        </thead>
        <tbody>{this.generateRows()}</tbody>
      </table>
    );
  }
  render() {
    console.log("output table", this.getTable());
    return this.getTable();
  }
}
