import Style from "./Cards.module.css";
import { Card } from "../Card";
import React from "react";

export const Cards = props => (
  <section className={Style.Cards}>
    <div className={Style.Row}>
      <div className={Style.Col3}>
        <Card />
      </div>
      <div className={Style.Col3}>
        <Card />
      </div>
      <div className={Style.Col3}>
        <Card />
      </div>
      <div className={Style.Col3}>
        <Card />
      </div>
    </div>
  </section>
);
