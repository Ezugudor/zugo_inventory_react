import Style from "./Cards.module.css";
import PropTypes from "prop-types";

import { Card } from "../Card";
import React from "react";

export const Cards = props => (
  <section className={Style.Cards}>
    {props.forms.map((batch, index) => (
      <div className={Style.Row} key={index}>
        {batch.map(form => (
          <div className={Style.Col3} key={form.id}>
            <Card
              form={form}
              showBuilderEdit={props.showBuilderEdit}
              formId={form.id}
              editMode={props.editMode}
              setFormToDelete={props.setFormToDelete}
            />
          </div>
        ))}
      </div>
    ))}
  </section>
);

Cards.propTypes = {
  forms: PropTypes.array.isRequired
};
