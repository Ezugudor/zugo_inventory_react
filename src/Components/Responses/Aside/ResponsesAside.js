import Style from "./ResponsesAside.module.css";
import React from "react";
const TabComponent = props => (
  <div className={Style.tabWrapper}>
    <div className={Style.tab}>
      <input type="checkbox" className={Style.input} />
      <span className={Style.tabSelected}>{props.dateText}</span>
    </div>
    <div>{props.responseCountText}</div>
  </div>
);

export const ResponseAside = props => (
  <aside className={Style.aside}>
    <div className={Style.tabs}>
      <TabComponent
        dateText="12:30pm Sept 20, 2018"
        responseCountText="10 Responses"
      />
      <TabComponent
        dateText="11:30pm Sept 21, 2018"
        responseCountText="7 Responses"
      />
    </div>
    <div className={Style.responseControl}>
      <span className={Style.controlText}>0 selected</span>
      <button className="btn btn--primary">Download </button>
    </div>
  </aside>
);
