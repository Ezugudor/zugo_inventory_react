import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./NewEntity.module.css";
import "./NewEntityClassic.css";
import $ from "jquery";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React from "react";
import { Tokenize } from "../../../plugins";
import { JQAutoComplete, InputMoney, InputNumber } from "../../../plugins";
import uuid from "uuid4";

const gotoRegister = (e, id) => {
  e.stopPropagation();
  return (window.location.href = `/receivings`);
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
            <span class="bold">New Receivings</span>
            <br />
            <span>Add new arrivals to the inventory</span>
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
            <label>SKU Code</label>
            <div className={styles.TokenField}>
              <Tokenize
                extStyle={styles.TokenComp}
                placeholder="e.g SKU236504"
                addCodeToken={props.addCodeToken}
                removeCodeToken={props.removeCodeToken}
              />
            </div>
            {/* <input type="text" class="form_field" placeholder="e.g SKU236504" /> */}
          </div>
        </div>

        <div class="col-md-12">
          <div class="col2">
            <label>Item(product)</label>
            <JQAutoComplete
              item_id="item"
              id={uuid()}
              data={props.stocks}
              lookout="product_name"
              extStyle={styles.AutoCompleteField}
              setNewEntityDetail={props.setNewEntityDetail}
              placeholder="e.g Unicem"
            />
            {/* <input
              type="text"
              class="form_field"
              placeholder="e.g Unicem"
              onChange={e => props.setNewEntityDetail(e, "item")}
            /> */}
          </div>
        </div>
        <div class="col-md-6">
          <div class="col2">
            <label>Size (Tons)</label>
            {/* <input
              type="text"
              class="form_field"
              placeholder="e.g 40 Tons"
              onChange={e => props.setNewEntityDetail(e, "size")}
            /> */}
            <InputNumber
              key={1}
              class="form_field"
              placeholder="e.g 40"
              name="size"
              setNewEntityDetail={props.setNewEntityDetail}
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="col2">
            <label>Qty</label>
            <input
              type="text"
              class="form_field"
              placeholder="e.g 800 bags"
              readOnly
            />
          </div>
        </div>
      </div>

      <div class="modal_footer">
        <div className={styles.controls}>
          <White click={props.toggleCreateEntity}>Cancel</White>
          <Red click={e => props.addEntity(e)} extStyle={styles.CreateBtn}>
            Proceed
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
