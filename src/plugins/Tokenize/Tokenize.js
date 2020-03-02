import React, { Component } from "react";
import $ from "jquery";
import "tokenize2";
// import "modules/tokenize2/dist/tokenize2.min.css";
import "./tokenize/tokenize2.min.css";
import "./Tokenize.css";
// import "./datatables/media/js/jquery.dataTables";
// import "./datatables/media/css/jquery.dataTables.css";
// import "./myDatatable.css";
// import Style from "./JqueryDatatable.module.css";
import ReactDOM from "react-dom";

export class Tokenize extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.delaySearch = "";
    this.oo = {};
  }
  componentDidMount() {
    this.oo = $("select[name=tag]").tokenize2({
      placeholder: "Enter Codes . Press TAB or Comma for multiple.",
      tokensAllowCustom: true,
      searchMinLength: 2,
      dataSource: function(search, object) {
        //delay search
        clearTimeout(this.delaySearch);
        this.delaySearch = setTimeout(function() {
          $.ajax({
            url: "/cpu/get_keyword.php",
            data: { search: search },
            dataType: "json",
            success: function(data) {
              var $items = [];
              $.each(data.data, function(k, v) {
                $items.push(v);
              });
              // console.log([$items])
              // console.log(data)
              object.trigger("tokenize:dropdown:fill", [$items]);
              // console.log('oby',object)
            }
          });
        }, 2000); // delays seacrch by 2000(2sec)
      }
    });

    // adding
    $("select[name=tag]").on(
      "tokenize:tokens:added",
      function(e, value, txt) {
        this.props.addCodeToken(e, value, txt);
      }.bind(this)
    );

    // adding
    $("select[name=tag]").on(
      "tokenize:tokens:remove",
      function(e, value) {
        this.props.removeCodeToken(e, value);
      }.bind(this)
    );

    // deselecting
    $("select[name=tag]").on(
      "tokenize:deselect",
      function(e) {
        // console.log($('select[name=tag]').data('tokenize2').toArray());
        // console.log(oo.element)
        // console.log(oo.searchContainer)
        if ($.trim($(this.oo.input).val()).length !== 0) {
          this.oo.trigger("tokenize:tokens:add", [
            this.oo.lastSearchTerms,
            this.oo.lastSearchTerms,
            false
          ]);
          this.oo.lastSearchTerms = null;
        }
      }.bind(this)
    );
  }

  componentWillUnmount() {}

  componentWillUpdate(a, b) {}

  componentDidUpdate() {}

  render() {
    return (
      <select name="tag" className={`${this.props.extStyle}`} multiple></select>
    );
  }
}
