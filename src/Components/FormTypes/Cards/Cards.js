import Style from "./Cards.module.css";
import PropTypes from "prop-types";
import { Card } from "../Card";
import React from "react";

const view = props => {
  return (
    <section className={Style.Cards}>
      {props.formTypes.map((batch, index) => (
        <div className={Style.Row} key={index}>
          {batch.map(formType => (
            <div className={Style.Col3} key={formType.name}>
              <Card formType={formType} {...props} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

view.propTypes = {
  formTypes: PropTypes.array.isRequired
};
export const Cards = view;
