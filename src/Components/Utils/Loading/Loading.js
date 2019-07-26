import Style from "./Loading.module.css";
import { Modal } from "..";
import PropTypes from "prop-types";
import React from "react";
import loadingIcon from "../../../img/loading2.svg";

export const Loading = props => (
  <Modal show={props.showLoading}>
    <div className={Style.modalCont}>
      <h3 className={Style.modalHead}>Processing...</h3>
      <img src={loadingIcon} alt="processing..." className={Style.img} />
      <div className={Style.modalBody}>Just some seconds ...</div>
    </div>
  </Modal>
);

Loading.propTypes = {
  toggleLoading: PropTypes.func.isRequired,
  showLoading: PropTypes.bool.isRequired
};
