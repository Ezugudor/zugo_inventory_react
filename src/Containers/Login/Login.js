import { Login as View } from "../../Components/Auth";
import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions";

class Class extends Component {
  state = {
    email: "",
    password: ""
  };

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();

    const details = {
      email: this.state.email,
      password: this.state.password
    };
    const history = this.props.history;
    this.props.loginUser(details, history);
    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <View
        changeInput={this.handleInputChange}
        password={this.state.password}
        login={this.handleLogin}
        email={this.state.email}
      />
    );
  }
}

export const Login = connect(
  null,
  { loginUser }
)(Class);
