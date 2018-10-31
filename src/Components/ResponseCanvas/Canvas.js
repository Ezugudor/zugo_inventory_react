import Style from "./Canvas.module.css";
import { Footer } from "./Footer";
import { Header } from "./Header";
import React from "react";

export const Canvas = props => (
  <section className="CanvasSection">
    <section className={Style.HeaderSection}>
      <Header />
    </section>
    <section className={Style.InterectionSection}>
      <div className="canvas__wrapper">
        <div className="canvas">
          <div className="canvas__content">
            <main />
          </div>
        </div>
      </div>
    </section>
    <section className={Style.FooterSection}>
      <Footer />
    </section>
  </section>
);
