import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./EditStock.module.css";
import "./EditStockClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";
const selected = (props, type) => {
  return props.editEntityDetails.type.toLowerCase() == type.toLowerCase()
    ? "selected"
    : "";
};
export const EditStock = props => (
  <Modal show={props.showEditEntity} click={props.toggleEditEntity}>
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
            <span class="bold">Edit Stocks</span>
            <br />
            <span>Edit an already exisitng stock.</span>
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
      <div class="scroll_body2">
        <div class="col-md-12">
          <div class="col2">
            <label>Stock Name</label>
            <input
              type="text"
              value={props.editEntityDetails.name}
              class="form_field"
              placeholder="e.g SKU236504"
              onChange={e => props.setEditEntityDetail(e, "name")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Product Type</label>
            <div class="clearfix"></div>
            <select
              class="form_field"
              onChange={e => props.setEditEntityDetail(e, "type")}
            >
              <option value="cement" {...selected(props, "cement")}>
                Cements
              </option>
              <option value="rods" {...selected(props, "rods")}>
                Rods
              </option>
            </select>
          </div>
        </div>
        {/* 
        <div class="col-md-6">
          <div class="col2">
            <label>Price</label>
            <input
              type="text"
              value={props.editEntityDetails.price}
              class="form_field"
              placeholder="e.g N2000"
              onChange={e => props.setEditEntityDetail(e, "price")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Cost Price</label>
            <input
              type="text"
              value={props.editEntityDetails.cp}
              class="form_field"
              placeholder="e.g N10,000"
              onChange={e => props.setEditEntityDetail(e, "cp")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Qty</label>
            <input
              type="text"
              value={props.editEntityDetails.qty}
              class="form_field"
              placeholder="e.g 800 bags"
              onChange={e => props.setEditEntityDetail(e, "qty")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Expiry</label>
            <input
              type="text"
              value={props.editEntityDetails.expiry}
              class="form_field"
              placeholder="e.g 12/21/2020 10:10pm"
              onChange={e => props.setEditEntityDetail(e, "expiry")}
            />
          </div>
        </div> */}
      </div>

      <div class="modal_footer">
        <div className={styles.controls}>
          <White click={props.toggleEditEntity}>Cancel</White>
          <Red click={props.updateEntity} extStyle={styles.CreateBtn}>
            Change Stock
          </Red>
        </div>
      </div>
    </div>
  </Modal>
);

EditStock.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
