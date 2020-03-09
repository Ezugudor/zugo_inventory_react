import React, { Component } from "react";
import Style from "./Money.module.css";
import accounting from "accounting-js";
import $ from "jquery";

export class Money extends Component {
  constructor(props) {
    super();
  }
  initAccounting() {
    // $('input[name="stake-fancy"]').on("input change", function(e) {
    //   var realVal = parseInt(
    //     $(this)
    //       .val()
    //       .replace(/[^0-9]/g, "")
    //   );
    //   $('input[name="stake-main"]').val(realVal);
    //   var symb = $("<span/>")
    //     .html("&#8358; ")
    //     .css({ color: "red" })
    //     .html();
    //   $(this).val(
    //     accounting.formatMoney(realVal, {
    //       symbol: symb,
    //       thousand: ",",
    //       precision: "0"
    //     })
    //   );
    // });

    $(".zugo3434xceeg535").each(function() {
      var symb = $("<span/>")
        .html("&#8358; ")
        .css({ color: "red" })
        .html();
      var realVal = $(this)
        .text()
        .replace(/[^0-9]/g, "");
      $(this).html(
        accounting.formatMoney(realVal, {
          symbol: symb,
          thousand: ",",
          precision: "0"
        })
      );
    });
  }
  componentDidMount() {
    this.initAccounting();
  }

  componentWillUnmount() {
    this.initAccounting();
  }

  componentWillUpdate() {
    this.initAccounting();
  }

  componentDidUpdate() {
    this.initAccounting();
  }

  render() {
    return (
      <span
        className={`zugo3434xceeg535 ${Style.style} ${this.props.extStyle}`}
      >
        {this.props.children}
      </span>
    );
  }
}
