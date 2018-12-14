import downloadIcon from "../../img/download.svg";
import { AdminLayout } from "../../Hoc/Layouts";
import { ResponsesControls } from "./Controls";
import Style from "./ResponsesView.module.css";
import { AnswerUI } from "../Utils";
import { Info } from "./Info";
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
export const ResponsesView = props => (
  <AdminLayout pageName="Responses">
    <div className={Style.responses}>
      <ResponsesControls />
      <section className="section__info">
        <Info />
      </section>
      <section className={Style.responseContent}>
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
        <div className={Style.answers}>
          <div className={Style.answer}>
            <div className={Style.answerHeader}>
              <span> Today 12:30pm</span>
              <span className={Style.buttonIcon}>
                <img
                  className={Style.iconImage}
                  src={downloadIcon}
                  alt="proccesing"
                />
              </span>
            </div>
            <div className={Style.answerContent}>
              <AnswerUI />
            </div>
          </div>
        </div>
      </section>
    </div>
  </AdminLayout>
);
