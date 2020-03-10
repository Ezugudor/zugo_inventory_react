import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./Deposit.module.css";
import "./DepositClassic.css";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import { JQAutoComplete } from "../../../plugins";
import { InputMoney, InputNumber } from "../../../plugins";
import React, { Component } from "react";
import uuid from "uuid4";

export class Deposit extends Component {
  constructor(props) {
    super();
  }
  state = { defaultCustomer: true, showDeposit: "cash" };
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
  getValue = () => {
    const cE = this.props.currentEntity;
    return cE.is_outlet == "1"
      ? cE.outlet_name
      : `${cE.customer_surname} ${cE.customer_firstname}`;
  };
  render() {
    return (
      <Modal
        show={this.props.showProcessEntity}
        click={this.props.toggleProcessEntity}
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
                <span class="bold">Payments </span>
                <br />
                <span>Settle existing debts</span>
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
          {/* {console.log("current from deposit", this.props.currentEntity)} */}
          <div class="scroll_body2">
            <div class="col-md-6">
              <div class="col2">
                {this.props.currentEntity.is_outlet == "1" ? (
                  <label>Outlet:</label>
                ) : (
                  <label>Customer:</label>
                )}

                <div class="clearfix"></div>
                <input
                  type="text"
                  value={this.getValue()}
                  class="form_field"
                  readOnly
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="col2">
                <label>Amount</label>
                <InputMoney
                  key={90}
                  class="form_field"
                  placeholder="e.g 20000"
                  name="amount"
                  setNewEntityDetail={this.props.setProcessEntityDetail}
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="col2">
                <label>Payment Method</label>
                <select
                  class="form_field"
                  onChange={e => {
                    this.props.setProcessEntityDetail(e, "payment_method");
                    this.toggleDeposit(e);
                  }}
                >
                  <option value="cash">Cash Payment</option>
                  <option value="transfer">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="col2">
                {this.state.showDeposit === "transfer" ? (
                  <div>
                    <label>Transaction ID</label>
                    <input
                      type="text"
                      key={1}
                      class="form_field"
                      placeholder="Transaction ID"
                      name="receipt_id"
                      onChange={e =>
                        this.props.setProcessEntityDetail(e, "receipt_id")
                      }
                    />
                  </div>
                ) : this.state.showDeposit === "cheque" ? (
                  <div>
                    <label>cheque ID</label>
                    <input
                      type="text"
                      key={2}
                      class="form_field"
                      placeholder="cheque ID"
                      name="receipt_id"
                      onChange={e =>
                        this.props.setProcessEntityDetail(e, "receipt_id")
                      }
                    />
                  </div>
                ) : (
                  <div>
                    <label>Cash Payment</label>
                    <input
                      type="text"
                      key={3}
                      class="form_field"
                      placeholder="Cash Payment"
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>

            <div class="col-md-12">
              <div class="col2">
                <label>Comment</label>
                <textarea
                  class="form_field"
                  placeholder="e.g Jonathan"
                  onChange={e =>
                    this.props.setProcessEntityDetail(e, "comment")
                  }
                ></textarea>
              </div>
            </div>
          </div>

          <div class="modal_footer">
            <div className={styles.controls}>
              <White click={this.props.toggleProcessEntity}>Cancel</White>
              <Red
                click={e => this.props.processEntity(e)}
                extStyle={styles.CreateBtn}
              >
                Add Payment
              </Red>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

Deposit.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
