import { registerBusiness } from "../../store/actions";
import { SignupView } from "../../Components/Auth";
import React, { Component } from "react";
import { connect } from "react-redux";
export class Class extends Component {
  state = {
    confirm_password: "",
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
    const { firstname, lastname, password, confirm_password } = this.state;
    if (password !== confirm_password) {
      return alert("There is an issues with your password");
    }
    const fullname = `${firstname} ${lastname}`;
    const history = this.props.history;

    const details = {
      account: {
        branch: "HQ",
        role: "admin",
        name: fullname,
        firstname: firstname,
        lastname: lastname,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password
      },
      name: this.state.businessname
    };
    this.props.registerBusiness(details, history);
  };

  render() {
    return (
      <SignupView
        confirm_password={this.state.confirm_password}
        businessname={this.state.businessname}
        changeInput={this.handleInputChange}
        register={this.handleRegistration}
        firstname={this.state.firstname}
        lastname={this.state.lastname}
        password={this.state.password}
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
