import Style from "./Notes.module.css";
import React from "react";
export const Notes = props => (
  <section className="section__note">
    <h2 className={Style.info}>Notes</h2>
    <div className={Style.notes}>
      <div className={`${Style.response} ${Style.responseLeft}`}>
        <p className={Style.responseAuthor}>Ossaija ThankGod</p>
        <p className={Style.responseText}>
          There is no signature attache to this response
        </p>
        <p className={Style.responseMeta}>
          <span className="response__duration">1 week ago - </span>
          <span className="response__timestamps">18/10/2018</span>
        </p>
      </div>
      <div className={`${Style.response} ${Style.responseRight}`}>
        <p className={Style.responseAuthor}>Deborah James</p>
        <p className={Style.responseText}>
          I would inform the customer to rectify and revert back to use
        </p>
        <p className={Style.responseMeta}>
          <span className="response__duration">1 week ago - </span>
          <span className="response__timestamps">18/10/2018</span>
        </p>
      </div>
    </div>
  </section>
);
