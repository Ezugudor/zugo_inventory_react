import {AuthHeader} from "../Headers";
import {Aux} from "../../Auxiliary";
import React from "react";

export const AuthLayout = props => (
  <Aux>
      <AuthHeader></AuthHeader>
      <main className="auth">
        {props.children}
      </main>
  </Aux>
)


