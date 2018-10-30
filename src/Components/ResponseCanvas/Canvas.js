import { Footer } from "./Footer";
import { Header } from "./Header";
import React from "react";

export const Canvas = props => (
  <section className="canvas__section">
      <section  className="header__section">
        <Header></Header>
      </section>
    <section className="main-content__section">
      <div className="canvas__wrapper">
        <div className="canvas">
          <div className="canvas__content">
            <main>
              
            </main>
          </div>
        </div>
      </div>
    </section>
    <section className="footer__section">
      <Footer></Footer>
    </section>
  </section>
)