import Style from "./Cards.module.css";
import { Card } from "../Card";
import React from "react";

export const Cards = props => {
  return (
    <section className={Style.Cards}>
      {props.formTypes.map((batch, index) => {
        return (
          <div className={Style.Row} key={index}>
            {batch.map(formtype => (
              <div className={Style.Col3} key={formtype.name}>
                <Card formtype={formtype} />
              </div>
            ))}
          </div>
        );
      })}
    </section>
  );
};
