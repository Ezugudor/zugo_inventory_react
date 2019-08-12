import {
  CompleteSignupDefault,
  CompleteSignupExpired,
  CompleteSignupForm,
  CompleteSignupSuccess
} from "../../Components/Auth";
import { completeSignup, verifySignupToken } from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { SwypPartnerApi } from "../../core/api";

class Class extends Component {
  state = {
    email: "",
    password: "",
    cpassword: "",
    currentComponent: "default"
  };

  componentDidMount() {
    SwypPartnerApi.get(`user/completesignup/${this.props.match.params.token}`)
      .then(res => {
        console.log("faa", res);
        // dispatch(stopNetworkRequest());

        //the token is verified and user details (password) has been added successfully

        // dispatch(setNotificationMessage(`Token is valid`, "success"));
        this.setState({
          currentComponent: "form",
          email: res.data.user.email
        });
        return;

        // dispatch(setNotificationMessage("Token has expired", "erro"));
      })
      .catch(err => {
        // alert("there was error with ur request");
        if (err.response.data.message == "Token Invalid") {
          this.setState({ currentComponent: "expired" });
        } else if (err.response.data.message == "Account disabled") {
          this.setState({ currentComponent: "expired" });
        }
      });
  }

  getComponent() {
    switch (this.state.currentComponent) {
      case "default":
        return (
          <CompleteSignupDefault
            changeInput={this.handleInputChange}
            password={this.state.password}
            login={this.handleLogin}
            email={this.state.email}
          />
        );
        break;
      case "expired":
        return (
          <CompleteSignupExpired
            changeInput={this.handleInputChange}
            password={this.state.password}
            login={this.handleLogin}
            email={this.state.email}
          />
        );
        break;
      case "form":
        return (
          <CompleteSignupForm
            changeInput={this.handleInputChange}
            password={this.state.password}
            login={this.handleLogin}
            email={this.state.email}
          />
        );
        break;
      case "success":
        return (
          <CompleteSignupSuccess
            changeInput={this.handleInputChange}
            password={this.state.password}
            login={this.handleLogin}
            email={this.state.email}
          />
        );
        break;
    }
  }

  handleInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    if (this.state.password !== this.state.cpassword) {
      return alert("password dont match");
    }
    const details = {
      email: this.state.email,
      password: this.state.password,
      token: this.props.match.params.token
    };
    console.dir("details b4 clear", details);
    const history = this.props.history;
    this.props.completeSignup(details, history, this);
    this.setState({ password: "", cpassword: "" });
    console.dir("states after clear", this.state);
  };

  render() {
    // verifySignupToken(this.props.match.params.token);
    // console.log("verify ppties", this.props.match.params.token);
    return this.getComponent("expired");
  }
}

export const CompleteSignup = connect(
  null,
  { completeSignup }
)(Class);
