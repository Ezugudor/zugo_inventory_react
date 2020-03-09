import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./NewEntity.module.css";
import "./NewEntityClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import { JQAutoComplete } from "../../../plugins";
import { InputMoney, InputNumber } from "../../../plugins";
import React, { Component } from "react";
import uuid from "uuid4";

export class NewEntity extends Component {
  constructor(props) {
    super();
  }
  state = { defaultCustomer: true, showDeposit: "full" };
  toggleReceiver(e) {
    e.preventDefault();
    this.setState(prevState => ({
      defaultCustomer: !prevState.defaultCustomer
    }));
  }
  toggleDeposit(e) {
    e.preventDefault();
    this.setState({
      showDeposit: e.target.value
    });
  }

  render() {
    return (
      <Modal
        show={this.props.showCreateEntity}
        click={this.props.toggleCreateEntity}
      >
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
                <span class="bold">New Credit</span>
                <br />
                <span>Create a new credit</span>
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
                <select
                  class="form_field"
                  onChange={e => {
                    this.props.setNewEntityDetail(e, "is_outlet");
                    this.toggleReceiver(e);
                  }}
                >
                  <option value={false}>Customer</option>
                  <option value={true}>Outlet</option>
                </select>
              </div>
            </div>
            <div class="col-md-8">
              {this.state.defaultCustomer ? (
                <div class="col2">
                  <label>Customer Name:</label>
                  <JQAutoComplete
                    item_id="receiver_id"
                    item_name="receiver_name"
                    id={uuid()}
                    key={1}
                    data={this.props.customers}
                    lookout="firstname"
                    extStyle={styles.AutoCompleteField}
                    setNewEntityDetail={this.props.setNewEntityDetail}
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
                    key={2}
                    data={this.props.outlets}
                    lookout="name"
                    extStyle={styles.AutoCompleteField}
                    setNewEntityDetail={this.props.setNewEntityDetail}
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
                  setNewEntityDetail={this.props.setNewEntityDetail}
                />
              </div>
            </div>

            <div class="col-md-12">
              <div class="col2">
                <label>Comment</label>
                <textarea
                  class="form_field"
                  placeholder="e.g Jonathan"
                  onChange={e => this.props.setNewEntityDetail(e, "comment")}
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal_footer">
            <div className={styles.controls}>
              <White click={this.props.toggleCreateEntity}>Cancel</White>
              <Red
                click={e => this.props.addEntity(e)}
                extStyle={styles.CreateBtn}
              >
                Proceed
              </Red>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

NewEntity.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
