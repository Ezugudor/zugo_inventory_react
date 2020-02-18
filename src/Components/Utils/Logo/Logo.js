import { getBusinessLogo } from "../../../store/selectors";
import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import Style from "./Logo.module.css";
import { connect } from "react-redux";
class Class extends Component {
  render() {
    return (
      <NavLink to="/dashboard">
        <img className={Style.Logo} src={this.props.logoUrl} alt="Swyp Logo" />
      </NavLink>
    );
  }
}

const mapStateToProps = state => {
  return {
    // logoUrl: getBusinessLogo(state)
  };
};

export const Logo = connect(
  mapStateToProps,
  null
)(Class);
