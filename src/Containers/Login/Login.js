import { LoginView } from "../../Components/Auth";
import { loginUser } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { getProgressIndicator } from "../../store/selectors";
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
      <LoginView
        changeInput={this.handleInputChange}
        password={this.state.password}
        login={this.handleLogin}
        email={this.state.email}
        showLoading={this.props.progress}
      />
    );
  }
}

const mapStateToProps = state => ({
  progress: getProgressIndicator(state)
});
export const Login = connect(
  mapStateToProps,
  { loginUser }
)(Class);
