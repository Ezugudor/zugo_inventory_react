import React, { Component } from "react";
import $ from "jquery";
import "datatables";
// import "./datatables/media/js/jquery.dataTables";
import "./datatables/media/css/jquery.dataTables.css";
// import "./myDatatable.css";
import Style from "./Table.module.css";
import ReactDOM from "react-dom";

export class Table extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.dTOptions = "";
    this.dataTableHandle = "";
    this.sortByColumn = props.sortByColumn || 0;
    this.sortDir = props.sortDir || "asc";
  }
  componentDidMount() {
    const _this = this;

    this.dTOptions = {
      dom: `<<"tf-table"t><"table-filter-cont tfc-bottom" <"tresponsive" <"submitBtnCont"><"clearfix">>>>`,
      initComplete: function() {
        let btn = <span>{this.props.data.newBtn}</span>;

        ReactDOM.render(btn, document.querySelector(`.submitBtnCont`));
      }.bind(this),
      language: {
        emptyTable: "No data available",
        search: "_INPUT_",
        searchPlaceholder: "Search for data within table"
      },
      order: [[this.sortByColumn, this.sortDir]],
      drawCallback: function() {}
    };
    this.$el = $(this.el);
    this.dataTableHandle = this.$el.dataTable(this.dTOptions);
  }

  componentWillUnmount() {
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
    const { columns } = this.props.data;
    const res = columns.map((col, index) => {
      return <th>{col.label}</th>;
    });
    return res;
  }

  generateRows() {
    const { rows } = this.props.data;
    const { columns } = this.props.data;

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

    return res;
  }

  getTable() {
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
    return this.getTable();
  }
}
