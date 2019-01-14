import { SignupView } from "../../Components/Auth";
import { registerBusiness } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
export class Class extends Component {
  state = {
    businessname: "",
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    phone: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleRegistration = e => {
    e.preventDefault();
    const { firstname, lastname } = this.state;
    const fullname = `${firstname} ${lastname}`;
    const details = {
      account: {
        role: "admin",
        name: fullname,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password
      },
      name: this.state.businessname
    };
    this.props.registerBusiness(details);
  };

  render() {
    return (
      <SignupView
        businessname={this.state.businessname}
        changeInput={this.handleInputChange}
        password={this.state.password}
        register={this.handleLogin}
        name={this.state.fullname}
        phone={this.state.phone}
        email={this.state.email}
      />
    );
  }
}

export const Signup = connect(
  null,
  { registerBusiness }
)(Class);
