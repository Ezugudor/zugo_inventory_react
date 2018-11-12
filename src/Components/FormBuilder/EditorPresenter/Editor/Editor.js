import PlainSerializer from "slate-plain-serializer";
import { Editor as SlateEditor } from "slate-react";
import Style from "./Editor.module.css";
import React, { Component } from "react";
import { InitialValue } from "./Value";

export class Editor extends Component {
  state = {
    value: InitialValue
  };

  render() {
    return (
      <div className={Style.editorWrapper} tabIndex="-1">
        <div data-q-type="ddd" className={Style.editor}>
          <div className={Style.iconWrapper} draggable={true}>
            <div className={Style.iconContents}>
              <div className={Style.iconHolder}>
                <img className={Style.icon} src="/img/sign.svg" alt="sign" />
                <div className={Style.position}>1</div>
              </div>
            </div>
          </div>
          <div className={Style.question}>
            <div className={Style.questionBox}>
              <SlateEditor
                placeholder="Type your question here"
                value={this.state.value}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
