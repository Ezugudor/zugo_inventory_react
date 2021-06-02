import React, { Component } from "react";
import Router from "./Router";
import accounting from "accounting-js";
import store from "./store";
import watch from "redux-watch";
import $ from "jquery";

class App extends Component {
  initAccounting() {
    console.log("real valsue");
    $('input[name="stake-fancy"]').on("input change", function(e) {
      var realVal = parseInt(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );
      console.log("real value", realVal);
      $('input[name="stake-main"]').val(realVal);
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
    });

    $(".naira").each(function() {
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
    const w = watch(store.getState, "business");
    const _this = this;
    store.subscribe(
      w((newVal, oldVal, objs) => {
        window.clearTimeout(window.autoSaveTimeout);
        window.autoSaveTimeout = setTimeout(function() {
          /**
           * @param false : Will save and PUBLISH the form but since FALSE, will Save only. i.e save as it is.
           * @param true : Auto save
           */
          _this.initAccounting();
        }, 100);
      })
    );
  }
  componentDidUpdate() {
    this.initAccounting();
  }
  componentWillUpdate() {
    this.initAccounting();
  }
  componentWillReceiveProps() {
    this.initAccounting();
  }
  render() {
    return <Router />;
  }
}

export default App;
