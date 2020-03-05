import React, { Component } from "react";
import $ from "jquery";

import "./jQueryautoComplete/jquery.auto-complete.js";
import "./jQueryautoComplete/jquery.auto-complete.css";
import "./jQueryAutoComplete.css";

export class JQAutoComplete extends Component {
  constructor(props) {
    super(props);
  }
  getMatchSimple = term => {
    const match = [];
    //extract the term
    this.props.data.forEach(elem => {
      const str = elem[this.props.lookout] || "";
      if (str.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
        match.push(str);
      }
    });
    return match;
  };
  getMatchObject = term => {
    const match = [];
    //extract the term
    this.props.data.forEach(elem => {
      const str = elem.info[this.props.lookout] || "";
      if (str.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
        match.push(str);
      }
    });
    return match;
  };
  getIDSimple = term => {
    // convert the "selected term" to "id" as that is what is recognised and sent to server;
    const selected = this.props.data.find(elem => {
      const str = elem[this.props.lookout] || "";
      return str.toLowerCase() == term.toLowerCase();
    });
    return selected.id;
  };
  getIDObject = term => {
    // convert the "selected term" to "id" as that is what is recognised and sent to server;
    const selected = this.props.data.find(elem => {
      const str = elem.info[this.props.lookout] || "";
      return str.toLowerCase() == term.toLowerCase();
    });
    return selected.info.id;
  };

  isOutlet = lookFor => {
    const a = this.props.data.find(elem => elem.hasOwnProperty(lookFor));
    return typeof a == "object";
  };
  componentDidMount() {
    $(`#${this.props.id}`).autoComplete({
      minChars: 1,
      cache: false,
      source: function(term, suggest) {
        /**
         * use the default input field value first incase user didnt select from the dropdown
         **/
        this.props.setNewEntityDetail(null, this.props.item_name, term);

        //then start check for match
        let match;
        if (this.isOutlet("info")) {
          match = this.getMatchObject(term);
        } else {
          match = this.getMatchSimple(term);
        }

        return suggest(match);
      }.bind(this),
      onSelect: function(e, term, domItem) {
        let id;
        if (this.isOutlet("info")) {
          id = this.getIDObject(term);
        } else {
          id = this.getIDSimple(term);
        }
        this.props.setNewEntityDetail(e, this.props.item_name, term);
        this.props.setNewEntityDetail(e, this.props.item_id, id);
      }.bind(this)
    });
  }

  render() {
    return (
      <input
        type="text"
        name={`${this.props.id}autocomplete`}
        id={this.props.id}
        // key={this.props.id}
        className={`${this.props.extStyle} form_field`}
        placeholder={this.props.placeholder}
      />
    );
  }
}
