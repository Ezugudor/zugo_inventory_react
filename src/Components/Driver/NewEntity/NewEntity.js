import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./NewEntity.module.css";
import "./NewEntityClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";
import { addEntity } from "../../../store/actions";

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
            <span class="bold">New Driver</span>
            <br />
            <span>Add a new Driver</span>
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
        <div class="col-md-6">
          <div class="col2">
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              class="form_field"
              placeholder="e.g Emeka"
              onChange={e => props.setNewEntityDetail(e, "firstname")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Lastname</label>
            <input
              type="text"
              name="firstname"
              class="form_field"
              placeholder="e.g Emeka"
              onChange={e => props.setNewEntityDetail(e, "surname")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Email</label>
            <input
              type="text"
              name="firstname"
              class="form_field"
              placeholder="e.g Emeka"
              onChange={e => props.setNewEntityDetail(e, "email")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              class="form_field"
              placeholder="e.g 08105251281"
              onChange={e => props.setNewEntityDetail(e, "phone")}
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="col2">
            <label>Address</label>
            <input
              type="text"
              name="address"
              class="form_field"
              placeholder="e.g 123 Agbani Road , Enugu"
              onChange={e => props.setNewEntityDetail(e, "address")}
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="col2">
            <label>Truck ID</label>
            <input
              type="text"
              name="truck"
              class="form_field"
              placeholder="e.g ABJ546VG"
              onChange={e => props.setNewEntityDetail(e, "truck_id")}
            />
          </div>
        </div>
      </div>

      <div class="modal_footer">
        <div className={styles.controls}>
          <White click={props.toggleCreateEntity}>Cancel</White>
          <Red click={e => props.addEntity(e)} extStyle={styles.CreateBtn}>
            Add Driver
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
