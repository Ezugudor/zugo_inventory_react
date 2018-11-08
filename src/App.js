import Style from "./App.module.css";
import { FormTypes, Signup, Login } from "./Containers";
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className={Style.App}>
        <Login />
        {/* <Signup /> */}
        {/* <FormTypes /> */}
      </div>
    );
  }
}

export default App;
