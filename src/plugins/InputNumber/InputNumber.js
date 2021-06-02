import React, { Component } from "react";
import accounting from "accounting-js";
import Style from "./InputNumber.module.css";
import $ from "jquery";

export class InputNumber extends Component {
  constructor(props) {
    super();
  }
  initAccounting() {
    const _this = this;
    $(`input[name="n_value-fancy_${this.props.name}"]`).on(
      "input change",
      function(e) {
        var realVal =
          parseInt(
            $(this)
              .val()
              .replace(/[^0-9]/g, "")
          ) || 0;

        _this.props.setNewEntityDetail(e, _this.props.name, realVal);
        // $('input[name="value-main"]').val(realVal);

        $(this).val(
          accounting.formatMoney(realVal, {
            symbol: "",
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
        <input
          type="text"
          name={`n_value-fancy_${this.props.name}`}
          placeholder={this.props.placeholder}
          className={`${Style.Input} ${this.props.extStyle}`}
        />
      </div>
    );
  }
}
