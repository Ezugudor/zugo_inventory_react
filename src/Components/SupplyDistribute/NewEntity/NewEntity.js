import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./NewEntity.module.css";
import "./NewEntityClassic.css";
import $ from "jquery";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Tokenize } from "../../../plugins";
import { JQAutoComplete } from "../../../plugins";
import { InputMoney, InputNumber } from "../../../plugins";
import uuid from "uuid4";

// const gotoRegister = (e, id) => {
//   e.stopPropagation();
//   return (window.location.href = `/receivings`);
// };

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
      <div className={`${styles.Container}`}>
        <div className={`${styles.Left} col-md-10`}>
          <div class="col-md-8">
            <div class="col-md-4">
              <div class="col2">
                <label>Supply to:</label>
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
            <div class="col-md-4">
              <div class="col2">
                <label>Qty</label>
                {/* <input
                  type="text"
                  class="form_field"
                  placeholder="e.g 400"
                  onChange={e => this.props.setNewEntityDetail(e, "qty")}
                /> */}
                <InputNumber
                  key={1}
                  class="form_field"
                  placeholder="e.g 400"
                  name="qty"
                  setNewEntityDetail={this.props.setNewEntityDetail}
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="col2">
                <label>Driver:</label>
                <JQAutoComplete
                  item_id="driver_id"
                  item_name="driver_name"
                  id={uuid()}
                  data={this.props.drivers}
                  lookout="firstname"
                  extStyle={styles.AutoCompleteField}
                  setNewEntityDetail={this.props.setNewEntityDetail}
                  placeholder="e.g Jonathan"
                />
              </div>
            </div>
            {/* <div class="col-md-4">
              <div class="col2">
                <label>Driver Phone</label>
                <input
                  type="text"
                  class="form_field"
                  placeholder="e.g 09039384393"
                  onChange={e =>
                    this.props.setNewEntityDetail(e, "driver_phone")
                  }
                />
              </div>
            </div> */}
            {/* <div class="col-md-4">
              <div class="col2">
                <label>Truck Id</label>
                <input
                  type="text"
                  value={this.props.newEntityDetails.truck_id}
                  class="form_field"
                  placeholder="e.g ABJ345KL"
                  onChange={e => this.props.setNewEntityDetail(e, "truck_id")}
                />
              </div>
            </div> */}

            <div class="col-md-4">
              <div class="col2">
                <label>Payment Method</label>
                <select
                  class="form_field"
                  onChange={e => {
                    this.props.setNewEntityDetail(e, "payment_method");
                    this.toggleDeposit(e);
                  }}
                >
                  <option value="full">Full Payment</option>
                  <option value="part">Part Payment</option>
                  <option value="none">No Payment</option>
                </select>
              </div>
            </div>

            <div class="col-md-4">
              <div class="col2">
                <label>Amount Deposited</label>
                {this.state.showDeposit === "part" ? (
                  // <input
                  //   type="text"
                  //   key={1}
                  //   class="form_field"
                  //   placeholder="e.g 12000"
                  //   onChange={e => this.props.setNewEntityDetail(e, "deposit")}
                  // />
                  <InputMoney
                    key={1}
                    class="form_field"
                    placeholder="e.g 12000"
                    name="deposit"
                    setNewEntityDetail={this.props.setNewEntityDetail}
                  />
                ) : this.state.showDeposit === "full" ? (
                  <input
                    type="text"
                    key={2}
                    class="form_field"
                    placeholder="Full Payment"
                    value={this.props.newEntityDetails.amount}
                    disabled
                  />
                ) : (
                  <input
                    type="text"
                    key={3}
                    class="form_field"
                    placeholder="No Initial Deposit"
                    disabled
                  />
                )}
              </div>
            </div>

            <div class="col-md-4">
              <div class="col2">
                <label>Mode</label>
                <select
                  class="form_field"
                  onChange={e => this.props.setNewEntityDetail(e, "mode")}
                >
                  <option value="mdd">MDD (Modified Direct Delivery)</option>
                  <option value="dd">DD (Direct Delivery)</option>
                </select>
              </div>
            </div>

            <div class="col-md-4">
              <div class="col2">
                <label>Source</label>
                <select
                  class="form_field"
                  onChange={e => this.props.setNewEntityDetail(e, "source")}
                >
                  <option value="factory">Factory</option>
                  <option value="depot">Depot</option>
                </select>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="col-md-12">
              <div class="col2">
                <label>Amount (Goods Amount)</label>
                {/* <input
                  type="text"
                  class="form_field"
                  placeholder="e.g 20000"
                  onChange={e => this.props.setNewEntityDetail(e, "amount")}
                /> */}
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
                  placeholder="e.g : to be supplied next week."
                  onChange={e => this.props.setNewEntityDetail(e, "comment")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.Right} col-md-2`}>
          <div className={styles.controls}>
            <div className={styles.btn1}>
              <White click={e => this.props.resetForm(e)}>Reset</White>
            </div>
            <div>
              <Red
                click={e => this.props.addTemporal(e)}
                extStyle={styles.CreateBtn}
              >
                Add
              </Red>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
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
