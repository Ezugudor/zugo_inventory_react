import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./EditEntity.module.css";
import "./EditEntityClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import { JQAutoComplete } from "../../../plugins";
import { InputMoney, InputNumber } from "../../../plugins";
import React, { Component } from "react";
import uuid from "uuid4";

export class EditEntity extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        show={this.props.showEditEntity}
        click={this.props.toggleEditEntity}
      >
        <div class="modal_body half">
          <div class="card_main_header">
            <div class="company_header_info">
              <div class="company_info">
                <span class="bold">Edit credit</span>
                <br />
                <span>Change credit details</span>
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
            <div class="col-md-4">
              <div class="col2">
                <label>Debtor:</label>
                <div class="clearfix"></div>
                {this.props.currentEntity.is_outlet == "1" ? (
                  <select
                    class="form_field"
                    onChange={e => {
                      this.props.setEditEntityDetail(e, "is_outlet");
                      this.props.toggleReceiver(e);
                    }}
                  >
                    <option value={false}>Customer</option>
                    <option value={true} selected>
                      Outlet
                    </option>
                  </select>
                ) : (
                  <select
                    class="form_field"
                    onChange={e => {
                      this.props.setEditEntityDetail(e, "is_outlet");
                      this.toggleReceiver(e);
                    }}
                  >
                    <option value={false} selected>
                      Customer
                    </option>
                    <option value={true}>Outlet</option>
                  </select>
                )}
              </div>
            </div>
            <div class="col-md-8">
              {this.props.defaultCustomer ? (
                <div class="col2">
                  <label>Customer Name:</label>
                  <JQAutoComplete
                    item_id="receiver_id"
                    item_name="receiver_name"
                    id={uuid()}
                    value={`${this.props.editEntityDetails.receiver_name} ${this.props.currentEntity.customer_firstname}`}
                    key={1}
                    data={this.props.customers}
                    lookout="firstname"
                    extStyle={styles.AutoCompleteField}
                    setEditEntityDetail={this.props.setEditEntityDetail}
                    placeholder="e.g Ugo"
                  />
                </div>
              ) : (
                <div class="col2">
                  <label>Outlet Name:</label>
                  <JQAutoComplete
                    item_id="receiver_id"
                    item_name="receiver_name"
                    id={uuid()}
                    value={this.props.editEntityDetails.receiver_name}
                    key={2}
                    data={this.props.outlets}
                    lookout="name"
                    extStyle={styles.AutoCompleteField}
                    setEditEntityDetail={this.props.setEditEntityDetail}
                    placeholder="e.g Gariki Shop 1"
                  />
                </div>
              )}
            </div>

            <div class="col-md-12">
              <div class="col2">
                <label>Amount</label>
                <InputMoney
                  key={90}
                  class="form_field"
                  placeholder="e.g 20000"
                  name="amount"
                  value={this.props.currentEntity.total_amount}
                  setEditEntityDetail={this.props.setEditEntityDetail}
                />
              </div>
            </div>

            <div class="col-md-12">
              <div class="col2">
                <label>Comment</label>
                <textarea
                  class="form_field"
                  placeholder="e.g Jonathan"
                  value={this.props.currentEntity.comment}
                  onChange={e => this.props.setEditEntityDetail(e, "comment")}
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal_footer">
            <div className={styles.controls}>
              <White click={this.props.toggleEditEntity}>Cancel</White>
              <Red click={this.props.updateEntity} extStyle={styles.CreateBtn}>
                Update Supply
              </Red>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

EditEntity.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
