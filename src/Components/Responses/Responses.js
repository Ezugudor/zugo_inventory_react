import {Aux} from "../../Hoc/Auxiliary";
import { Controls } from "./Controls";
import { AnswerUI } from "../Utils";
import { Info } from "./Info";
import React from "react";

export const Responses = props => (
 <AUX>
    <section className="section__controls">
      <Controls></Controls>
    </section>
    <section className="section__info">
      <Info></Info>
    </section>
    <section className="section__responses">
      <aside className="aside">
        <div className="response__tabs">
          <div className="response__tab">
            <span className="response__tab-checkbox">
              <input type="checkbox"></input>
            </span>
              <span className="response__tab-time">18/10/2018</span>
              <span className="response__tab-respondant">Debby</span>
          </div>
        </div>
        <div className="response__control">
          <button className="btn btn--primary">
            Download all responses
          </button>
        </div>
      </aside>
      <div className="responses">
        <AnswerUI></AnswerUI>
      </div>
    </section>
 </AUX>
)
