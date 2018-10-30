import {AdminSideNav} from "../../../Components/Navigations";
import {PrivateHeader} from "../Headers";
import {Aux} from "../../Auxiliary";
import React from "react";
export const Adminlayout = props => (
  <Aux>
    <PrivateHeader></PrivateHeader>
    <main className="private">
      <AdminSideNav></AdminSideNav>
      <section className="content">
        {props.children}
      </section>
    </main>
  </Aux>
)