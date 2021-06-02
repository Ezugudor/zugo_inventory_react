import { AdminSideNav } from "../../../Components/Navigations";
import { AdminMiniSideNav } from "../../../Components/Navigations";
import Style from "./FBuilder.module.css";
import { FormBuilderHeader, PrivateHeader } from "../Headers";
import PropTypes from "prop-types";
import { Aux } from "../../Auxiliary";
import { Logo } from "../../../Components/Utils";
import logoutIcon from "../../../img/logout.svg";
import React from "react";

const getSideBar = (currentUser, props) => {
  return currentUser && currentUser.role !== "admin" ? (
    <AdminMiniSideNav pageName={props.pageName} />
  ) : (
    <AdminSideNav pageName={props.pageName} />
  );
};

const getHeader = props => {
  return props.pageName == "form_builder" ? (
    <FormBuilderHeader
      save={props.save}
      formName={props.formName}
      backToForms={props.backToForms}
      togglePreview={props.togglePreview}
      toggleLiveStatus={props.toggleLiveStatus}
      isLive={props.isLive}
    />
  ) : (
    <PrivateHeader formName={props.formName} />
  );
};
export const FBuilder = props => (
  <Aux>
    <main className={Style.AdminLayout}>
      {getSideBar(props.currentUser, props)}
      <div className={Style.right}>
        {getHeader(props)}
        <div className={Style.ChildContent}>{props.children}</div>
      </div>
    </main>
  </Aux>
);

FBuilder.propTypes = {
  pageName: PropTypes.string.isRequired
};
