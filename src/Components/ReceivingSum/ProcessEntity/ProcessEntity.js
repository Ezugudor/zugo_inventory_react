import { White, Red } from "../../Utils/Buttons";
import { FileUpload, PreviewImage } from "../../Utils";
import styles from "./ProcessEntity.module.css";
import "./ProcessEntityClassic.css";
import $ from "jquery";
import { Modal } from "../../Utils";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Tokenize } from "../../../plugins";
import { JQAutoComplete } from "../../../plugins";
import uuid from "uuid4";

// const gotoRegister = (e, id) => {
//   e.stopPropagation();
//   return (window.location.href = `/receivings`);
// };

export class ProcessEntity extends Component {
  constructor(props) {
    super();
  }
  state = { defaultCustomer: true };
  toggleReceiver(e) {
    e.preventDefault();
    this.setState(prevState => ({
      defaultCustomer: !prevState.defaultCustomer
    }));
  }
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
                <span class="bold">
                  Code : {this.props.currentEntity.supply_code}
                </span>
                <br />
                <span>Item: {this.props.currentEntity.product_name}</span>
                <span>Size: {this.props.currentEntity.size}Tons</span>
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
                <label>Supply to:</label>
                <div class="clearfix"></div>
                <select
                  class="form_field"
                  onChange={e => {
                    this.props.setProcessEntityDetail(e, "is_outlet");
                    this.toggleReceiver(e);
                  }}
                >
                  <option value={false}>Customer</option>
                  <option value={true}>Outlet</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="col2">
                <label>Mode</label>
                <div class="clearfix"></div>
                <select
                  class="form_field"
                  onChange={e => this.props.setProcessEntityDetail(e, "mode")}
                >
                  <option value="mdd">MDD (Modified Direct Delivery)</option>
                  <option value="dd">DD (Direct Delivery)</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              {this.state.defaultCustomer ? (
                <div class="col2">
                  <label>Customer Name:</label>
                  <JQAutoComplete
                    name="receiver"
                    id={uuid()}
                    key={1}
                    data={this.props.customers}
                    lookout="firstname"
                    extStyle={styles.AutoCompleteField}
                    setNewEntityDetail={this.props.setProcessEntityDetail}
                    placeholder="e.g Ugo"
                  />
                </div>
              ) : (
                <div class="col2">
                  <label>Outlet Name:</label>
                  <JQAutoComplete
                    name="receiver"
                    id={uuid()}
                    key={2}
                    data={this.props.outlets}
                    lookout="name"
                    extStyle={styles.AutoCompleteField}
                    setNewEntityDetail={this.props.setProcessEntityDetail}
                    placeholder="e.g Gariki Shop 1"
                  />
                </div>
              )}
            </div>

            <div class="col-md-6">
              <div class="col2">
                <label>Driver:</label>
                <JQAutoComplete
                  name="driver"
                  id={uuid()}
                  data={this.props.drivers}
                  lookout="firstname"
                  extStyle={styles.AutoCompleteField}
                  setNewEntityDetail={this.props.setProcessEntityDetail}
                  placeholder="e.g Jonathan"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="col2">
                <label>Driver Phone</label>
                <input
                  type="text"
                  class="form_field"
                  placeholder="e.g 09039384393"
                  onChange={e =>
                    this.props.setProcessEntityDetail(e, "driver_phone")
                  }
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="col2">
                <label>Truck Id</label>
                <input
                  type="text"
                  class="form_field"
                  placeholder="e.g ABJ345KL"
                  onChange={e =>
                    this.props.setProcessEntityDetail(e, "truck_id")
                  }
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="col2">
                <label>Source</label>
                <select
                  class="form_field"
                  onChange={e => this.props.setProcessEntityDetail(e, "source")}
                >
                  <option value="factory">Factory</option>
                  <option value="depot">Depot</option>
                </select>
              </div>
            </div>
          </div>

          <div class="modal_footer">
            <div className={styles.controls}>
              <White click={this.props.toggleProcessEntity}>Cancel</White>
              <Red
                click={e =>
                  this.props.processCode(e, this.props.currentEntity.id)
                }
                extStyle={styles.CreateBtn}
              >
                Process Code
              </Red>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

ProcessEntity.propTypes = {
  setNewBusinessDetail: PropTypes.func.isRequired,
  toggleCreateBusiness: PropTypes.func.isRequired,
  showCreateBusiness: PropTypes.bool.isRequired,
  createBusiness: PropTypes.func.isRequired,
  newBusiness: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired
};
