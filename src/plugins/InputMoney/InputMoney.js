import React, { Component } from "react";
import accounting from "accounting-js";
import Style from "./InputMoney.module.css";
import $ from "jquery";

export class InputMoney extends Component {
  constructor(props) {
    super();
  }
  initAccounting() {
    const _this = this;
    $(`input[name="value-fancy_${this.props.name}"]`).on(
      "input change",
      function(e) {
        var realVal =
          parseInt(
            $(this)
              .val()
              .replace(/[^0-9]/g, "")
          ) || 0;
        if (_this.props.setNewEntityDetail) {
          _this.props.setNewEntityDetail(e, _this.props.name, realVal);
        } else {
          _this.props.setEditEntityDetail(e, _this.props.name, realVal);
        }

        // $('input[name="value-main"]').val(realVal);
        var symb = $("<span/>")
          .html("&#8358; ")
          .css({ color: "red" })
          .html();
        $(this).val(
          accounting.formatMoney(realVal, {
            symbol: symb,
            thousand: ",",
            precision: "0"
          })
        );
      }
    );
  }
  componentDidMount() {
    this.initAccounting();
  }

  componentWillUnmount() {
    // this.initAccounting();
  }

  componentWillUpdate() {
    // this.initAccounting();
  }

  componentDidUpdate() {
    // this.initAccounting();
  }

  render() {
    return (
      <div>
        {this.props.value ? (
          <input
            type="text"
            value={this.props.value}
            name={`value-fancy_${this.props.name}`}
            placeholder={this.props.placeholder}
            className={`${Style.Input} ${this.props.extStyle}`}
          />
        ) : (
          <input
            type="text"
            name={`value-fancy_${this.props.name}`}
            placeholder={this.props.placeholder}
            className={`${Style.Input} ${this.props.extStyle}`}
          />
        )}
        <input type="hidden" name="value-main" />
      </div>
    );
  }
}
