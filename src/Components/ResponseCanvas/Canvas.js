import { MultiSelect, YesOrNo, Simple, DropDown, Long } from "./Question";
import Style from "./Canvas.module.css";
import classNames from "classnames";
import { Footer } from "./Footer";
import { Header } from "./Header";
import React from "react";

const getSectionClassName = props => {
  const conditionalClasses = {};
  conditionalClasses[Style.CanvasSectionVisible] = props.showCanvas;
  return classNames(Style.CanvasSection, conditionalClasses);
};
export const Canvas = props => (
  <section className={getSectionClassName(props)}>
    <section className={Style.HeaderSection}>
      <Header />
    </section>
    <section className={Style.InterectionSection}>
      <div className={Style.CanvasWrapper}>
        <div className={Style.Canvas}>
          <main>
            {/* <DropDown /> */}
            <Simple />
            <Long />
            <YesOrNo />
            <MultiSelect />
          </main>
        </div>
      </div>
    </section>
    <section className={Style.FooterSection}>
      <Footer />
    </section>
  </section>
);
