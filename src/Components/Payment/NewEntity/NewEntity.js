import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./NewEntity.module.css";
import "./NewEntityClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

const gotoRegister = (e, id) => {
  e.stopPropagation();
  return (window.location.href = `/credit`);
};

export const NewEntity = props => (
  <Modal show={props.showCreateEntity} click={props.toggleCreateEntity}>
    <div class="modal_body half">
      <div class="card_main_header">
        <div class="company_header_info">
          {/* <div
              class="company_image"
              style={{
                "background-image": "url(assets/images/logo/icon.png)"
              }}
            ></div> */}
          <div class="company_info">
            <span class="bold">New Payment</span>
            <br />
            <span>Add a new Payment</span>
          </div>
        </div>
        <ul class="card_tab_list">
          <li>
            <span class="mdi mdi-dots-vertical close_modal"></span>
            <ul class="card_list_menu">
              <li>
                <span class="mdi mdi-delete-outline"></span> Delete Record
              </li>
              <li class="tog_modal">
                <span class="mdi mdi-close"></span> Close Window
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="col-md-6">
        <div class="col2">
          <label>Payee Type:</label>
          <div class="clearfix"></div>
          <select class="form_field">
            <option value="customer">Customer</option>
            <option value="outlet">Outlet</option>
          </select>
        </div>
      </div>

      <div class="scroll_body2">
        <div class="col-md-6">
          <div class="col2">
            <label>Customer</label>
            <input type="text" class="form_field" placeholder="e.g Emeka" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Payment Type</label>
            <div class="clearfix"></div>
            <select class="form_field">
              <option value="part">Cash Payment</option>
              <option value="full">Bank Transfer</option>
              <option value="none">Cheque</option>
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <div class="col2">
            <label>Amount</label>
            <input type="text" class="form_field" placeholder="e.g N120,000" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="col2">
            <label>Receipt ID</label>
            <input type="text" class="form_field" placeholder="e.g 10294842" />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Description</label>
            <textarea
              class="form_field"
              placeholder="e.g This payment also settles for the last one"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="modal_footer">
        <div className={styles.controls}>
          <White click={props.toggleCreateEntity}>Cancel</White>
          <Red click={e => gotoRegister(e)} extStyle={styles.CreateBtn}>
            Add Payment
          </Red>
        </div>
      </div>
    </div>
  </Modal>
);

NewEntity.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
