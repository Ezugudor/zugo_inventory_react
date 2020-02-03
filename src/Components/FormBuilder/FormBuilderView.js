import { FormBuiderLayout } from "../../Hoc/Layouts";
import { AdminLayout } from "../../Hoc/Layouts";
import { EditorPresenter } from "./EditorPresenter";
import { FormPresenter } from "./FormPresenter";
import { Setting } from "./Settings";
import Style from "./FormBuilderView.module.css";
import { Loading, Notification, NotificationCard, FullScreen } from "../Utils";
import { ConfigCurrentElem } from "./ConfigCurrentElem";
import { PublishForm } from "./PublishForm";
import PropTypes from "prop-types";
import React, { Component } from "react";
import $ from "jquery";
window.jQuery = $;
require("../../plugins/nicescrollbar/nicescroll.js");

export class FormBuilderView extends Component {
  componentDidMount() {
    $(".overflow_scroll").niceScroll({
      cursorcolor: "var(--color3)",
      cursorwidth: "15px",
      autohidemode: true,
      touchbehavior: false,
      grabcursorenabled: false,
      spacebarenabled: false
    });
  }
  componentWillUpdate() {
    $(".overflow_scroll").niceScroll({
      cursorcolor: "var(--color3)",
      cursorwidth: "15px",
      autohidemode: true,
      touchbehavior: false,
      grabcursorenabled: false,
      spacebarenabled: false
    });
  }

  componentWillUnmount() {
    //  important! hides the nicescroll bar after moving out of the formbuilder
    $(".overflow_scroll")
      .getNiceScroll()
      .hide();
  }
  render() {
    return (
      <AdminLayout
        changeConfigWindow={this.props.changeConfigWindow}
        settingsWindowName={this.props.settingsWindowName}
        formName={this.props.formName}
        save={this.props.save}
        isLive={this.props.isLive}
        pageName="form_builder"
        currentUser={this.props.currentUser}
        backToForms={this.props.backToForms}
        togglePreview={this.props.togglePreview}
        toggleLiveStatus={this.props.toggleLiveStatus}
      >
        <div className={Style.layoutCont}>
          <div className={Style.left}>
            <div className={Style.settingsCont}>
              <Setting
                addQuestionIntroChild={this.props.addQuestionIntroChild}
                addCompactQuestionChild={this.props.addCompactQuestionChild}
                setQuestionProperty={this.props.setQuestionProperty}
                settingsWindowName={this.props.settingsWindowName}
                toggleConfigWindow={this.props.toggleConfigWindow}
                showSettingsWindow={this.props.showSettingsWindow}
                addValidationRule={this.props.addValidationRule}
                currentElement={this.props.currentElement}
                addElement={this.props.addElement}
                setCurrentEditor={this.props.setCurrentEditor}
              />
            </div>
            <div className={Style.EP_Cont}>
              <EditorPresenter
                setQuestionProperty={this.props.setQuestionProperty}
                setCurrentEditor={this.props.setCurrentEditor}
                setElementChildren={this.props.setElementChildren}
                deleteQuestion={this.props.deleteQuestion}
                addValidationRule={this.props.addValidationRule}
                formElements={this.props.formElements}
                toggleConfigModal={this.props.toggleConfigModal}
                updateElementOrder={this.props.updateElementOrder}
              />
            </div>
          </div>
          <div className={Style.right}>
            <div className={Style.FP_Cont}>
              <FormPresenter
                elements={this.props.formElements}
                formName={this.props.formName}
                deleteQuestion={this.props.deleteQuestion}
                setCurrentEditor={this.props.setCurrentEditor}
                toggleConfigModal={this.props.toggleConfigModal}
              />
            </div>
          </div>
          {/* <div className={Style.clearfix}></div> */}
        </div>

        <Loading showLoading={this.props.showLoading} />
        <Notification
          title={"Default Title"}
          message={"Default Body Message"}
        />
        <NotificationCard />
        <PublishForm
          title="publish"
          togglePublish={this.props.togglePublish}
          showPublish={this.props.showPublish}
          form={this.props.form}
          publishAction={this.props.publishAction}
        />
        <PublishForm
          title="Unpublish"
          togglePublish={this.props.toggleUnPublish}
          showPublish={this.props.showUnPublish}
          form={this.props.form}
          publishAction={this.props.publishAction}
        />
        <FullScreen
          show={this.props.showPreview}
          togglePreview={this.props.togglePreview}
        >
          <FormPresenter
            elements={this.props.formElements}
            formName={this.props.formName}
            deleteQuestion={this.props.deleteQuestion}
            setCurrentEditor={this.props.setCurrentEditor}
            toggleConfigModal={this.props.toggleConfigModal}
          />
        </FullScreen>
        <ConfigCurrentElem
          showConfigModal={this.props.showConfigModal}
          addQuestionIntroChild={this.props.addQuestionIntroChild}
          isChecked={this.props.isChecked}
          addCompactQuestionChild={this.props.addCompactQuestionChild}
          setQuestionProperty={this.props.setQuestionProperty}
          settingsWindowName={this.props.settingsWindowName}
          toggleConfigWindow={this.props.toggleConfigWindow}
          showSettingsWindow={this.props.showSettingsWindow}
          addValidationRule={this.props.addValidationRule}
          currentElement={this.props.currentElement}
          addElement={this.props.addElement}
          toggleConfigModal={this.props.toggleConfigModal}
          setCurrentEditor={this.props.setCurrentEditor}
        />
      </AdminLayout>
    );
  }
}

FormBuilderView.propTypes = {
  addQuestionIntroChild: PropTypes.func.isRequired,
  addCompactQuestionChild: PropTypes.func.isRequired,
  settingsWindowName: PropTypes.string.isRequired,
  setQuestionProperty: PropTypes.func.isRequired,
  showSettingsWindow: PropTypes.bool.isRequired,
  showConfigModal: PropTypes.bool.isRequired,
  toggleConfigWindow: PropTypes.func.isRequired,
  toggleConfigModal: PropTypes.func.isRequired,
  setElementChildren: PropTypes.func.isRequired,
  changeConfigWindow: PropTypes.func.isRequired,
  addValidationRule: PropTypes.func.isRequired,
  currentElement: PropTypes.object.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  formElements: PropTypes.array.isRequired,
  formName: PropTypes.string.isRequired,
  addElement: PropTypes.func.isRequired,
  setCurrentEditor: PropTypes.func,
  save: PropTypes.func.isRequired
};
