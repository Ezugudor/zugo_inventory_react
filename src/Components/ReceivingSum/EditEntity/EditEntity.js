import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./EditEntity.module.css";
import "./EditEntityClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";

export const EditEntity = props => (
  <Modal show={props.showEditEntity} click={props.toggleEditEntity}>
    {console.log("currnenting data", props.currentEntity)}
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
            <span class="bold">Edit Receivings</span>
            <br />
            <span>Edit arrivals </span>
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
        <div class="col-md-5">
          <div class="col2">
            <label>SKU Code</label>
            <input
              type="text"
              class="form_field"
              value={props.currentEntity.supply_code}
              placeholder="e.g SKU236504"
              disabled
            />
          </div>
        </div>
        <div class="col-md-7">
          <div class="col2">
            <label>Product Name</label>
            <input
              type="text"
              class="form_field"
              value={props.currentEntity.product_name}
              placeholder="e.g Dangote"
              disabled
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Mode</label>
            <div class="clearfix"></div>
            <select class="form_field" disabled>
              <option value="mdd">MDD (Modified Direct Delivery)</option>
              <option value="dd">DD (Direct Delivery)</option>
            </select>
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Driver</label>
            <input
              type="text"
              value={
                props.currentEntity.driver_firstname ||
                props.currentEntity.driver_lastname
              }
              class="form_field"
              placeholder="e.g Jonathan"
              disabled
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="col2">
            <label>Truck Id</label>
            <input
              type="text"
              value={props.currentEntity.truck_id}
              class="form_field"
              placeholder="e.g ABJ345KL"
              disabled
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Size</label>
            <input
              type="text"
              value={props.currentEntity.size}
              class="form_field"
              placeholder="e.g 40 Tons"
              disabled
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Qty</label>
            <input
              value={props.currentEntity.qty}
              type="text"
              class="form_field"
              placeholder="e.g 800 bags"
              disabled
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Source</label>
            <select class="form_field" disabled>
              <option value="Dangote">Factory</option>
              <option value="Dangote">Depot</option>
            </select>
          </div>
        </div>
      </div>

      <div class="modal_footer">
        <div className={styles.controls}>
          <White click={props.toggleEditEntity}>Cancel</White>
          <Red click={props.editEntity} extStyle={styles.CreateBtn}>
            Update Receivings
          </Red>
        </div>
      </div>
    </div>
  </Modal>
);

EditEntity.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
